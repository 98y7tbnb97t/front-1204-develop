import { RegisterOptions } from 'react-hook-form';
import { translations } from './translations.tsx';
import { Elanguages } from '../store/reducers/TranslateSlice.ts';

const { fieldMustFilledText, invalidMailText } = translations.profile;

const emailValidation = (language: Elanguages) => ({
  required: fieldMustFilledText[language],
  pattern: {
    value:
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<,>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, //eslint-disable-line
    message: invalidMailText[language],
  },
});

const PasswordValidation: RegisterOptions = {
  required: 'The field must be filled',
  minLength: {
    value: 6,
    message: 'Password must be more than 6 characters',
  },
};

const LevelValidation: RegisterOptions = {
  required: 'The field must be filled',
  min: {
    value: 1,
    message: 'Level must be from 1 to 10',
  },
  max: {
    value: 10,
    message: 'Level must be from 1 to 10',
  },
};

const OrderValidation: RegisterOptions = {
  required: 'The field must be filled',
  min: {
    value: 1,
    message: 'Password must be from 1 to 10',
  },
  max: {
    value: 10,
    message: 'Password must be from 1 to 10',
  },
};

export {
  emailValidation,
  PasswordValidation,
  LevelValidation,
  OrderValidation,
};
