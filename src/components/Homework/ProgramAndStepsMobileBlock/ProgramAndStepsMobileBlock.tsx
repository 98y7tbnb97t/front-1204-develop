import {FC, useState} from 'react'
import Title from '../../UI/Title';
import {IMaterial} from '../../../models/Program/IMaterial';
import ProgramMain from "../Program/ProgramMain.tsx";

import "./ProgramAndStepsMobileBlock.css"
import GameMain from "../Game/GameMain.tsx";
import {useAppSelector} from "../../../hooks/redux.ts";
import {ITranslateItemString, translations} from "../../../utils/translations.tsx";
import {isDeviceMobile} from "../../../utils/getDeviceType.ts";
import AboutMovesBtn from "../AboutMovesBtn.tsx";

interface ProgramAndStepsMobileBlockProps {
    program: IMaterial[];
    setMaterial: (material: IMaterial) => void;
    setMaterialName?: (name: string) => void;
    active?: string;
    homework?: boolean;
    moves: Array<{
        id: string;
        user_id: string,
        name: string;
        sname: string;
        moves: Array<{ color: string, move: string }>;
    }>;
    openSendAnswersPopup: () => void;
    rightPanelMode: string,
    setRightPanelMode: (value: string) => void;
    position?: string;
    materialId?: string;
}

const enum TABS {
    STEPS,
    TASKS,

}

const ProgramAndStepsMobileBlock: FC<ProgramAndStepsMobileBlockProps> = ({
                                                                             program,
                                                                             setMaterial,
                                                                             setMaterialName,
                                                                             active,
                                                                             homework,
                                                                             position,
                                                                             materialId,
                                                                             cgame,
                                                                             setGame,
                                                                             openSendAnswersPopup
                                                                         }) => {
    const [activeTab, setActiveTab] = useState<TABS>(TABS.STEPS)
    const language = useAppSelector(state => state.TranslateSlice.language)

    const {
        sendHomeworkForCheckingText,
        sendHomeworkForCheckingShortText,
        movesText,
        chapterText
    }: {
        sendHomeworkForCheckingText: ITranslateItemString,
        sendHomeworkForCheckingShortText: ITranslateItemString,
        movesText: ITranslateItemString,
        chapterText: ITranslateItemString
    } = translations.homework

    const sendAnswersToCheckingText = isDeviceMobile() ? sendHomeworkForCheckingShortText[language] : sendHomeworkForCheckingText[language]

    const onChangeActiveTab = (tab: TABS): void => setActiveTab(tab)

    return (
        <div className="overflow-hidden w-full programAndStepsMobileBlock">
            <div
                className='flex flex-1 flex-col border-2 border-[#CCC] overflow-auto p-1 rounded-b-2xl border-t-0 '>
                <div className='flex flex-col gap-1 tabs-container'>
                    <button className="tabBtn flex-1" onClick={() => onChangeActiveTab(TABS.STEPS)}>
                        <Title name={movesText[language]} isPassive={activeTab == TABS.STEPS} className='tabBtn-title py-1'/>
                    </button>
                    <button className='tabBtn flex-1' onClick={() => onChangeActiveTab(TABS.TASKS)}>
                        <Title name={chapterText[language]} isPassive={activeTab == TABS.TASKS} className='tabBtn-title py-1'/>
                    </button>

                    <button className="tabBtn tabBtn-mob" onClick={openSendAnswersPopup}>
                        <Title name={sendAnswersToCheckingText} className='tabBtn-title'/>
                    </button>
                    <AboutMovesBtn className={'sm:hidden flex flex-1 justify-center'}/>
                </div>

                <div className="programAndStepsMobileBlock--content">
                    {
                        activeTab === TABS.TASKS ?
                            <ProgramMain
                                program={program}
                                setMaterial={setMaterial}
                                setMaterialName={setMaterialName}
                                active={active}
                                homework={homework}
                            /> :
                            <GameMain
                                cgame={cgame}
                                setGame={setGame}
                                position={position}
                                materialId={materialId}
                            />
                    }


                </div>
            </div>
            <button className="tabBtn tabBtn-tab " onClick={openSendAnswersPopup}>
                <Title className={'py-2 tabBtn-title'} name={sendAnswersToCheckingText}/>
            </button>
        </div>
    )
}

export default ProgramAndStepsMobileBlock;