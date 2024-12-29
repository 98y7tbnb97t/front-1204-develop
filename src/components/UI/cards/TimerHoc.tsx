import React from 'react';
import { createTimeModel } from 'react-compound-timer';
import { useAppSelector } from '../../../hooks/redux';
import { useParams } from 'react-router-dom';

interface TimerHocProps {
  blackTimer: any;
  whiteTimer:any;
  currentGame: any;
  // blackTimerValue: any;
  // whiteTimerValue:any;
//   Сhildren: React.Component;
}


export const withTimerChess = (WrappedComponent:React.ComponentType<TimerHocProps>, oneSeans: any)=>{
  const { userId } = useParams();
  const currentGame = oneSeans?.games?.find((e: any) => e.user._id === userId);
    const whiteTimer = createTimeModel({
        initialTime: currentGame?.whiteTimer,
        // count down
        direction: 'backward',
        startImmediately: false,
      });
    
      const blackTimer = createTimeModel({
        initialTime: currentGame?.blackTimer,
        // count down
        direction: 'backward',
        startImmediately: false,
      });

    return () =>{
        return <WrappedComponent currentGame={currentGame} blackTimer={blackTimer} whiteTimer={whiteTimer} />
    }
}

