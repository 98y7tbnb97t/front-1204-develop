import { FC, useEffect, useMemo, useState } from "react";
import {useNavigate} from 'react-router-dom';
import classNames from "classnames";
import Modal from "../UI/Modal";
import { IEstimate, IEstimateReview } from "../../models/IEstimate";
import Button from "../UI/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { translations } from "../../utils/translations";
import CreateEstimateModal from "./CreateEstimateModal";
import { formatDate } from "../../utils/formatDate";
import EstimateItem from "../Estimates/EstimateItem";
import { EInfoTextFields } from "../../models/IInfoTexts";
import { getInfoText } from "../../store/reducers/InfoTextsSlice";

interface EstimateModalProps {
  className?: string;
  active: boolean;
  setActive: (active: boolean) => void;
	estimate: IEstimate | null;
  setEstimate: (estimate: IEstimate) => void;
}

const EstimateModal:FC<EstimateModalProps> = ({ className, active, setActive, estimate, setEstimate }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const estimateAutoSMS = useAppSelector(state => state.InfoTextsSlice.estimateAutoSMS);
	const language = useAppSelector(state => state.TranslateSlice.language);
	const [createEstimateModal, setCreateEstimateModal] = useState<boolean>(false);
  const { user } = useAppSelector(state => state.UserSlice);
  const [revListModal, setRevListModal] = useState<boolean>(false);
  const { anotherGradeText, alreadyHaveGradeText } = translations.estimate;
  const [successModal, setSuccessModal] = useState(false);
  const [newReview, setNewReview] = useState<IEstimateReview | null>(null);
  useEffect(() => {
    void dispatch(getInfoText({ field: EInfoTextFields.estimateAutoSMS}));
}, [dispatch]);
  useEffect(() => {
    if (estimate && estimate.reviews.length === 0 && !createEstimateModal && active) {
      setCreateEstimateModal(true);
    }
  }, [active, createEstimateModal, estimate, estimate?.reviews.length, setActive]);
  
  const datetime = useMemo(() => {
    if (estimate && estimate.reviews.length < 2) {
      return null;
    }
    if (estimate) {
      const lastEstimate = [...estimate.reviews].sort((a,b) => Number(new Date((b.date))) - Number(new Date((a.date))))[2];
      if (lastEstimate) {
        const lessonDate = new Date(new Date(lastEstimate.date).toLocaleString('en-US', { timeZone: user.timeZone }));
        const datetime = formatDate(lessonDate, true);
        return datetime;
      }
    }
    return null;
  }, [estimate, user.timeZone]);

  const goToReviews = () => {
    navigate('/myestimates');
  }
  
  return (
    <>
    <Modal maxWidth={1000} active={active} setActive={setActive} className={classNames('!bg-white p-5', {}, [className])}>
      {estimate && estimate.reviews.filter(rev => rev._id !== newReview?._id).length > 0 && <p className="mb-1 text-red-500">{alreadyHaveGradeText[language]}</p>}
      {datetime && <p className="mb-1 cursor-pointer" onClick={() => setRevListModal(true)}> Смотреть предыдущие оценки и комментарии</p>}  
      <div className="flex flex-col gap-2">
        {estimate && [...estimate.reviews]
          .sort((a,b) => Number(new Date((b.date))) - Number(new Date((a.date))))
          .filter(rev => rev._id !== newReview?._id)
          .slice(0, 2)
          .map(rev => <EstimateItem key={rev._id} est={estimate} rev={rev}/>)}
      </div>
      {!createEstimateModal && <Button className="mt-4" onClick={() => {
        setCreateEstimateModal(true);
      }}>
        {anotherGradeText[language]}
      </Button>}
      {estimate && createEstimateModal && <CreateEstimateModal
        setEstimate={setEstimate}
        estimate={estimate}
        active={createEstimateModal}
        setActive={setCreateEstimateModal}
        setEstimateModal={setActive}
        setSuccessModal={setSuccessModal}
        newReview={newReview}
        setNewReview={setNewReview}
      />}
    </Modal>
    <Modal className="!bg-white p-5" maxWidth={1000} active={revListModal} setActive={setRevListModal}>
    <div className="flex flex-col gap-2">
        {estimate && [...estimate.reviews]
          .sort((a,b) => Number(new Date((b.date))) - Number(new Date((a.date))))
          .slice(2)
          .map(rev => <EstimateItem key={rev._id} est={estimate} rev={rev}/>)}
      </div>
    </Modal>
    <Modal className="!bg-white p-5" active={successModal} setActive={setSuccessModal}>
          <p className="text-lg">{estimateAutoSMS[language]}</p>
          <div className="flex mt-2 gap-2">
            <Button onClick={() => setSuccessModal(false)}>Отлично</Button>
            <Button onClick={goToReviews}>Перейти в мои отзывы</Button>
          </div>
    </Modal>
    </>
  );
}

export default EstimateModal;