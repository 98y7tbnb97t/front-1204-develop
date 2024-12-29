import { FC, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getEstimates } from "../../store/reducers/EstimatesSlice";
import { IEstimate } from "../../models/IEstimate";
import { translations } from "../../utils/translations";
import { useDebounce } from "../../hooks/useDebounce";
import EstimateItem from "../../components/Estimates/EstimateItem";
import StudentFilters from "./StudentFilters";
import { UserRoles } from "../../utils/userRoles";
import AdminFilters from "./AdminFilters";
import TranerFilters from "./TranerFilters";
import EstimatesService from "../../services/EstimatesService";



const MyEstimatesPage:FC = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(state => state.TranslateSlice.language);

  const user = useAppSelector(state => state.UserSlice.user);
  
  const [currentEstimates, setCurrentEstimates] = useState<IEstimate[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { 
    avgGradeText,
    noRating,
  } = translations.estimate;

  const getEstimatesDebounced = useDebounce((query: string) => {
    void dispatch(getEstimates(query));
    
  }, 500);

  useEffect(() => {
    if (user._id) {
      void getEstimatesDebounced('');
    }
	}, [user._id, dispatch]);

  useEffect(() => {
    getEstimatesDebounced(searchQuery)
  }, [searchQuery]);



  const avgEst = useMemo(() => {
    const sum = currentEstimates.reduce((prev, curr) => prev + curr.reviews.reduce((prevRev, currRev) => prevRev + currRev.estimate, 0), 0);
    const revsCount = currentEstimates.reduce((prev, curr) => prev + curr.reviews.length, 0);
    return (sum / (revsCount || 1)).toFixed(2);
  }, [currentEstimates]);

  const currentFilters = useMemo(() => {
    switch (user.role) {
      case UserRoles.STUDENT:
        return <StudentFilters setCurrentEstimates={setCurrentEstimates} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>;
      case UserRoles.DIRECTOR:
        return <AdminFilters setCurrentEstimates={setCurrentEstimates} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>;
      case UserRoles.ZDIRECTOR:
        return <AdminFilters setCurrentEstimates={setCurrentEstimates} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>;
      case UserRoles.ADMIN:
        return <AdminFilters setCurrentEstimates={setCurrentEstimates} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>;
      case UserRoles.TRANER:
        return <TranerFilters setCurrentEstimates={setCurrentEstimates} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>;
    }
  }, [searchQuery, user.role])

  const deleteAll = () => {
    void EstimatesService.deleteAll()
  }


  return (
    <div className="w-full p-5 flex flex-col gap-5">
				{currentFilters}
        <p className="text-lg">{avgGradeText[language]} <strong>{avgEst}</strong></p>
        {
          [...currentEstimates]
          .sort((a,b) => Number(new Date((b.lessonDate))) - Number(new Date((a.lessonDate))))
          .map(est => 
            [...est.reviews]
            .sort((a,b) => Number(new Date((b.date))) - Number(new Date((a.date))))
            .map(rev => (
              <EstimateItem est={est} rev={rev} key={rev._id} />
            ))
          )
        }
        { !currentEstimates.length && <p className="text-center mt-2 text-lg">{noRating[language]}</p>}

        <button onClick={deleteAll}>удалить</button>
    </div>
  );
}

export default MyEstimatesPage;