import {Button, Checkbox, Form, Input, Row, message} from 'antd';
import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Container} from 'typedi';

import {LoginDTO} from 'shared/dto/auth.dto';
//Icons
import passwordIcon from 'assets/icons/ic_password.svg';
import emailIcon from 'assets/icons/ic_mail.svg';
import showPassWord from 'assets/icons/show-password.svg';
import hidePassWord from 'assets/icons/hide-password.svg';

//Styles
import {PageRoute} from 'constants/route';
import {i18nKey} from 'locales/i18n';
import {useTranslation} from 'react-i18next';
import {AuthService} from 'services/auth.service';
import styles from './login.module.scss';

const Login: React.FC = () => {
  const authService = Container.get(AuthService);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {t} = useTranslation();

  useEffect(() => {
    if (authService.isSignedIn()) {
      navigate(PageRoute.HOME);
    }
  });

  const signIn = async (value: {username: string; password: string}) => {
    authService
      .signIn(new LoginDTO(value))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((rs: any) => {
        const {data} = rs;

        if (data?.statusCode === 401) {
          return message.error(t(i18nKey.ErrorMessage.loginFail));
        }
        if (data?.access_token) {
          location.reload();
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <div className={styles.fullScreen}>
      <div className={styles.centerBox}>
        <div className={styles.titleContainer}>{t(i18nKey.Title.login)}</div>
        <Form
          className={styles.formAuth}
          initialValues={{remember: true}}
          onFinish={signIn}
          form={form}
          autoComplete="off"
        >
          <Row>
            <Form.Item
              className={styles.formInput}
              name="username"
              rules={[
                {
                  required: true,
                  message: t(i18nKey.MessageRule.inputEmail),
                },
              ]}
            >
              <Input
                className={styles.inputField}
                autoFocus={true}
                prefix={<img src={emailIcon} alt="" />}
                placeholder={t(i18nKey.Placeholder.email)}
              />
            </Form.Item>
          </Row>
          <Row>
            <Form.Item
              className={styles.formInput}
              name="password"
              rules={[
                {
                  required: true,
                  message: t(i18nKey.MessageRule.inputPassword),
                },
              ]}
            >
              <Input.Password
                className={styles.inputField}
                prefix={<img src={passwordIcon} alt="" />}
                placeholder={t(i18nKey.Placeholder.password)}
                iconRender={(visible) => (
                  <img src={visible ? showPassWord : hidePassWord} />
                )}
              />
            </Form.Item>
          </Row>
          <div className={styles.actionForm}>
            <Form.Item
              name="remember"
              valuePropName="checked"
              style={{marginBottom: 0}}
            >
              <Checkbox className={styles.checkBox}>
                {t(i18nKey.Login.rememberMe)}
              </Checkbox>
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              className={styles.btnSubmit}
              htmlType="submit"
              type="primary"
            >
              {t(i18nKey.Button.btnSignIn)}
            </Button>
          </Form.Item>
          <Row justify="center">
            <Link
              className={styles.forgotPassword}
              to={{
                pathname: '/forgot-password',
              }}
            >
              {t(i18nKey.Login.forgotPassword)}
            </Link>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Login;
