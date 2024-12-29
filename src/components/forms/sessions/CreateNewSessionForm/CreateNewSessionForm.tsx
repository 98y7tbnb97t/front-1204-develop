import { useEffect, useState } from 'react';
import Input from '../../../UI/Main/Input';
import { Controller, useForm } from 'react-hook-form';
import Select from '../../../UI/Main/Select';
import { ISelect } from '../../../../models/ISelect';
import {
  additionalTime,
  additionalTimeSeanserForPlayers,
  extraTime,
  ratingInterval,
  seanserColors,
  startTime,
  timeBeforeStart,
  visibility,
} from './constants';
import Textarea from '../../../UI/Main/Textarea';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { createSeans } from '../../../../store/reducers/SeansSlice';
import SeansService from '../../../../services/SeansService';
import EditChessBoardModal from '../../../Modals/EditChessBoardModal';
import { Chess } from 'chess.js';
import TreeSelect from '../../../UI/Main/TreeSelect';

interface Form {
  name: string;
  startPosition?: string; // Начальная позиция
  seanserColor: ISelect[]; // Цвет сеансёра в каждой партии
  startTime: ISelect[]; // Начальное время на часах
  additionalTime: ISelect[]; // Добавка времени
  extraTime: ISelect[]; // Дополнительное время сеансёра
  additionalTimeSeanserForPlayers: ISelect[]; // Добавка времени сеансёра для каждого игрока
  timeBeforeStart: ISelect[]; // Время до начала сеанса
  description: string;

  visibility?: ISelect[];
  groups?: any[];
  ratingInterval?: ISelect[];
  seanser?: ISelect[];
}

