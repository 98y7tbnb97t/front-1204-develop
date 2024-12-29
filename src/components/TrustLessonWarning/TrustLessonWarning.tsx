import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import Button from "../UI/Button";
import { UserRoles } from "../../utils/userRoles";
import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { translations } from "../../utils/translations";
import AuthService from "../../services/AuthService";

interface TrustLessonWarningProps {
    className?: string;
    border?: boolean;
    payBtn?: boolean;
}

const TrustLessonWarning: FC<TrustLessonWarningProps> = ({ className, border = false,  payBtn = true }) => {
    const { user } = useAppSelector(state => state.UserSlice);
    const language = useAppSelector(state => state.TranslateSlice.language);
    const [trustLessonDates, setTrustLessonDates] = useState<Date[]>([]);
    const {
        trustLessonWarningText,
        payNowText,
    } = translations.access;

    useEffect(() => {
        const fetchData = async () => {
            if (user._id) {
                const response = await AuthService.getTrustLessonDates(user._id);
                setTrustLessonDates(response.data.trustLessonDates);
            }
        }
        void fetchData();
    }, [user._id])

    if (user.role == UserRoles.STUDENT && user.trustLesson) {
        return (
            <div className={classNames("bg-[#f87168] p-2 flex flex-col sm:flex-row items-center justify-center gap-2", {'rounded-lg': border}, className)}>
                <p className='text-md sm:text-lg text-white text-center'>
                    { trustLessonDates && !!trustLessonDates  && `${new Date(trustLessonDates.at(-1) || '').toLocaleString()} - ` }
                    {trustLessonWarningText[language]}
                </p>
                {payBtn && (
                    <Link  to='/balance'>
                        <Button className='w-max mx-auto bg-sky-500 hover:text-white font-bold'>
                            {payNowText[language]}
                        </Button>
                    </Link>
                )}
            </div>
        )
    } else {
        return;
    }
}

export default TrustLessonWarning;