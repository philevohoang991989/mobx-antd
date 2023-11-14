/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, ModalProps } from 'antd';
import React, { ReactNode } from 'react';
import styles from './Modal.module.scss';

type PropsType = ModalProps & {
  handleCloseModal?: any;
  handleOpenModal?: void;
  content?: React.ReactNode | string;
  title?: string | ReactNode;
  withModal: number;
};

const CustomModal: React.FC<PropsType> = ({
  handleCloseModal,
  content,
  title,
  withModal,
  ...restProps
}) => {
  return (
    <Modal
      centered
      title={title}
      className={styles.wapperModal}
      onCancel={handleCloseModal}
      footer={false}
      width={withModal}
      {...restProps}>
      {content}
    </Modal>
  );
};
export default CustomModal;
