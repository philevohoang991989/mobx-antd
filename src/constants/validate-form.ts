import {i18nKey} from 'locales/i18n';

export enum VERYFY_PASSWORD {
  IS_UPPER_CASE = 'isUpperCase',
  IS_LOWER_CASE = 'isLowerCase',
  IS_CONTAIN_SPECIAL_CHARACTER = 'isContainSpecialCharacter',
  IS_CONTAIN_NUMBER = 'isContainNumber',
  IS_ENOUGH_LENGTH = 'isEnoughLength',
}

export interface IVerifyPassword {
  [VERYFY_PASSWORD.IS_UPPER_CASE]: boolean;
  [VERYFY_PASSWORD.IS_LOWER_CASE]: boolean;
  [VERYFY_PASSWORD.IS_CONTAIN_SPECIAL_CHARACTER]: boolean;
  [VERYFY_PASSWORD.IS_CONTAIN_NUMBER]: boolean;
  [VERYFY_PASSWORD.IS_ENOUGH_LENGTH]: boolean;
}
export const MSG_VALIDATE_PASSWORD = {
  msgPasswordBlank: i18nKey.validateForm.msgRequirePassword,
  msgPassError: i18nKey.validateForm.msgPassError,
  msgNotSamePass: i18nKey.validateForm.msgNotSamePass,
  msgIsSameOldPass: i18nKey.validateForm.msgIsSameOldPass,
};
