import React, {useState} from 'react';
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button, Form, Input, Row, message} from 'antd';

//Icons
import passwordIcon from 'assets/icons/ic_password.svg';
import backgroundImage from 'assets/icons/ic_background.svg';
import {ResetPassDTO} from 'shared/dto/auth.dto';
import showPassWord from 'assets/icons/show-password.svg';
import hidePassWord from 'assets/icons/hide-password.svg';
//styles
import {PageRoute} from 'constants/route';
import {i18nKey} from 'locales/i18n';
import {useTranslation} from 'react-i18next';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {AuthService} from 'services/auth.service';
import Container from 'typedi';
import styles from './reset-pass.module.scss';
import {ValidatePassword} from 'components/validate-field/validate-password';
import {
  IVerifyPassword,
  MSG_VALIDATE_PASSWORD,
  VERYFY_PASSWORD,
} from 'constants/validate-form';
import {
  handleChangePassword,
  handleEnableButton,
  validatePassword,
} from '../../../validation/use.validator';
import {USER_FIELDS} from 'constants/user';
import {RuleObject} from 'antd/es/form';

const ResetPassPage = () => {
  const [form] = Form.useForm();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showValidate, setShowValidate] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formResetPass, setFormResetPass] = useState({
    password: '',
    password_confirmation: '',
  });
  const [verifyPassWord, setVerifyPassWord] = useState<IVerifyPassword>({
    [VERYFY_PASSWORD.IS_UPPER_CASE]: false,
    [VERYFY_PASSWORD.IS_LOWER_CASE]: false,
    [VERYFY_PASSWORD.IS_CONTAIN_SPECIAL_CHARACTER]: false,
    [VERYFY_PASSWORD.IS_CONTAIN_NUMBER]: false,
    [VERYFY_PASSWORD.IS_ENOUGH_LENGTH]: false,
  });
  const authService = Container.get(AuthService);

  const handleChangePass = () => {
    handleChangePassword(
      form.getFieldValue(USER_FIELDS.NEW_PASSWORD),
      setShowValidate,
      verifyPassWord,
      setVerifyPassWord,
      false,
    );
    handleEnableButton(verifyPassWord, form);
  };

  const onFinish = (values: any) => {
    try {
      const resetData: any = {
        new_password: values.newPassword.trim(),
        token: searchParams.get('token'),
      };
      authService.getResetPass(new ResetPassDTO(resetData)).then((result) => {
        const {data} = result;

        if (data?.statusCode === 404 || data?.statusCode === 400) {
          message.error(t(i18nKey.ErrorMessage.msgSentRequestFail));
        } else {
          if (data === '') {
            message.success(t(i18nKey.SuccessMessage.msgSentRequestSuccess));
            navigate(PageRoute.LOGIN);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const validateConfirmationPassword = (
    rule: RuleObject,
    value: any,
    callback: (error?: string) => void,
  ) => {
    const new_pass = form.getFieldValue(USER_FIELDS.NEW_PASSWORD);

    if (
      typeof value !== 'undefined' &&
      value.trim() !== '' &&
      new_pass !== value.trim()
    ) {
      return callback(t(i18nKey.passwordConfirmation));
    }
    return callback();
  };

  return (
    <div
      className={styles.fullScreen}
      style={{backgroundImage: `url(${backgroundImage})`}}
    >
      <div className={`${styles.centerBox} ${styles.formReset}`}>
        <div className={styles.titlePage}>
          {t(i18nKey.title.titleNewPassword)}
        </div>
        <Row className={styles.form} justify="center">
          <Form
            form={form}
            className={styles.formAuth}
            initialValues={{remember: true}}
            onFinish={onFinish}
            autoComplete="off"
            onFieldsChange={(_, allFields) => {
              const isSomeFieldBeEmpty = allFields.some(
                (field) => !field.value,
              );

              setIsSubmitDisabled(isSomeFieldBeEmpty);
            }}
          >
            <Row>
              <Form.Item
                className={styles.formInput}
                name={USER_FIELDS.NEW_PASSWORD}
                rules={[
                  {
                    required: true,
                    message: t(i18nKey.MessageRule.txtInputNewPasswordRequired),
                  },
                  () => ({
                    validator(_, value) {
                      return validatePassword(value, MSG_VALIDATE_PASSWORD);
                    },
                  }),
                ]}
              >
                <Input.Password
                  className={styles.inputField}
                  prefix={<img src={passwordIcon} alt="" />}
                  placeholder={t(i18nKey.Placeholder.inputNewPass)}
                  iconRender={(visible) => (
                    <img src={visible ? showPassWord : hidePassWord} />
                  )}
                  onChange={() => {
                    handleChangePassword(
                      form.getFieldValue(USER_FIELDS.NEW_PASSWORD),
                      setShowValidate,
                      verifyPassWord,
                      setVerifyPassWord,
                      true,
                    ),
                      handleEnableButton(verifyPassWord, form);
                  }}
                />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item
                className={styles.formInput}
                name={USER_FIELDS.CONFIRM_PASSWORD}
                rules={[
                  {
                    required: true,
                    message: t(i18nKey.MessageRule.inputPassword),
                  },
                  {
                    validator: validateConfirmationPassword,
                  },
                ]}
              >
                <Input.Password
                  className={styles.inputField}
                  prefix={<img src={passwordIcon} alt="" />}
                  iconRender={(visible) => (
                    <img src={visible ? showPassWord : hidePassWord} />
                  )}
                  placeholder={t(i18nKey.Placeholder.inputConfirmPass)}
                  onChange={handleChangePass}
                />
              </Form.Item>
            </Row>
            {showValidate ? (
              <ValidatePassword verifyPassWord={verifyPassWord} />
            ) : (
              ''
            )}
            <Form.Item>
              <Button
                className={styles.btnSubmit}
                htmlType="submit"
                type="primary"
                disabled={isSubmitDisabled}
              >
                {t(i18nKey.Button.btnSend)}
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </div>
    </div>
  );
};

export default ResetPassPage;
