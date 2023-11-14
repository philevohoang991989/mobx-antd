/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './Header.module.scss';
import {Button} from 'antd';
import BreadcrumbCustom from 'components/BreadCrumb';

interface IPropHeaderPage {
  listBreadcrumb?: any;
  titlePage: string;
  listBtn?: any;
}
export default function HeaderPage({
  titlePage,
  listBtn,
  listBreadcrumb,
}: IPropHeaderPage) {
  return (
    <div
      className={styles.wrapperHeaderPage}
      style={{
        justifyContent:
          listBtn !== undefined && listBtn.length > 0
            ? 'space-between'
            : 'flex-start',
      }}
    >
      <div className={styles.headerTitle}>
        {listBreadcrumb?.length > 0 && (
          <BreadcrumbCustom listBreadcrumb={listBreadcrumb} />
        )}
        <span className={styles.titlePage}>{titlePage}</span>
      </div>

      <div className={styles.listBtn}>
        {listBtn !== undefined &&
          listBtn?.length > 0 &&
          listBtn.map((item: any) => {
            return (
              <Button
                key={item.title}
                onClick={item.action}
                style={{
                  backgroundColor: item.backgroundColor,
                  color: item.color,
                  border: `1px solid ${item.borderColor}`,
                }}
                form={item.form}
              >
                {item.title}
              </Button>
            );
          })}
      </div>
    </div>
  );
}
