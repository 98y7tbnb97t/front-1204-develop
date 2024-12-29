
import { useState } from 'react';

const Paggination = ({ data, RenderComponent,  dataLimit, currentPage }: any) => {
    



  const getPaginatedData = () => {
    const startIndex = (currentPage * dataLimit) - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };
  return (
    <div className='h-full'>
        <div className="overflow-auto  flex flex-col justify-center ">
  {getPaginatedData().map((d:any, idx:any) => (
    <RenderComponent key={idx} data={d} />
  ))}
</div>

    </div>
  );
};

export default Paggination;
