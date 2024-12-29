import { Listbox } from '@headlessui/react';
import { AxiosError } from 'axios';
import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ITheme } from '../../models/Program/ITheme';
import { ServerError } from '../../models/response/ServerError';
import { createTheme, editTheme } from '../../store/reducers/ProgramSlice';

import { LevelValidation } from '../../utils/ValidationRules';
import {
  ITranslateItemString,
  translations,
} from '../../utils/translations.tsx';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import AuthErrorModal from './AuthError';

interface AddProgramThemeModalProps {
  modal: boolean;
  setModal: (bool: boolean) => void;
  edit?: boolean;
  theme?: ITheme;
  changeOrder?: boolean;
  setActive?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface Filter {
  id: number;
  name: string;
  slug: string;
}

type Form = {
  name: string;
  select: Filter;
  level: number;
  order: number;
};

type GroupedLevel = {
  level: number;
  count: number;
};

const AddProgramThemeModal: FC<AddProgramThemeModalProps> = ({
  modal,
  setModal,
  edit,
  theme,
  changeOrder,
  setActive
}) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.TranslateSlice.language);
  const allthemes = useAppSelector((state) => state.ProgramSlice.allThemes);

  const {
    endgameText,
    middleGameText,
    strategyText,
    oppeningText,
    tacticsText,
  }: {
    endgameText: ITranslateItemString;
    middleGameText: ITranslateItemString;
    strategyText: ITranslateItemString;
    oppeningText: ITranslateItemString;
    tacticsText: ITranslateItemString;
  } = translations.lessons;

  const filter: Filter[] = [
    { id: 1, name: endgameText[language], slug: 'endshpil' },
    { id: 2, name: middleGameText[language], slug: 'mittelshpil' },
    { id: 3, name: strategyText[language], slug: 'strategy' },
    { id: 4, name: oppeningText[language], slug: 'debut' },
    { id: 5, name: tacticsText[language], slug: 'tactic' },
  ];

  const [modalError, setModalError] = useState<string>('');
  const [eModal, setEModal] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState(filter[0]);
  const [order, setOrder] = useState<number>(0);
  const [orderError, setOrderError] = useState<string>('');
  const [groupedLevels, setGroupedLevels] = useState<Array<GroupedLevel>>([]);

  const {
    control,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Form>({ defaultValues: { select: filter[0] } });

  const getCountByLevel = (level: number) => {
    const result = groupedLevels.find((item) => item.level === level);
    return result ? result.count : 0;
  };

  const handleOrderChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = parseInt(event.target.value, 10);
    const level = watch('level');
    if (isNaN(newValue) || newValue < 1 || newValue > getCountByLevel(+level)) {
      setOrderError(
        'Order must be from 1 to ' + getCountByLevel(+level).toString(),
      );
      setOrder(theme?.order || 0);
    } else {
      setOrderError('');
      setOrder(newValue);
    }
  };

  const onSubmit: SubmitHandler<Form> = async (data, e) => {
    e?.preventDefault();
    if (!edit) {
      try {
        await dispatch(
          createTheme({
            name: data.name,
            filter: data.select.slug,
            level: data.level,
            order: 0,
          }),
        );
        setModal(false);
      } catch {
        (e: AxiosError) => {
          const event = e.response?.data as ServerError;
          setModalError(event.error);
          setEModal(true);
        };
      }
    } else {
      if (theme) {
        setActive?.('');
        const response = await dispatch(
          editTheme({
            themeId: theme._id,
            name: data.name,
            filter: data.select.slug,
            level: data.level,
            order: order,
          }),
        );
        const res = response.payload as ServerError;
        setTimeout(() => {
          setActive?.(theme._id);
        }, 500)
        if (res?.error) {
          setEModal(true);
          setModalError(res.error);
        } else {
          setModal(false);
        }
      }
    }
  };

  useEffect(() => {
    if (edit && theme) {
      setValue('name', theme.name);
      setValue('level', theme.level);
      setOrder(theme?.order ?? 0);
      setOrderError('');
      const indx = filter.findIndex((item) => item.slug === theme.filter);
      if (indx !== -1) {
        setValue('select', filter[indx]);
        setSelectedFilter(filter[indx]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit, theme, setValue]);

  useEffect(() => {
    const levelsCounter = (items: ITheme[]): GroupedLevel[] => {
      const grouped: Record<number, ITheme[]> = items.reduce<
        Record<number, ITheme[]>
      >((acc, item) => {
        if (!acc[item.level]) {
          acc[item.level] = [];
        }
        acc[item.level].push(item);
        return acc;
      }, {});
      return Object.keys(grouped).map((level) => ({
        level: parseInt(level, 10),
        count: grouped[parseInt(level, 10)].length,
      }));
    };
    const groupByLevel = levelsCounter(allthemes);
    setGroupedLevels(groupByLevel);
  }, [allthemes]);

  return (
    <>
      <Modal active={modal} setActive={setModal} className="items-center">
        <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize ">
          {edit ? 'Edit theme' : 'Create new theme'}
        </h1>
        <form
          onSubmit={(e) => void handleSubmit(onSubmit)(e)}
          className="bg-white container mx-auto flex flex-col px-10 py-5 max-w-2xl"
        >
          <Input
            wrapperClasses="mb-5"
            type="text"
            label="Theme name:"
            error={errors.name?.message}
            register={register('name', {
              required: 'The field must be filled',
            })}
          />
          <Controller
            name="select"
            control={control}
            render={({ field: { onChange } }) => (
              <div>
                <label
                  className="block text-sm text-gray-600 mb-2"
                  htmlFor="selectFilter"
                >
                  Filter
                </label>
                <Listbox
                  id="selectFilter"
                  className="mb-5 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-apricot focus:ring-apricot focus:outline-none focus:ring focus:ring-opacity-40"
                  as="div"
                  value={selectedFilter ?? ''}
                  onChange={(e) => {
                    onChange(e);
                    setSelectedFilter(e);
                  }}
                >
                  <Listbox.Button className="p-3">
                    {selectedFilter.name ?? ''}
                  </Listbox.Button>
                  <Listbox.Options className="border-t-2 border-t-apricot">
                    {filter.map((filt) => (
                      <Listbox.Option
                        className="cursor-pointer px-3 py-2 hover:bg-apricot"
                        key={filt.id}
                        value={filt}
                      >
                        {filt.name || ''}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </div>
            )}
          />
          <Input
            wrapperClasses="mb-5"
            type="number"
            label="Level:"
            error={errors.level?.message}
            register={register('level', LevelValidation)}
          />
          {edit && changeOrder && (
            <Input
              wrapperClasses={orderError ? '' : 'mb-5'}
              type="number"
              label="Order:"
              value={order !== undefined ? order.toString() : ''}
              onChange={handleOrderChange}
            />
          )}
          {orderError && (
            <p className="text-red-500 mb-5 text-sm"> {orderError}</p>
          )}
          <Button>{edit ? 'Edit Theme' : 'Create Theme'}</Button>
        </form>
      </Modal>
      <AuthErrorModal modal={eModal} setModal={setEModal} error={modalError} />
    </>
  );
};

export default AddProgramThemeModal;
