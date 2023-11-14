import React from 'react';
import {Breadcrumb} from 'antd';

interface IPropBreadcrumb {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listBreadcrumb: Array<any>;
}
export default function BreadcrumbCustom({listBreadcrumb}: IPropBreadcrumb) {
  return (
    <>
      <Breadcrumb items={listBreadcrumb} />
    </>
  );
}
