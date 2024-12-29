import format from 'date-fns/format';
import { FC, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppSelector } from '../../hooks/redux.ts';
import { IVideo } from '../../models/IVideo';
import VideoService from '../../services/VideoService';
import {
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';
import Modal from '../UI/Modal';
import ReactPlayer from "react-player";

interface VideoModalProps {
  modal: boolean;
  setModal: (bool: boolean) => void;
  video: string;
  name: Date;
}

const VideoModal: FC<VideoModalProps> = ({ modal, setModal, video, name }) => {
  const [videoObj, setVideoObj] = useState<IVideo>({} as IVideo);
  const language = useAppSelector((state) => state.TranslateSlice.language);

  const {
    classText,
  }: {
    classText: ITranslateItemString;
  } = translations.videoLessons;

  useEffect(() => {
    const fetchData = async () => {
      if (video) {
        const res = await VideoService.getVideo(video)
        const videoObjData = res.data.video;

        // check if m3u8 file exists, if yes change url to it
        const exists = await fetch(`${videoObjData.video}_chunks/output.m3u8`);
        if (exists.ok) {
          videoObjData.video = `${videoObjData.video}_chunks/output.m3u8`;
        }

        setVideoObj(videoObjData);
      }
    };
    void fetchData();
  }, [video]);

  return (
    <>
      <Modal
        active={modal}
        setActive={setModal}
        className="items-center !rounded-3xl max-w-[700px] border-2 border-[#8A6E3E]"
      >
        <h1 className="text-2xl font-bold tracking-wider text-gray-800 capitalize mb-2 md:mb-6">
          {classText[language]}: {format(new Date(name), 'dd.MM.Y')}
        </h1>
        {videoObj.video && (
          <ReactPlayer
            className="w-full"
            url={videoObj.video}
            playing={true}
            controls={true}
          />
        )}
      </Modal>
    </>
  );
};

export default VideoModal;
