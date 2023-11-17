import {Button, Form, Input, Row, Typography, message} from 'antd';
import React, {useState} from 'react';

//Icons
import emailIcon from 'assets/icons/ic_mail.svg';
import {PageRoute} from 'constants/route';
import {i18nKey} from 'locales/i18n';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {AuthService} from 'services/auth.service';
import {ForgotPassBody, ForgotPassDTO} from 'shared/dto/auth.dto';
import Container from 'typedi';
import styles from './forgot-pass.module.scss';
import regex from 'constants/regex';

const {Title} = Typography;
const ForgotPassPage = (): React.ReactElement => {
  const [form] = Form.useForm();
  const authService = Container.get(AuthService);
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  const onFinish = (values: ForgotPassBody) => {
    authService.getForgotPass(new ForgotPassDTO(values)).then((result) => {
      const {data} = result;

      if (data?.statusCode === 404) {
        message.error(t(i18nKey.ErrorMessage.msgSentRequestFail));
      } else {
        if (data === '') {
          setIsSubmitDisabled(true);
          message.success(t(i18nKey.SuccessMessage.msgSentRequestSuccess));
        }
      }
    });
  };

  return (
    <div className={styles.fullScreen}>
      <div className={`${styles.centerBox} ${styles.formForgot}`}>
        <div>
          <div className={styles.titleContainer}>
            <Title level={3}>{t(i18nKey.title.titleForgotPassword)}</Title>
          </div>
          <Row className={styles.form} justify="center">
            <Form
              className={styles.formAuth}
              initialValues={{remember: true}}
              onFinish={onFinish}
              form={form}
              autoComplete="off"
              onFieldsChange={() => {
                const fieldsValue: {[key in string]: string} =
                  form.getFieldValue('email');
                setIsSubmitDisabled(
                  Object.values(fieldsValue).some((value) => !value),
                );
              }}
            >
              <Row>
                <Form.Item
                  className={styles.formInput}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: t(i18nKey.MessageRule.inputEmail),
                    },
                    {
                      pattern: regex.email,
                      message: t(i18nKey.MessageRule.txtFormatEmail),
                    },
                  ]}
                >
                  <Input
                    className={styles.inputField}
                    prefix={<img src={emailIcon} alt="" />}
                    placeholder={t(i18nKey.Placeholder.forgotpass)}
                  />
                </Form.Item>
              </Row>

              <Form.Item>
                <Button
                  className={styles.btnSubmit}
                  htmlType="submit"
                  type="primary"
                  disabled={isSubmitDisabled}
                >
                  {t(i18nKey.Button.btnConfirm)}
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  className={`${styles.btnSubmit} ${styles.btnBackSignIn}`}
                  type="primary"
                  onClick={() => navigate(PageRoute.LOGIN)}
                >
                  {t(i18nKey.Button.btnBacksignIn)}
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