const CreateNewSessionForm = ({ groupId }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.UserSlice);
  const [groupsOptions, setGroupsOptions] = useState<any[] | undefined>(
    undefined,
  );
  const [tranersOptions, setTranersOptions] = useState<ISelect[] | undefined>(
    undefined,
  );
  const [editorModal, setEditorModal] = useState<boolean>(false);
  const [game, setGame] = useState(new Chess());

  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({});

  const onSubmit = async (data: Form) => {
    // @ts-ignore
    let d = {
      ...data,
      additionalTime: data.additionalTime.slug,
      additionalTimeSeanserForPlayers:
        data.additionalTimeSeanserForPlayers.slug,
      seanserColor: data.seanserColor.slug,
      extraTime: data.extraTime.slug,
      startTime: data.startTime.slug,
      timeBeforeStart: data.timeBeforeStart.slug,

      visibility: data?.visibility?.slug ? data.visibility.slug : 'private',
      groups: data?.groups?.find(e=>e.id) ? data.groups?.map((group) => group.id) : [groupId],
      seanser: data?.seanser?.slug ? data.seanser.slug : user._id,

      ratingInterval: data.visibility?.slug,
    };
    let seansRes = await dispatch(createSeans({ ...d, status: 'created' }));

    // @ts-ignore
    navigate(`/session/tostart/${seansRes.payload._id}`);
  };

  useEffect(() => {
    SeansService.getGroupsForOptions({})
      .then((res) => setGroupsOptions(res.data))
      .catch((err) => console.log('err groups', err));
    SeansService.getTranersForOptions({})
      .then((res) => setTranersOptions(res.data))
      .catch((err) => console.log('err traners', err));
  }, []);

  return (
    <div className="p-5 bg-white">
      <h3 className="text-center text-[44px]">Создать новый сеанс</h3>
      <p className="text-center text-2xl my-2">
        Если вы создадите сеанс одновременной игры, вам придётся сыграть против
        нескольких игроков одновременно.
      </p>

      <div>
        <Input
          className={'font-bold text-gray-700 placeholder:font-normal'}
          wrapperClass="w-full"
          type="text"
          placeholder={'Имя'}
          error={errors.name?.message}
          register={register('name', { required: 'field is required' })}
        />
        <p className="my-1 text-gray-400 text-center">
          Если название хотя бы немного покажется неуместным, вас могут
          заблокировать.
        </p>
      </div>

      <div className="border-y my-7 border-slate-400 bg-slate-50 px-5 py-8">
        <h4 className="font-semibold text-2xl text-center">Games</h4>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <Input
              className={'font-bold text-gray-700 placeholder:font-normal'}
              wrapperClass="w-full"
              type="text"
              placeholder={'Начальная позиция'}
              error={errors.startPosition?.message}
              register={register('startPosition', {
                // required: {value: false,message:"dd" }
              })}
            />
            <p className="my-1 text-gray-400 text-center">
              Вставьте правильную строку FEN, чтобы каждая игра начиналась с
              заданной позиции. Это работает только для стандартных игр, но не с
              вариантами. Вы можете использовать{' '}
              <button
                onClick={() => setEditorModal(true)}
                className="text-blue-400 underline font-medium hover:text-blue-500"
              >
                Редактор доски
              </button>{' '}
              для создания позиции FEN, а затем вставить её здесь. Оставьте поле
              пустым, чтобы игры начинались с обычной начальной позиции.
            </p>
          </div>
          <div>
            <Controller
              name="seanserColor"
              control={control}
              rules={{ required: 'field is required' }}
              render={({ field: { onChange } }) => (
                <Select
                  className="select"
                  wrapperClass="w-full"
                  error={errors.seanserColor?.message}
                  name="Цвет сеансёра в каждой партии"
                  options={seanserColors}
                  value={getValues('seanserColor')}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="border-y my-7 border-slate-400 bg-slate-50 px-5 py-8">
        <h4 className="font-semibold text-2xl text-center">Clock</h4>
        <div className="grid grid-cols-2 gap-10">
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
            <p className="my-1 text-gray-400 text-center">
              Настройка часов Фишера. Чем больше игроков играет против вас, тем
              больше времени вам может понадобится.
            </p>
          </div>
          <div>
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
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 mt-5">
          <div>
            <Controller
              name="extraTime"
              control={control}
              rules={{ required: 'field is required' }}
              render={({ field: { onChange } }) => (
                <Select
                  className="select"
                  wrapperClass="w-full"
                  error={errors.extraTime?.message}
                  name="Дополнительное время сеансёра"
                  options={extraTime}
                  value={getValues('extraTime')}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              )}
            />
            <p className="my-1 text-gray-400 text-center">
              Вы можете взять себе дополнительное время на обдумывание партий.
            </p>
          </div>
          <div>
            <Controller
              name="additionalTimeSeanserForPlayers"
              control={control}
              rules={{ required: 'field is required' }}
              render={({ field: { onChange } }) => (
                <Select
                  className="select"
                  wrapperClass="w-full"
                  error={errors.additionalTimeSeanserForPlayers?.message}
                  name="Добавка времени сеансёра для каждого игрока"
                  options={additionalTimeSeanserForPlayers}
                  value={getValues('additionalTimeSeanserForPlayers')}
                  onChange={(e) => {
                    onChange(e);
                  }}
                />
              )}
            />
            <p className="my-1 text-gray-400 text-center">
              Добавьте начальное время на ваших часах для каждого игрока,
              вошедшего в ваш сеанс одновременной игры.
            </p>
          </div>
        </div>
      </div>

      {user.role === 'DIRECTOR' || user.role === 'ZDIRECTOR' ? (
        <div className="border-y my-7 border-slate-400 bg-slate-50 px-5 py-8">
          <div className="grid grid-cols-2 gap-10 mt-5">
            <div>
              <Controller
                name="visibility"
                control={control}
                // rules={{ required: 'field is required' }}
                render={({ field: { onChange } }) => (
                  <Select
                    className="select"
                    wrapperClass="w-full"
                    error={errors.visibility?.message}
                    name="Для учеников школы"
                    options={visibility}
                    value={getValues('visibility')}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                )}
              />
            </div>
            {/* {groupsOptions && (
              <div> */}{groupsOptions&&
                <Controller
                  name="groups"
                  control={control}
                  // rules={{ required: 'field is required' }}
                  render={({ field: { onChange } }) => (
                    <Select
                      // @ts-ignore
                      options={groupsOptions}

                      multiple={true}
                      className="select"
                      wrapperClass="w-full"
                      error={errors.groups?.message}
                      // labelText="Выбрать определенные группы или учеников"
                      name="Выбрать определенные группы или учеников"
                      value={getValues('groups')}
                      onChange={(e) => {
                        onChange(e);
                      }}

                      searchAble
                      onSearch={()=>{}}
                      searchQuery=''

                    /> 
                  )}
                />
                }
                
          </div>
          <div className="grid grid-cols-2 gap-10 mt-5">
            <div>
              <Controller
                name="ratingInterval"
                control={control}
                // rules={{ required: 'field is required' }}
                render={({ field: { onChange } }) => (
                  <Select
                    className="select"
                    wrapperClass="w-full"
                    error={errors.ratingInterval?.message}
                    name="Рейтинг интервал"
                    options={ratingInterval}
                    value={getValues('ratingInterval')}
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                )}
              />
            </div>
            {tranersOptions && (
              <div>
                <Controller
                  name="seanser"
                  control={control}
                  // rules={{required: {value: false,message:"dd" } }}
                  // rules={{ required: 'field is required' }}
                  render={({ field: { onChange } }) => (
                    <Select
                      className="select"
                      wrapperClass="w-full"
                      error={errors.seanser?.message}
                      name="Сеансёр"
                      options={tranersOptions}
                      value={getValues('seanser')}
                      onChange={(e) => {
                        onChange(e);
                      }}
                    />
                  )}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        ''
      )}

      <div className="border-y my-7 border-slate-400 bg-slate-50 px-5 py-8">
        <div>
          <Controller
            name="timeBeforeStart"
            control={control}
            rules={{ required: 'field is required' }}
            render={({ field: { onChange } }) => (
              <Select
                className="select"
                wrapperClass="w-full"
                error={errors.timeBeforeStart?.message}
                name="Время до начала сеанса"
                options={timeBeforeStart}
                value={getValues('timeBeforeStart')}
                onChange={(e) => {
                  onChange(e);
                }}
              />
            )}
          />
        </div>
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
          <p className="text-center text-gray-400">
            Хотите что-нибудь сказать участникам?
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center">
        <div>
          <button className="text-red-600">Отменить</button>
        </div>
        <div>
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-gradient-button text-2xl font-semibold rounded-full py-4 px-12 hover:bg-gradient-appricot flex items-center"
          >
            Создать новый Сеанс
          </button>
        </div>
      </div>

      {editorModal && (
        <EditChessBoardModal
          cgame={game}
          setCGame={setGame}
          setModal={setEditorModal}
          modal={editorModal}
        />
      )}
    </div>
  );
};

export default CreateNewSessionForm;
