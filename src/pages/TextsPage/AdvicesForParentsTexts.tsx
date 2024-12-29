import { FC, useState, useEffect } from 'react';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import ChangeLanguageBtns from '../../components/UI/ChangeLanguageBtns';
import { Elanguages } from '../../store/reducers/TranslateSlice';
import { ReactSortable } from "react-sortablejs";
import { MdDragIndicator } from '@react-icons/all-files/md/MdDragIndicator';
import { saveAdvicesForParents, getAdvicesForParents } from '../../store/reducers/InfoTextsSlice';
import { TextBlock, VideoItem } from '../../models/IInfoTexts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { EInfoTextFields } from '../../models/IInfoTexts';
import Modal from '../../components/UI/Modal';
import { translations } from '../../utils/translations';
import TextEditor from '../../components/Widgets/TextEditor';

const AdvicesForParentsTexts: FC = () => {
    const dispatch = useAppDispatch();
    const advicesForParents = useAppSelector(state => state.InfoTextsSlice[EInfoTextFields.advicesForParents]);
    const [redTextLanguage, setRedTextLanguage] = useState(Elanguages.RU); 
    const language = useAppSelector(state => state.TranslateSlice.language);
    const [redTextAbove, setRedTextAbove] = useState<{ [key in Elanguages]: string }>({
        [Elanguages.RU]: '', [Elanguages.EN]: '', [Elanguages.AM]: ''
    });
    const [textBlocks, setTextBlocks] = useState<TextBlock[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoFiles, setVideoFiles] = useState<{ videoId: string, file: File }[]>([]);
    const [videosToDelete, setVideosToDelete] = useState<string[]>([]);
    const [isSortDisabled, setIsSortDisabled] = useState(false);

    useEffect(() => {
        void dispatch(getAdvicesForParents()).unwrap();
    }, [dispatch]);

    useEffect(() => {
        if (advicesForParents) {
            setRedTextAbove(advicesForParents.redTextAbove);
            setTextBlocks(advicesForParents.textBlocks.map(block => ({
                ...block,
                language: Elanguages.RU,
                id: block?._id || '',
                videos: block.videos || [],
            })));
        }
    }, [advicesForParents]);

    const addTextBlock = () => {
        const newId = String(Math.floor(Math.random() * 1000000) + 1);
        setTextBlocks(prevBlocks => [...prevBlocks, { 
            id: newId, 
            title: { [Elanguages.RU]: '', [Elanguages.EN]: '', [Elanguages.AM]: '' }, 
            content: { [Elanguages.RU]: '', [Elanguages.EN]: '', [Elanguages.AM]: '' },
            videos: [],
            language: Elanguages.RU
        }]);
    };

    const removeTextBlock = (id: string) => {
        setTextBlocks(prevBlocks => prevBlocks.filter(block => block.id !== id));
    };

    const updateTextBlock = (id: string, field: 'title' | 'content', value: string) => {
        setTextBlocks(prevBlocks => prevBlocks.map(block => 
            block.id === id ? { ...block, [field]: { ...block[field], [block.language]: value } } : block
        ));
    };

    const updateRedTextAbove = (value: string) => {
        setRedTextAbove({ ...redTextAbove, [redTextLanguage]: value });
    };

    const updateVideoBlock = (id: string, titles: { [key in Elanguages]: string }, video: File) => {
        const videoId = String(Math.floor(Math.random() * 1000000) + 1);
        const newVideo: VideoItem = {
            id: videoId,
            title: titles,
            url: '',
        };
        setVideoFiles(prevFiles => [...prevFiles, { videoId, file: video }]);
        setTextBlocks(prevBlocks => prevBlocks.map(block => 
            block.id === id ? { ...block, videos: [...block.videos, newVideo] } : block
        ));
    };

    const removeVideoBlock = (id: string, videoId: string) => {
        setVideosToDelete(prevVideos => [...prevVideos, videoId]);
        setVideoFiles(prevFiles => prevFiles.filter(file => file.videoId !== videoId));
        setTextBlocks(prevBlocks => prevBlocks.map(block => 
            block.id === id ? { ...block, videos: block.videos.filter(v => v.id !== videoId) } : block
        ));
    };

    const saveAllData = async () => {
        try {
            await dispatch(saveAdvicesForParents({ redTextAbove, textBlocks, videoFiles, videosToDelete })).unwrap();
            setIsModalOpen(true);
            setVideoFiles([]);
            setVideosToDelete([]);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const setLanguage = (language: Elanguages, id: string | undefined) => {
        if (!id) {
            return;
        }
        setTextBlocks(prevBlocks => prevBlocks.map(b => {
            if (b._id === id) {
                return { ...b, language: language }; 
            }
            return b;
        }))
    }

    return (
        <>
            <div className="flex flex-col gap-2">
                <label className='text-sm font-bold sm:text-xl'>{translations.advicesForTraners.redTextAbove[redTextLanguage]}</label>
                <div className="flex">
                    <Input
                        type="text"
                        wrapperClasses='grow'
                        value={redTextAbove[redTextLanguage] || ''}
                        onChange={(e) => updateRedTextAbove(e.target.value)}
                    />
                    <Button onClick={saveAllData} className="w-max ml-2 bg-green-500 hover:bg-green-600">{translations.advicesForTraners.saveChanges[language]}</Button>
                </div>
                <ChangeLanguageBtns language={redTextLanguage} onLangChange={setRedTextLanguage}/>
            </div>
            <ReactSortable 
                list={textBlocks.map(block => ({ ...block, id: block.id }))} 
                setList={setTextBlocks} 
                animation={200}
                handle={".my-handle"}
                disabled={isSortDisabled}
            >
                {textBlocks.map((block) => (
                    <div key={block.id} className="mt-5 flex flex-col gap-2 bg-gray-100 p-4 rounded-lg relative group">
                        <div 
                            onMouseEnter={() => setIsSortDisabled(false)}
                            className="my-handle absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <MdDragIndicator size={24} className="text-gray-400" />
                        </div>
                        <div className="ml-8">
                            <label className='text-sm font-bold sm:text-xl'>{translations.requisites.advicesForParentsText[block.language]}</label>
                            <Input
                                type="text"
                                value={block.title[block.language] || ''}
                                onChange={(e) => updateTextBlock(block.id, 'title', e.target.value)}
                            />
                            <label className='text-sm font-bold sm:text-xl mt-2'>{translations.advicesForTraners.content[block.language]}</label>
                            <div className="mt-2">
                            {block.language === Elanguages.RU && <TextEditor onChange={(value: string) => updateTextBlock(block.id, 'content', value || '')} value={block.content.ru || ''} />}
                            {block.language === Elanguages.EN && <TextEditor onChange={(value: string) => updateTextBlock(block.id, 'content', value || '')} value={block.content.en || ''} />}
                            {block.language === Elanguages.AM && <TextEditor onChange={(value: string) => updateTextBlock(block.id, 'content', value || '')} value={block.content.am || ''} />}
                            </div>
                            <ChangeLanguageBtns className="mt-2" language={block.language} onLangChange={(lang) => setLanguage(lang, block._id)}/>
                            <label className='text-sm font-bold sm:text-xl mt-2'>{translations.advicesForTraners.videos[block.language]}</label>
                            <div className="flex items-center flex-wrap">
                                <div className="flex gap-2 mt-2 mr-4">
                                    <input
                                        type="text"
                                        placeholder="RU Title"
                                        className="border p-2 rounded"
                                        id={`video-title-ru-${block.id}`}
                                    />
                                    <input
                                        type="text"
                                        placeholder="EN Title"
                                        className="border p-2 rounded"
                                        id={`video-title-en-${block.id}`}
                                    />
                                    <input
                                        type="text"
                                        placeholder="AM Title"
                                        className="border p-2 rounded"
                                        id={`video-title-am-${block.id}`}
                                    />
                                </div>
                                <input
                                    type="file"
                                    id={`video-upload-${block.id}`}
                                    accept="video/*"
                                    style={{ display: 'none' }}
                                    className='mt-2'
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            const file = e.target.files[0];
                                            const titles = {
                                                [Elanguages.RU]: (document.getElementById(`video-title-ru-${block.id}`) as HTMLInputElement).value,
                                                [Elanguages.EN]: (document.getElementById(`video-title-en-${block.id}`) as HTMLInputElement).value,
                                                [Elanguages.AM]: (document.getElementById(`video-title-am-${block.id}`) as HTMLInputElement).value,
                                            };
                                            if (file && titles[Elanguages.RU] && titles[Elanguages.EN] && titles[Elanguages.AM]) {
                                                updateVideoBlock(block.id, titles, file);
                                                (document.getElementById(`video-title-ru-${block.id}`) as HTMLInputElement).value = '';
                                                (document.getElementById(`video-title-en-${block.id}`) as HTMLInputElement).value = '';
                                                (document.getElementById(`video-title-am-${block.id}`) as HTMLInputElement).value = '';
                                            }
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => document.getElementById(`video-upload-${block.id}`)?.click()}
                                    className="mt-2 bg-blue-500 text-white rounded px-4 py-2"
                                >
                                    {translations.advicesForTraners.addVideo[block.language]}
                                </button>
                                <Button onClick={() => removeTextBlock(block.id)} className=" mt-2 ml-auto w-max">{translations.advicesForTraners.deleteBlock[block.language]}</Button>
                                <Button onClick={saveAllData} className="w-max ml-2 mt-2 bg-green-500 hover:bg-green-600">{translations.advicesForTraners.saveChanges[language]}</Button>
                            </div>
                            <div className='mt-4'>
                                {block.videos.map((video: VideoItem) => (
                                    <div key={video.id} className="flex items-center justify-between">
                                        <span>{video.title[block.language]}</span>
                                        <button onClick={() => removeVideoBlock(block.id, video.id)} className="text-red-500">{translations.advicesForTraners.deleteBlock[block.language]}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </ReactSortable>
            <Button onClick={addTextBlock} className="mt-5">{translations.advicesForTraners.addBlock[language]}</Button>
            

            <Modal active={isModalOpen} setActive={setIsModalOpen}>
                <div className="p-4 text-center">
                    <h2 className="text-xl font-bold mb-2">{translations.advicesForTraners.successMessage[language]}</h2>
                    <p>{translations.advicesForTraners.dataSaved[language]}</p>
                    <Button onClick={() => setIsModalOpen(false)} className="mt-4">{translations.advicesForTraners.close[language]}</Button>
                </div>
            </Modal>
        </>
    );
};

export default AdvicesForParentsTexts;