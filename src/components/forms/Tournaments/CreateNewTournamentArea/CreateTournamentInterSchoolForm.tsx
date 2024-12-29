import React, { useState } from 'react';
import Input from '../../../UI/Main/Input.tsx';
import { Controller, useForm } from 'react-hook-form';
import Select from '../../../UI/Main/Select.tsx';
import { ISelect } from '../../../../models/ISelect.ts';
import {
  additionalTime,
  additionalTimeSeanserForPlayers,
  extraTime,
  seanserColors,
  startTime,
  timeBeforeStart,
  duration,
  visibility,
  age,
  interval,
  countMembers
} from './constants.ts';
import Textarea from '../../../UI/Main/Textarea.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.ts';
import { createSeans } from '../../../../store/reducers/SeansSlice.ts';
import Switch from '../../../UI/Switch.tsx';
import TournamentSwitch from '../../../UI/TournamentSwitch.tsx';
import danger from '../../../../assets/danger.png';
import man from '../../../../assets/man.png';
import woomen from '../../../../assets/woomen.png';
import SelectGroup from '../../../UI/Main/SelectGroup.tsx';



interface Form {
  name: string;
  startPosition: string; // Начальная позиция
  seanserColor: ISelect[]; // Цвет сеансёра в каждой партии
  startTime: ISelect[]; // Начальное время на часах
  additionalTime: ISelect[]; // Добавка времени
  visibility: ISelect[];
  interval: ISelect[];
  extraTime: ISelect[]; // Дополнительное время сеансёра
  additionalTimeSeanserForPlayers: ISelect[]; // Добавка времени сеансёра для каждого игрока
  timeBeforeStart: ISelect[]; // Время до начала сеанса
  description: string;
  duration: ISelect[];
  banned: string;
  allowed: string;
  couple: string;
  age: ISelect[];
  countMembers: ISelect[];
  participationСode: string;
}

