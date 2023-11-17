/* eslint-disable @typescript-eslint/no-explicit-any */
import {USER_FIELDS} from 'constants/user';
import {IVerifyPassword, VERYFY_PASSWORD} from 'constants/validate-form';
export const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
export const UPPER_CASE_TEXT = /[A-Z]/;
export const LOWER_TEXT = /[a-z]/;
export const NUMBER = /[0-9]/;
export const LENGTH_CHARACTER = /^.{8,}/;
export const TEMPORARY_CHARACTER = 8;

interface IMsgPassword {
  msgPasswordBlank: string;
  msgPassError: string;
  msgNotSamePass: string;
  msgIsSameOldPass: string;
}

export const handleEnableButton = (
  verifyPassWord: IVerifyPassword,
  form: any,
) => {
  if (
    verifyPassWord[VERYFY_PASSWORD.IS_UPPER_CASE] &&
    verifyPassWord[VERYFY_PASSWORD.IS_LOWER_CASE] &&
    verifyPassWord[VERYFY_PASSWORD.IS_CONTAIN_SPECIAL_CHARACTER] &&
    verifyPassWord[VERYFY_PASSWORD.IS_CONTAIN_NUMBER] &&
    verifyPassWord[VERYFY_PASSWORD.IS_ENOUGH_LENGTH] &&
    form.getFieldValue(USER_FIELDS.NEW_PASSWORD) ===
      form.getFieldValue(USER_FIELDS.CONFIRM_PASSWORD)
  ) {
    return false;
  }
  return true;
};
export const handleChangePassword = (
  password: string,
  setShowValidate: any,
  verifyPassWord: IVerifyPassword,
  setVerifyPassWord: any,
  isNewPassword: boolean,
) => {
  if (isNewPassword) {
    setShowValidate(true);
  }

  setVerifyPassWord({
    isUpperCase: UPPER_CASE_TEXT.test(password),
    isLowerCase: LOWER_TEXT.test(password),
    isContainNumber: NUMBER.test(password),
    isEnoughLength: LENGTH_CHARACTER.test(password),
  });
};
export const validatePassword = (
  value: string,
  message: IMsgPassword,
): Promise<any> => {
  if (!value) {
    return Promise.reject(message.msgPasswordBlank);
  }
  if (!PASSWORD_PATTERN.test(value)) {
    return Promise.reject(message.msgPassError);
  }

  return Promise.resolve();
};
