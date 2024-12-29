
import { useParams } from 'react-router-dom'
import CreateTournamentSwissForm from '../../components/forms/Tournaments/CreateNewTournamentArea/CreateTournamentSwissForm'

const CreateTournamentSwiss = () => {
  const {groupId} = useParams()
  return (
    <div className="h-full w-full overflow-auto ">
     <CreateTournamentSwissForm groupId={groupId}/>
     </div>

  )
}

export default CreateTournamentSwiss