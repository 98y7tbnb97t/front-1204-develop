import { FC, useState } from "react";
import { IEstimate, IEstimateReview } from "../../models/IEstimate";
import { translations } from "../../utils/translations";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { UserRoles } from "../../utils/userRoles";
import { setAdmComment as setAdmCommentThunk } from "../../store/reducers/EstimatesSlice";
import { IGroup } from "../../models/response/IGroup";
import { formatDate } from "../../utils/formatDate";
import SuccessModal from "../Modals/SuccessModal";

interface EstimateItemProps {
  className?: string
  est: IEstimate;
  rev: IEstimateReview;
}

const EstimateItem:FC<EstimateItemProps> = ({ est, rev }) => {
  const language = useAppSelector(state => state.TranslateSlice.language);
  const user = useAppSelector(state => state.UserSlice.user);
  const [admCommentTranerCanSee, setAdmCommentTranerCanSee] = useState<boolean>(rev.admCommentTranerCanSee || false);
  const [admCommentParentsCanSee, setAdmCommentParentsCanSee] = useState<boolean>(rev.admCommentParentsCanSee || false);
  const [tranerCanSee, setTranerCanSee] = useState<boolean>(rev.tranerCanSee || false);
  const [parentsCanSee, setParentsCanSee] = useState<boolean>(rev.parentsCanSee || false);
  const [admCommentOtherCanSee, setAdmCommentOtherCanSee] = useState<boolean>(rev.admCommentOtherCanSee || false);
  const [showSaveBtn, setShowSaveBtn] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [admComment, setAdmComment] = useState<string>(rev.administrationComment || '');
  const [successModal, setSuccessModal] = useState(false);
  const { 
    ratingText,
    toWhomText,
    fromWhomText,
    saveText,
    administrationComment,
    commentText,
    leaveAdministrationComment,
    groupText,
    dateText,
    canSeeReviews,
    administrationText,
    allParentsText,
    coachText
  } = translations.estimate;

  const setAdmCommentHandler = (estimateId: string, reviewId: string) => {
    setSuccessModal(true);
    void dispatch(setAdmCommentThunk({
      estimateId,
      reviewId,
      admCommentParentsCanSee,
      admCommentTranerCanSee,
      admCommentOtherCanSee,
      tranerCanSee,
      parentsCanSee,
      comment: admComment
    }));
  }
  const { pathname } = window.location;
  const isMessanger = pathname.includes('messenger');

  const whoCanSeeHandler = (e: React.ChangeEvent<HTMLInputElement>, type: 'traner' | 'parent') => {
    [UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role) && (type === 'traner' ? setTranerCanSee(e.target.checked) : setParentsCanSee(e.target.checked));
    setShowSaveBtn(true);
  }

  return (
    <div>

      <div className="bg-slate-300 p-5 rounded-lg mb-2">
          <p><strong>{dateText[language]}:</strong> {formatDate(new Date(new Date(rev.date).toLocaleString('en-US', { timeZone: user.timeZone })), true)}</p>
          <p><strong>{ratingText[language]}</strong> {rev.estimate}-{rev.icon}</p>
          <p><strong>{toWhomText[language]}</strong> {est.traner.name} {est.traner.sname} ({est.traner.email})</p>
          <p><strong>{groupText[language]}:</strong> {(est.group as unknown as IGroup).name}</p>
          <p><strong>{fromWhomText[language]}</strong> {rev.from.name} {rev.from.sname} ({rev.from.email})</p>
          {rev.comment && <p><strong>{commentText[language]}</strong> {rev.comment}</p>}
          
          <div className="flex gap-4 mt-2 mb-2">
            <label className="font-medium">{canSeeReviews[language]}</label>
            <label className="text-slate-400">
              <input className="mr-2" type="checkbox" readOnly defaultChecked={true}/>
              {administrationText[language]}
            </label>
            <label>
              <input
                className="mr-2"
                type="checkbox"
                checked={tranerCanSee}
                onChange={(e) => whoCanSeeHandler(e, 'traner')}
              />
              {coachText[language]}
            </label>
            <label>
              <input
                className="mr-2"
                type="checkbox"
                checked={parentsCanSee}
                onChange={(e) => whoCanSeeHandler(e, 'parent')}
              />
              {allParentsText[language]}
            </label>
          </div>
          <div className="border-b-2 border-b-red-500 pb-2">
            { !isMessanger &&[UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role) && showSaveBtn &&
              <button
                onClick={() => rev._id && setAdmCommentHandler(est._id, rev._id)}
                className={`mt-1 px-4 py-2 rounded bg-blue-500 text-white`}
              >
                {saveText[language]}
              </button>
            }
          </div>
          {
            !isMessanger && rev.administrationComment && rev.admCommentDate && rev.admCommentFrom && 
            (
              (user.role === UserRoles.TRANER && (rev.admCommentTranerCanSee || rev.admCommentTranerCanSee)) ||
              (user.role === UserRoles.STUDENT && (rev.admCommentParentsCanSee || rev.admCommentOtherCanSee)) ||
              ([UserRoles.DIRECTOR, UserRoles.ZDIRECTOR, UserRoles.ADMIN].includes(user.role))
            )
            &&
            <>
              <p><strong>{dateText[language]}</strong> {formatDate(new Date(new Date(rev.admCommentDate).toLocaleString('en-US', { timeZone: user.timeZone })), true)} </p>
              <p><strong>{administrationComment[language]}</strong> {rev.administrationComment}</p>
              <p><strong>Кто написал этот комментарий</strong> {rev.admCommentFrom.name} {rev.admCommentFrom.sname} {rev.admCommentFrom.tname || ''}</p>
              {!isMessanger && ![UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role) &&<div className="flex gap-4">
                <label className="font-medium">Комментарий администрации может видеть</label>
                <label className="text-slate-400">
                  <input className="mr-2" type="checkbox" readOnly defaultChecked={true}/>
                  {administrationText[language]}
                </label>
                <label>
                  <input
                    className="mr-2"
                    type="checkbox"
                    defaultChecked={rev.admCommentTranerCanSee}
                  />
                  {coachText[language]}
                </label>
                <label>
                  <input
                    className="mr-2"
                    type="checkbox"
                    defaultChecked={rev.admCommentParentsCanSee}
                  />
                  Родитель
                </label>
                <label>
                  <input
                    className="mr-2"
                    type="checkbox"
                    defaultChecked={rev.admCommentOtherCanSee}
                  />
                  {allParentsText[language]}
                </label>
              </div>}
            </>
          }
          { !isMessanger && [UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role) &&
            <div className="flex gap-4">
            <label className="font-medium">Комментарий администрации может видеть</label>
            <label className="text-slate-400">
              <input className="mr-2" type="checkbox" readOnly defaultChecked={true}/>
              {administrationText[language]}
            </label>
            <label>
              <input
                className="mr-2"
                type="checkbox"
                defaultChecked={rev.admCommentTranerCanSee}
                onChange={e => setAdmCommentTranerCanSee(e.target.checked)}
              />
              {coachText[language]}
            </label>
            <label>
              <input
                className="mr-2"
                type="checkbox"
                defaultChecked={rev.admCommentParentsCanSee}
                onChange={e => setAdmCommentParentsCanSee(e.target.checked)}
              />
              Родитель
            </label>
            <label>
              <input
                className="mr-2"
                type="checkbox"
                defaultChecked={rev.admCommentOtherCanSee}
                onChange={e => setAdmCommentOtherCanSee(e.target.checked)}
              />
              {allParentsText[language]}
            </label>
          </div>
          }
          { !isMessanger && [UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role) && <div className="flex flex-col mt-2 mb-2 max-w-md">
            <textarea
              value={admComment}
              onChange={e => setAdmComment(e.target.value)}
              className="rounded-md p-3"
              placeholder={leaveAdministrationComment[language]}
            ></textarea>
          </div>}
          { !isMessanger &&[UserRoles.DIRECTOR, UserRoles.ZDIRECTOR].includes(user.role) && 
            <button
              onClick={() => rev._id && setAdmCommentHandler(est._id, rev._id)}
              className={`mt-1 px-4 py-2 rounded bg-blue-500 text-white`}
            >
              {saveText[language]}
            </button>
          }
      </div>
      <SuccessModal modal={successModal} setModal={setSuccessModal} message="Сохранено!" />
    </div>
  );
}

export default EstimateItem;