const CreateTournamentInterSchoolForm = ({ groupId }: any) => {
  const [manPick, setMan] = useState(false);
  const [woomenPick, setWoomen] = useState(false);
  const [additional, setAdditional] = useState(false)
  const { user } = useAppSelector((state) => state.UserSlice);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [toggleBerserk, setToggleBerserk] = useState(false);
  const [toggleRank, setToggleRank] = useState(false);
  const [toggleSeries, setToggleSeries] = useState(false);
  const [toggleChat, setToggleChat] = useState(false);
  const [toggleLeague, setToggeLeague] = useState(false);
  const handleTournamentSwitchBerserk = () => {
    setToggleBerserk(!toggleBerserk);
  };

  const handleTournamentSwitchRank = () => {
    setToggleRank(!toggleRank)
    console.log(toggleRank)
  };
  const handleTournamentSwitchSeries = () => {
    setToggleSeries(!toggleSeries)
  };
  const handleTournamentSwitchChat = () => {
    setToggleChat(!toggleChat)
  };
  const handleTournamentSwitchLeague = () => {
    setToggeLeague(!toggleLeague)
  };


  const {
    control,
    register,
    getValues,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Form>({});

  const onSubmit = async (data: Form) => {
    // @ts-ignore
    // let d = {
    //   ...data,
    //   additionalTime: data.additionalTime.slug,
    //   additionalTimeSeanserForPlayers:
    //     data.additionalTimeSeanserForPlayers.slug,
    //   seanserColor: data.seanserColor.slug,
    //   extraTime: data.extraTime.slug,
    //   startTime: data.startTime.slug,
    //   timeBeforeStart: data.timeBeforeStart.slug,
    // };
    // let a = await dispatch(
    //   createSeans({ ...d, isGameStarted: false, isEnded: false }),
    // );
    // console.log(a);
    // // @ts-ignore
    // navigate(`/session/tostart/${a.payload._id}`);
    navigate(`/Tournament/${groupId}/interschool/finish`);
  };

  return (
    <div className="p-5  overflow-hidden border-[#B7975A] rounded-3xl ml-6 mt-5 border">
      <h3 className="text-center text-[44px] ">Создать новый Межшкольный турнир</h3>


      <div className="mt-6">
        <Input
          className={'font-bold text-gray-700 placeholder:font-normal rounded-3xl'}
          wrapperClass="w-full"
          type="text"
          placeholder={'Всегда имя должно быть автоматом, логика: Турнир 5, после Турнир 6 или Турнир 17, после Турнир 18. Имя Турнира нелзья редактировать'}
          error={errors.name?.message}
          register={register('name', { required: 'field is required' })}
        />
      </div>

      <div className="border-t my-7">
        <div className="grid grid-cols-2 gap-y-5 gap-x-5">
          <div>
            <div className="flex items-center ">
              <TournamentSwitch
                value={toggleRank}
                onChange={handleTournamentSwitchRank}
              />
              <h2 className="ml-6 font-semibold">Рейтинговая</h2>
            </div>
            <p className="my-1 text-gray-400 text-sm">
              Игры идут с обсчётом рейтингаи влияют на рейтинг игроков
            </p>
          </div>
          <div>
            <Controller
              name="startTime"
              control={control}
              rules={{ required: 'field is required' }}
              render={({ field: { onChange } }) => (
                <Select
                  className="select"
                  wrapperClass="w-full"
                  error={errors.startTime?.message}
                  name="Пригласить учеников из других групп"
                  options={startTime}
                  value={getValues('startTime')}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="startTime"
              control={control}
              rules={{ required: 'field is required' }}
              render={({ field: { onChange } }) => (
                <Select
                  className="select"
                  wrapperClass="w-full"
                  error={errors.startTime?.message}
                  name="Начальное время на часах"
                  options={startTime}
                  value={getValues('startTime')}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              )}
            />
          </div>
          {user.role == 'TRANER' && <div>
            <Controller
              name="additionalTime"
              control={control}
              rules={{ required: 'field is required' }}
              render={({ field: { onChange } }) => (
                <Select
                  className="select"
                  wrapperClass="w-full"
                  error={errors.additionalTime?.message}
                  name="Количество туров"
                  options={additionalTime}
                  value={getValues('additionalTime')}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              )}
            />
          </div> }
          {user.role == 'DIRECTOR' && <div>
            <Controller
              name="additionalTime"
              control={control}
              rules={{ required: 'field is required' }}
              render={({ field: { onChange } }) => (
                <Select
                  className="select"
                  wrapperClass="w-full"
                  error={errors.additionalTime?.message}
                  name="Добавка времени"
                  options={additionalTime}
                  value={getValues('additionalTime')}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              )}
            />
          </div>}
        </div>
      </div>

      <div className="border-t my-7">
        <div className="grid grid-cols-2 gap-y-5 gap-x-5">
          <div>
            <Controller
              name="duration"
              control={control}
              rules={{ required: 'field is required' }}
              render={({ field: { onChange } }) => (
                <Select
                  className="select"
                  wrapperClass="w-full"
                  error={errors.startTime?.message}
                  name="Перерыв между турами"
                  options={duration}
                  value={getValues('duration')}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="timeBeforeStart"
              control={control}
              rules={{ required: 'field is required' }}
              render={({ field: { onChange } }) => (
                <Select
                  className="select"
                  wrapperClass="w-full"
                  error={errors.additionalTime?.message}
                  name="Время до начала турнира"
                  options={timeBeforeStart}
                  value={getValues('timeBeforeStart')}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-5 gap-x-5 ">
          <div>
            <h4 className="text-center text-2xl font-semibold">
              Описание сеанса
            </h4>
            <Textarea
              className="min-h-[150px]"
              wrapperClasses="mb-5"
              error={errors.description?.message}
              register={register('description', {
                required: 'The field must be filled',
              })}
            />
            <p className="text-center text-gray-400 text-sm">
              Хотите что-нибудь сказать участникам? Постарайтесь быть лаконичны.
              Доступны ссылки в формате Markdown: [name](https://url)
            </p>
          </div>
          <div>
            <Input
              className={
                'font-bold text-gray-700 placeholder:font-normal mt-10 rounded-3xl'
              }
              wrapperClass="w-full"
              type="text"
              placeholder={'Начальная позиция'}
              error={errors.startPosition?.message}
              register={register('startPosition', {
                required: 'field is required',
              })}
            />
            <p className="my-1 text-gray-400 text-center text-sm">
              Вставьте правильную строку FEN, чтобы каждая игра начиналась с
              заданной позиции. Это работает только для стандартных игр, но не с
              вариантами. Вы можете использовать <u>Редактор доски</u> для
              создания позиции FEN, а затем вставить её здесь. Оставьте поле
              пустым, чтобы игры начинались с обычной начальной позиции.
            </p>
          </div>

        </div>
      </div>

      {user.role == 'TRANER' &&<div className="flex flex-wrap  ">
        <div>
        <div className="flex items-center  ">
          <TournamentSwitch value={toggleSeries} onChange={handleTournamentSwitchSeries} />
          <h2 className="ml-6 font-semibold">Серии арены</h2>

        </div>
        <p className="my-1 text-gray-400 text-sm">
        После двух побед подряд каждая следующая
        победа даёт не 2 очка, а 4.
            </p>
        </div>


        <div className='sm:ml-16'>
        <div className="flex items-center  ">
          <TournamentSwitch value={toggleChat} onChange={handleTournamentSwitchChat} />
          <h2 className="ml-6 font-semibold">Чат</h2>

        </div>
        <p className="my-1 text-gray-400 text-sm">
        Разрешить игрокам обсуждение в чате
            </p>
        </div>
        <div className='sm:ml-16'>
        <div className="flex items-center  ">
          <TournamentSwitch value={toggleLeague} onChange={handleTournamentSwitchLeague} />
          <h2 className="ml-6 font-semibold">Лига</h2>

        </div>
        </div>
      </div>}
      <div className="flex h-10 items-center justify-end"><h3 className=" text-[28px] italic mr-5 ">Дополнительные настройки</h3><div className={`border-[20px] ${additional ?  'border-b-20 border-b-black mb-4' : 'border-t-20 border-t-black mt-8' } border-transparent   w-10`} onClick={()=>{setAdditional(!additional)}}/></div>
      {additional && user.role == 'TRANER' && <div>
      <div className='flex'><img src={danger} className='h-10 ml-10 mt-1'/><p className='mt-2 text-xl text-center '><strong>Мы не рекомендуем задавать эти условия.</strong> Если вы зададите условия участия, то в вашем турнире сможет принять участие меньше игроков. Показать дополнительные настройки</p>
      </div>


      <div className="border-t my-7">
        <div className="flex flex-wrap">
          <div className='max-w-[500px]'>
            <div className="flex items-center ">
              <TournamentSwitch
                value={toggleRank}
                onChange={handleTournamentSwitchRank}
              />
              <h2 className="ml-6 font-bold text-lg text-pink-500 ">Разрешить Берсерк</h2>
            </div>
            <p className="my-1 text-gray-400 text-sm">
            Разрешает игрокам получать дополнительные очки, если они уменьшат своё время наполовину 
            </p>
          </div>
          <div className='ml-auto'>
            <Input
              className={
                'font-bold text-gray-700 placeholder:font-semibold text-xl h-28 rounded-[30px] placeholder-pink-500'
              }
              wrapperClass="w-full"
              type="text"
              placeholder={'Разрешить участие только перечисленным игрокам'}
              error={errors.startPosition?.message}
              register={register('allowed', {
                required: 'field is required',
              })}
            />
            <p className="my-1 text-gray-400 text-center text-sm">
            Если список не пустой, тогда только игроки из списка смогут участвовать. По одному игроку в строке.
            </p>
          </div>
        
      
        </div>
      </div>

      <div className="border-t my-7">
        <div className="grid grid-cols-2 gap-y-5 gap-x-5">
        <div>
            <Input
              className={
                'font-bold text-gray-700 placeholder:font-semibold text-xl h-28 rounded-[30px] placeholder-pink-500'
              }
              wrapperClass="w-full"
              type="text"
              placeholder={'Запрещённые пары'}
              error={errors.startPosition?.message}
              register={register('banned', {
                required: 'field is required',
              })}
            />
            <p className="my-1 text-gray-400 text-center text-sm">
            Имена игроков, которые не должны играть вместе (например, родственники). По два имени в строке, разделённые пробелами.
            </p>
          </div>
          <div>
            <Input
              className={
                'font-bold text-gray-700 placeholder:font-semibold text-xl h-28 rounded-[30px] placeholder-pink-500'
              }
              wrapperClass="w-full"
              type="text"
              placeholder={'Ручные пары в следующем раунде'}
              error={errors.startPosition?.message}
              register={register('couple', {
                required: 'field is required',
              })}
            />
            <p className="my-1 text-gray-400 text-center text-sm">
            Укажите все пары следующего раунда вручную. Одна пара игроков за линию. Пример:
PlayerA PlayerB
                       PlayerC PlayerD
Чтобы придать прощанию (1 пункт) игроку вместо паре, добавьте линию, как:
 PlayerE 1
Пропущенные игроки будут считаться отсутствующими и получат нулевые очки.
Оставьте это поле пустым, чтобы позволить личессу создавать пары автоматически.
            </p>
          </div>
          
        </div>

        <div>
            <Controller
              name="timeBeforeStart"
              control={control}
              rules={{ required: 'field is required' }}
              render={({ field: { onChange } }) => (
                <Select
                  className="select w-full"
                  wrapperClass="w-full"
                  error={errors.timeBeforeStart?.message}
                  name="Время до начала турнира"
                  options={timeBeforeStart}
                  value={getValues('timeBeforeStart')}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              )}
            />
          </div>
      </div>
      </div>}
    {additional && user.role == 'DIRECTOR' &&  <>
          
            <div className='sm:flex sm:flex-col'>
              <div className="flex mt-5">
                <img src={danger} className="h-10 sm:ml-10 mt-1" />
                <p className="mt-2 text-xl sm:text-center ">
                  <strong>Мы не рекомендуем задавать эти условия.</strong> Если
                  вы зададите условия участия, то в вашем турнире сможет принять
                  участие меньше игроков. Показать дополнительные настройки
                </p>
              </div>

              <div className="border-t my-7">
                <div className="flex flex-wrap">
                  <div className="">
                    <div className="w-[35vw]">
                      <Input
                        className={
                          'font-bold text-gray-700 placeholder:font-normal sm:mt-0 rounded-3xl'
                        }
                        wrapperClass="w-full"
                        type="text"
                        placeholder={'Код для участия'}
                        error={errors.startPosition?.message}
                        register={register('participationСode', {
                          required: 'field is required',
                        })}
                      />
                      <p className="my-1 text-gray-400 text-center text-sm">
                        Сделать турнир закрытым и ограничить доступ паролем
                      </p>
                    </div>
                  </div>
                  <div className="sm:w-[35vw] mt-10 sm:mt-0 ml-auto">
                      <Controller
                        name="timeBeforeStart"
                        control={control}
                        rules={{ required: 'field is required' }}
                        render={({ field: { onChange } }) => (
                          <SelectGroup
                            className="select"
                            wrapperClass="w-full"
                            error={errors.timeBeforeStart?.message}
                            name=" Выбрать определенные группы или учеников "
                            options={timeBeforeStart}
                            value={getValues('timeBeforeStart')}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          />
                        )}
                      />
                    </div>
                </div>
              </div>

              <div className="border-t my-7">
                <div className="">
                  <div className=" flex flex-wrap  ">
                    <div className="w-[85vw] flex flex-wrap">
                      <div className="flex ">
                        <div
                          className={`h-[60px] w-[60px] flex items-center justify-center  rounded-full ${
                            manPick ? 'bg-gradient-token' : 'bg-gradient-silver'
                          }`}
                          onClick={() => setMan(!manPick)}
                        >
                          <img src={man} className="h-[40px]" />
                        </div>
                        <div
                          className={`h-[60px] w-[60px] flex items-center justify-center  rounded-full ${
                            woomenPick
                              ? 'bg-gradient-token'
                              : 'bg-gradient-silver'
                          } ml-[30px]`}
                          onClick={() => setWoomen(!woomenPick)}
                        >
                          <img src={woomen} className="h-[40px]" />
                        </div>
                      </div>
                      <div className=" w-[calc(100vw-35vw)]">
                        <Controller
                          name="age"
                          control={control}
                          rules={{ required: 'field is required' }}
                          render={({ field: { onChange } }) => (
                            <Select
                              className=" w-full ml-[5%] select"
                              wrapperClass=""
                              error={errors.timeBeforeStart?.message}
                              name="Возраст"
                              options={age}
                              value={getValues('age')}
                              onChange={(e) => {
                                onChange(e);
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>

                    
                  </div>

                  <div className="flex flex-wrap mt-10">
                    <div className="w-[35vw]">
                      <Controller
                        name="interval"
                        control={control}
                        rules={{ required: 'field is required' }}
                        render={({ field: { onChange } }) => (
                          <Select
                            className="select"
                            wrapperClass="w-full"
                            error={errors.timeBeforeStart?.message}
                            name=" Интервал рейтинг "
                            options={interval}
                            value={getValues('interval')}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className="w-[35vw] ml-auto ">
                      <Controller
                        name="countMembers"
                        control={control}
                        rules={{ required: 'field is required' }}
                        render={({ field: { onChange } }) => (
                          <Select
                            className="select "
                            wrapperClass="w-full"
                            error={errors.timeBeforeStart?.message}
                            name=" Количество участников"
                            options={countMembers}
                            value={getValues('countMembers')}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap mt-10">
                    <div className="w-[35vw]">
                      <div className="flex items-center  ">
                        <TournamentSwitch
                          value={toggleBerserk}
                          onChange={handleTournamentSwitchBerserk}
                        />
                        <h2 className="sm:ml-5 ml-2 font-semibold">
                        Разрешить Берсерк
                        </h2>
                      </div>
                      <p className="my-1 text-gray-400 text-sm">
                      Разрешает игрокам получать дополнительные очки, если они уменьшат своё время наполовину
                      </p>
                    </div>
                    <div className="w-[35vw] ml-auto">
                      <Input
                        className={
                          'font-bold text-gray-700 placeholder:font-semibold text-xl h-28 rounded-[30px] placeholder-gray-500 mt-2'
                        }
                        wrapperClass="w-full"
                        type="text"
                        placeholder={
                          'Разрешить участие только перечисленным игрокам'
                        }
                        error={errors.startPosition?.message}
                        register={register('allowed', {
                          required: 'field is required',
                        })}
                      />
                      <p className="my-1 text-gray-400 text-center text-sm">
                      В вашем часовом поясе. Это переопределяет настройку «Время до начала турнира
                      </p>
                    </div>
                  </div>

                  <div className="w-[35vw] relative -top-10">
                    <div className="flex items-center  ">
                      <TournamentSwitch
                        value={toggleSeries}
                        onChange={handleTournamentSwitchSeries}
                      />
                      <h2 className="ml-6 font-semibold">Серии арены</h2>
                    </div>
                    <p className="my-1 text-gray-400 text-sm">
                    После двух побед подряд каждая следующая победа даёт не 2 очка, а 4.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center relative -top-10">
                    <div className="w-[35vw] flex  flex-wrap">
                      <div>
                        <div className="flex items-center ">
                          <TournamentSwitch
                            value={toggleChat}
                            onChange={handleTournamentSwitchChat}
                          />
                          <h2 className="ml-6 font-semibold">
                            Чат
                          </h2>
                        </div>
                        <p className="my-1 text-gray-400 text-sm">
                        Разрешить игрокам обсуждение в чате
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center  ">
                          <TournamentSwitch
                            value={toggleLeague}
                            onChange={handleTournamentSwitchLeague}
                          />
                          <h2 className="ml-6 font-semibold">
                            Лига
                          </h2>
                        </div>    
                      </div>
                      
                    </div>
                    <div className="w-[35vw] ml-auto">
                      <Input
                        className={
                          'font-bold text-gray-700 placeholder:font-semibold text-xl h-20 rounded-[30px] placeholder-black'
                        }
                        wrapperClass="w-full"
                        type="text"
                        placeholder={
                          'Особая дата начала'
                        }
                        error={errors.startPosition?.message}
                        register={register('allowed', {
                          required: 'field is required',
                        })}
                      />
                      <p className="my-1 text-gray-400 text-center text-sm">
                        Если список не пустой, тогда только игроки из списка
                        смогут участвовать. По одному игроку в строке.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
        </>}
      <div className="flex flex-row justify-between items-center mt-5">
        <div>
          <button onClick={() => navigate(-1)} className="text-red-600 font-bold">Отменить</button>
        </div>
        <div>
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-gradient-button text-2xl font-semibold rounded-full py-4 px-12 max-h-24 hover:bg-gradient-appricot flex items-center"
          >
            Создать новый Турнир
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTournamentInterSchoolForm;
