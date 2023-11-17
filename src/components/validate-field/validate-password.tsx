import React from 'react';
import {useTranslation} from 'react-i18next';
import {i18nKey} from 'locales/i18n';
import {Space, Row} from 'antd';
import {VERYFY_PASSWORD, IVerifyPassword} from 'constants/validate-form';
import {CheckCircleFilled} from '@ant-design/icons';
import styles from './style.module.scss';

interface IProp {
  verifyPassWord: IVerifyPassword;
}

export function ValidatePassword({verifyPassWord}: IProp) {
  const {t} = useTranslation();
  const checkList = [
    {
      type: VERYFY_PASSWORD.IS_UPPER_CASE,
      title: t(i18nKey.txtRequireUppercase),
    },
    {
      type: VERYFY_PASSWORD.IS_LOWER_CASE,
      title: t(i18nKey.txtRequireLowercase),
    },

    {
      type: VERYFY_PASSWORD.IS_CONTAIN_NUMBER,
      title: t(i18nKey.txtRequireNumber),
    },
    {
      type: VERYFY_PASSWORD.IS_ENOUGH_LENGTH,
      title: t(i18nKey.txtRequirePasswordLength),
    },
  ];
  return (
    <Space direction="vertical">
      <Row className={styles.headingValidate}>
        {t(i18nKey.txtHeadingValidate)}
      </Row>
      <div className={styles.checkFilterWrapper}>
        {checkList?.map((item, index) => {
          return (
            <div key={index}>
              <CheckCircleFilled
                className={
                  verifyPassWord[item.type]
                    ? styles.checkVerify
                    : styles.UnverifyPassword
                }
              />
              <span
                className={
                  verifyPassWord[item.type]
                    ? styles.verifyPassWord
                    : styles.UnverifyPassword
                }
              >
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </Space>
  );
}
