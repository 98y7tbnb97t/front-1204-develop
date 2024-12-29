import { FC, useEffect, useRef, useState } from 'react';
import * as socketIOClient from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { SERVER_URI } from '../../../sockets/socket';
import { IJitsiMeetExternalApi } from '@jitsi/react-sdk/lib/types';

interface RecorderProps {
  record: string;
  groupId: string | undefined;
  setScreenRecordingAllowed: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  setSModal: React.Dispatch<React.SetStateAction<boolean>>;
  permission: () => void;
  recordingsAllowed: boolean | null;
  api: IJitsiMeetExternalApi | null;
}

const Recorder: FC<RecorderProps> = ({
  record,
  groupId,
  setScreenRecordingAllowed,
  setSModal,
  permission,
  recordingsAllowed,
  api,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [permissionRequested, setPermissionRequested] =
    useState<boolean>(false);
  const [videoTrack, setVideoTrack] = useState<MediaStreamTrack | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const userMediaStreamRef = useRef<MediaStream | null>(null);

  // when muted, mute also audiostream
  let userAudioTrack: MediaStreamTrack | null = null;


  const mergeAudioStreams = (screenStream: MediaStream, userStream: MediaStream) => {
    const context = new AudioContext();
    const destination = context.createMediaStreamDestination();
    let hasUserAudio = false;
    let hasScreenAudio = false;

    if (userStream.getAudioTracks().length > 0) {
      userAudioTrack = userStream.getAudioTracks()[0];
      const userAudio = context.createMediaStreamSource(userStream);
      userAudio.connect(destination);
      hasUserAudio = true;
    }

    if (screenStream.getAudioTracks().length > 0) {
      const screenAudio = context.createMediaStreamSource(screenStream);
      screenAudio.connect(destination);
      hasScreenAudio = true;
    }

    return hasUserAudio || hasScreenAudio ? destination.stream.getAudioTracks() : [];
  }

  useEffect(() => {(async function(){
    if(!api) return;

    api.on('audioMuteStatusChanged', (muted: boolean) => {
      if(userAudioTrack) {
        userAudioTrack.enabled = !muted;
      }
    })

    if (permissionRequested) {
      return;
    }

    const socket = socketIOClient.connect(SERVER_URI, {
      query: { groupId }
    });
    setSocket(socket);

    socket.on('connect', () => {
      console.log('Connected to server');
      const startLesson = new Date().toLocaleTimeString().slice(0, 5);
      if (groupId) {
        socket.emit('groupId', { groupId, startLesson });
      }
    });


    try{
      const audioDeviceId = (await api.getCurrentDevices() as unknown as {audioInput: MediaDeviceInfo}).audioInput.deviceId;
      const userMediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: audioDeviceId,
        },
        video: true,
      });

      userMediaStreamRef.current = userMediaStream;

      const displayMediaOptions = {
        video: {
          displaySurface: 'browser',
          cursor: 'always',
        },
        audio: true,
        preferCurrentTab: true,
        systemAudio: 'include',
        surfaceSwitching: 'include',
        selfBrowserSurface: 'include',
      };

      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
        screenStreamRef.current = screenStream;

        setScreenRecordingAllowed(true);

        const stream = new MediaStream([
          ...screenStream.getVideoTracks(),
          ...mergeAudioStreams(screenStream, userMediaStream),
        ]);

        setVideoTrack(screenStream.getVideoTracks()[0]);

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'video/webm;codecs=h264',
          videoBitsPerSecond: 2500000, // 2.5 Mbps
        });

        const stuckedChunks: any[] = [];
        mediaRecorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            if (socket.connected) {
              if (stuckedChunks.length) {
                stuckedChunks.forEach((chunk) => {
                  socket.emit('videoChunk', { chunk });
                });
                stuckedChunks.length = 0;
              }
              socket.emit('videoChunk', { chunk: event.data });
            } else {
              stuckedChunks.push(event.data);
            }
          }
        };

        socket.on('startRecording', () => {
          mediaRecorder.start(1000);
          setIsRecording(true);
        });

        socket.on('stopRecording', () => {
          mediaRecorder.stop();
          setIsRecording(false);
        });

        mediaRecorder.onstop = () => {
          socket.emit('allChunksSent', { groupId });
        };
      } catch(error) {
        setScreenRecordingAllowed(false);
        setSModal(true);
        console.error('Error: ', error);
      };
    } catch (error) {
      setScreenRecordingAllowed(false);
      setSModal(true);
      console.error('Error: ', error);
    }

    setPermissionRequested(true);

    return () => {
      socket.disconnect();
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (userMediaStreamRef.current) {
        userMediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  })()}, [api])

  useEffect(() => {
    if (!videoTrack) {
      return;
    }

    if (videoTrack.readyState === 'live') {
      console.log('Разрешение на запись получено');
    }
    const handleTrackEnded = () => {
      console.log('Video track ended');
      permission();
    };

    videoTrack.addEventListener('ended', handleTrackEnded);

    return () => {
      videoTrack.removeEventListener('ended', handleTrackEnded);
    };
  }, [videoTrack]);

  useEffect(() => {
    const startRecording = () => {
      if (isRecording && !recordingsAllowed) return;
      setIsRecording(true);
      if (socket) socket.emit('startRecording');
    };

    const stopRecording = () => {
      if (!isRecording) return;
      setIsRecording(false);
      if (socket) socket.emit('stopRecording');
    };

    if (record === 'startRecording') {
      startRecording();
    } else if (record === 'stopRecording') {
      stopRecording();
    }
  }, [record, socket, isRecording, recordingsAllowed]);

  return (
    <>
      <div data-recorder="recorder"></div>
    </>
  );
};

export default Recorder;
