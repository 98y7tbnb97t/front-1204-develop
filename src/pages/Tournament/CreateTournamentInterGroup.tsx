import React from 'react'
import { useParams } from 'react-router-dom'
import CreateTournamentAreaForm from '../../components/forms/Tournaments/CreateNewTournamentArea/CreateTournamentAreaForm'
import CreateTournamentInterGroupForm from '../../components/forms/Tournaments/CreateNewTournamentArea/CreateTournamentInterGroupForm'

const CreateTournamentInterGroup = () => {
    const {groupId} = useParams()
    return (
      <div className="h-full w-full overflow-auto ">
      <div className='bg-[#eaeaea] pb-5 pr-5 shadow-2xl rounded-[30px] mt-5 w-[calc(100%-1%)] overflow-auto min-h-[95vh] '>    
        <CreateTournamentInterGroupForm groupId={groupId}/>
      </div></div>
  
    )
}

export default CreateTournamentInterGroup