import { FC, useState } from "react";
import classNames from "classnames";
import Modal from "../UI/Modal";
import { IEstimate, Estimate, EstimateCommentVisibilityOptions, IEstimateReview } from "../../models/IEstimate";
import Button from "../UI/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { createEstimate } from "../../store/reducers/EstimatesSlice";
import { translations } from "../../utils/translations";

interface CreateEstimateModalProps {
  className?: string;
  active: boolean;
  setActive: (active: boolean) => void;
  setEstimateModal: (active: boolean) => void;
  setSuccessModal: (active: boolean) => void;
  newReview: IEstimateReview | null;
  setNewReview: (rev: IEstimateReview | null) => void,
	estimate: IEstimate;
	setEstimate: (estimate: IEstimate) => void;
}

const estimates: Estimate[] = [
    { estimate: 1, icon: '😞' },
    { estimate: 2, icon: '😐' },
    { estimate: 3, icon: '🙂' },
    { estimate: 4, icon: '😀' },
    { estimate: 5, icon: '😍' },
];

const CreateEstimateModal:FC<CreateEstimateModalProps> = ({ setActive, setEstimateModal, setNewReview, newReview, setSuccessModal, estimate, setEstimate }) => {
	const dispatch = useAppDispatch();
	const language = useAppSelector(state => state.TranslateSlice.language);
	const [selectedEst, setSelectedEst] = useState<Estimate | null>();
	const [comment, setComment] = useState<string>('');
	const [tranerCanSee, setTranerCanSee] = useState<boolean>(false);
	const [parentsCanSee, setParentsCanSee] = useState<boolean>(false);
	const user = useAppSelector(state => state.UserSlice.user);
	const { rateCoachWorkText, noCommentText, leaveReviewText, canSeeReviews, administrationText, coachText, allParentsText, sendText, toWhomText } = translations.estimate;
	const [errorText, setErrorText] = useState<string>('');
	const [savedText, setSavedText] = useState<string>('');
	
	const submitHandler = async () => {
		if (selectedEst && user) {
			try {
				if (!newReview) {
					const res = await dispatch(createEstimate({
						...estimate,
						reviews: [...estimate.reviews, {
							estimate: selectedEst.estimate,
							comment: comment,
							tranerCanSee,
							parentsCanSee,
							icon: selectedEst.icon,
							from: user,
							date: new Date(),
						}]
					}));
					setEstimate(res.payload as IEstimate);
				} else {
					const res = await dispatch(createEstimate({
						...estimate,
						reviews: estimate.reviews.map(rev => rev._id === newReview._id ? 
							{
								estimate: selectedEst.estimate,
								comment: comment,
								tranerCanSee,
								parentsCanSee,
								icon: selectedEst.icon,
								from: user,
								date: new Date(),
								_id: newReview._id
							} : rev)
					}));
					setEstimate(res.payload as IEstimate);
				}
				setNewReview(null);
				setErrorText('');
				setActive(false);
				setSavedText('Сохранено');
				setErrorText('');
				setComment('');
				setSelectedEst(null);
				setTranerCanSee(false);
				setParentsCanSee(false);
				setEstimateModal(false);
				setSuccessModal(true);
			} catch (error) {
				console.log(error);
			}
		} if (!selectedEst) {
			setErrorText('Выберите, пожалуйста, оценку');
		}
	}

	const saveEstimate = async (est: Estimate) => {
		setSelectedEst(est);
		setSavedText('Сохранено');
		
		if (!newReview) {
			const res = await dispatch(createEstimate({
				...estimate,
				reviews: [...estimate.reviews, {
					estimate: est.estimate,
					comment: comment,
					tranerCanSee,
					parentsCanSee,
					icon: est.icon,
					from: user,
					date: new Date()
				}]
			}));
			const newEstimate = res.payload as IEstimate;
			setEstimate(newEstimate);
			const newReview = newEstimate.reviews[newEstimate.reviews.length - 1];
			setNewReview(newReview);
		} else {
			await dispatch(createEstimate({
				...estimate,
				reviews: estimate.reviews.map(rev => rev._id === newReview._id ? 
					{
						estimate: est.estimate,
						comment: comment,
						tranerCanSee,
						parentsCanSee,
						icon: est.icon,
						from: user,
						date: new Date()
					} : rev)
			}));
		}
	}

  return (
    // <Modal maxWidth={800} active={active} setActive={setActive} className={classNames('!bg-white p-5', {}, [className])}>
	<>
        <p className="mb-2"><strong>{toWhomText[language]}</strong> {estimate.traner.name} {estimate.traner.sname} {estimate.traner.tname || ''}</p>
        <div className="flex gap-2 mb-4">
            <label className="font-medium">{rateCoachWorkText[language]}</label>
            <div className="flex">
                { estimates.map(estimate => (
                    <button 
						className={classNames(" rounded-md px-1", {
							'bg-slate-300': estimate.estimate === selectedEst?.estimate
						})}
						key={estimate.estimate}
						onClick={() => void saveEstimate(estimate)}
					>
							{estimate.estimate}-{estimate.icon} 
					</button>
                ))}
				{errorText && <p className="text-red-500 ml-2">{errorText}</p>}
				{savedText && <p className="text-green-500 ml-2">{savedText}</p>}
            </div>
        </div>
		<Button className="mb-4" onClick={submitHandler}>{noCommentText[language]}</Button>
		<textarea
			value={comment}
			onChange={e => setComment(e.target.value)}
			className="bg-slate-300 rounded-md p-3"
			placeholder={leaveReviewText[language]}
			rows={15}
		></textarea>
		<div className="flex gap-4 mt-4">
			<label className="font-medium">{canSeeReviews[language]}</label>
			<label className="text-slate-400">
				<input className="mr-2" type="checkbox" name={EstimateCommentVisibilityOptions.administration} readOnly checked={true}/>
				{administrationText[language]}
			</label>
			<label>
				<input
					className="mr-2"
					type="checkbox"
					name={EstimateCommentVisibilityOptions.traner}
					checked={tranerCanSee}
					onChange={e => setTranerCanSee(e.target.checked)}
				/>
				{coachText[language]}
			</label>
			<label>
				<input
					className="mr-2"
					type="checkbox"
					name={EstimateCommentVisibilityOptions.parents}
					checked={parentsCanSee}
					onChange={e => setParentsCanSee(e.target.checked)}
				/>
				{allParentsText[language]}
			</label>
		</div>
		<Button className="mt-4" onClick={submitHandler}>{sendText[language]}</Button>
		{/* </Modal> */}
	</>
  );
}

export default CreateEstimateModal;