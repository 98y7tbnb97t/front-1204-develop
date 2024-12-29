import { FC } from 'react'
import MainButton from '../../UI/MainButton';
import { useAppSelector } from '../../../hooks/redux';
import {ITranslateItemString, translations} from "../../../utils/translations.tsx";

const Description: FC = () => {
    const { group } = useAppSelector(state=> state.GroupSlice)
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        nameText,
        descriptionText,
        levelText,
        substituteTranerComment,
    }: {
        nameText: ITranslateItemString,
        descriptionText: ITranslateItemString,
        levelText: ITranslateItemString,
        substituteTranerComment: ITranslateItemString,
    } = translations.groups
    return (
        <div className='bg-[#f0f0f0] mx-5 -my-2 rounded-xl overflow-hidden'>
            <div>
                <div className='bg-[#dadada] p-4'>
                    <div className="flex justify-between mx-auto">
                        <MainButton className='w-full mr-10'>{nameText[language]}</MainButton>
                        <MainButton className='w-full mr-10'>{levelText[language]}</MainButton>
                        <MainButton className='w-full mr-10'>{descriptionText[language]}</MainButton>
                        <MainButton className='w-full mr-10'>{substituteTranerComment[language]}</MainButton>
                    </div>
                </div>
                <div>
                    <div className='flex justify-between mx-auto p-4 items-start'>
                        <div className='border-2 py-3 border-[#c4c4c4] rounded-full flex justify-center items-center font-semibold bg-white w-full mr-10'>{group?.name}</div>
                        <p className='w-full mr-10 text-center'>{group?.level.replace(levelText.ru, levelText[language])}</p>
                        <p className='w-full mr-10 text-center whitespace-break-spaces break-all'>{group?.description}</p>
                        <p className='w-full mr-10 text-center whitespace-break-spaces break-all'>
                            {group?.substituteTranerComment} <br/>
                            { (group.substituteTranerCommentBy && group.substituteTranerCommentAt) && (
                            <>
                                {group.substituteTranerCommentBy?.name} {group.substituteTranerCommentBy?.sname}, {new Date(group.substituteTranerCommentAt || '').toLocaleString()}
                            </>
                            ) }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Description;