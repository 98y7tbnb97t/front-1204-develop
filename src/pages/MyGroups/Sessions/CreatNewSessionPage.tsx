// import React from 'react'
import { useParams } from 'react-router-dom';
import CreateNewSessionForm from '../../../components/forms/sessions/CreateNewSessionForm/CreateNewSessionForm';

const data = [
  'Teacher',
  'Student 1',
  'Student 2',
  'Student 3',
  'Student 4',
  'Student 5',
  'Student 6',
  'Student 7',
  'Student 8',
];

const CreatNewSessionPage = () => {
  const { groupId } = useParams();
  
  return (
    <div>
      <div className="bg-gradient-button flex flex-row justify-around px-2 py-5 rounded-lg overflow-x-auto">
        {data.map((item) => (
          <div
            className="py-10 px-5 border-gray-200 bg-white rounded-lg min-w-36 max-w-72 border-2"
            key={item}
          >
            <p className="text-lg font-semibold">{item}</p>
          </div>
        ))}
      </div>
      <CreateNewSessionForm groupId={groupId} />
    </div>
  );
};

export default CreatNewSessionPage;
