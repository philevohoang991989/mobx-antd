/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/quotes */
import {
  // DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Button, Layout, Menu, MenuProps} from 'antd';
import icBilling from 'assets/icons/ic_billing.svg';
import icHardDrive from 'assets/icons/ic_hard-drive.svg';
import icLogout from 'assets/icons/ic_logout.svg';
import icUser from 'assets/icons/ic_menu_user.svg';
import {i18nKey} from 'locales/i18n';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import styles from './MainLayout.module.scss';
// import { Link } from 'react-router-dom';
// import { PageRoute } from 'constants/route';
import ICCPU from 'assets/icons/ic_cpu.svg';
import IcHelp from 'assets/icons/ic_help.svg';
import IcLanguage from 'assets/icons/ic_language.svg';
import Logo from 'assets/icons/ic_logo.svg';
import {PageRoute} from 'constants/route';
import {storageKeys} from 'constants/storage-keys';
import {ROLE} from 'constants/user';
const {Content, Sider} = Layout;
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  return {
    key,
    icon,
    children,
    label,
    type,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
}

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  // const authService = Container.get(AuthService);

  const [collapsed, setCollapsed] = useState(false);
  const {t} = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [idRole, setIdRole] = useState<unknown>();
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const roleIdLocal: any = localStorage.getItem(storageKeys.ROLE_ID) as any;
      setIdRole(JSON.parse(roleIdLocal));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuProps['items'] =
    idRole && idRole === ROLE.PARTNER
      ? [
          getItem(
            <div className={styles.titleGroup}>{t(i18nKey.Menu.menu)}</div>,
            'grp2',
            null,
            undefined,
            'group',
          ),
          getItem('Billing', 'sub5', <img src={icBilling} />, [
            getItem(<Link to="#">{t(i18nKey.Menu.usage)}</Link>, 'usage'),
            getItem(<Link to="#">{t(i18nKey.Menu.invoice)}</Link>, 'invoice'),
          ]),
          getItem(
            <Link to="#">{t(i18nKey.Menu.tenants)}</Link>,
            'tenants',
            <img src={icUser} alt="icUser" />,
          ),
          getItem('Config', 'Config', <img src={icHardDrive} />, [
            getItem(<Link to="#">{t(i18nKey.Menu.billing)}</Link>, 'billing'),
          ]),
        ]
      : [
          getItem(
            <div className={styles.titleGroup}>{t(i18nKey.Menu.menu)}</div>,
            'grp2',
            null,
            undefined,
            'group',
          ),
          getItem('OCR', 'sub4', <img src={ICCPU} />, [
            getItem(
              <Link to="#">{t(i18nKey.Menu.requestOCR)}</Link>,
              'requestOCR',
            ),
            getItem(<Link to="#">{t(i18nKey.Menu.listOCR)}</Link>, 'listOCR'),
            getItem(
              <Link to="#">{t(i18nKey.Menu.manageTemplate)}</Link>,
              'manageTemplate',
            ),
          ]),
          getItem('Billing', 'sub5', <img src={icBilling} />, [
            getItem(<Link to="#">{t(i18nKey.Menu.usage)}</Link>, 'usage'),
            getItem(<Link to="#">{t(i18nKey.Menu.invoice)}</Link>, 'invoice'),
          ]),
          getItem(
            <div className={styles.titleGroup}>{t(i18nKey.Menu.setting)}</div>,
            'grp3',
            null,
            undefined,
            'group',
          ),
          getItem('Language', 'sub6', <img src={IcLanguage} />, [
            getItem('VN', '9'),
            getItem('JP', '10'),
          ]),
          getItem('Help', 'sub7', <img src={IcHelp} />),
        ];

  const onCollapse = () => {
    setCollapsed((curIsCollapsed) => !curIsCollapsed);
  };
  const local: any = localStorage.getItem(storageKeys.USER_INFO);
  let userInfo: any = {};
  try {
    userInfo = JSON.parse(local);
    if (!userInfo.name) {
      localStorage.removeItem(storageKeys.USER_INFO);
      localStorage.removeItem(storageKeys.USER_ACCESS_TOKEN);
      navigate(PageRoute.LOGIN);
    }
  } catch (error) {
    localStorage.removeItem(storageKeys.USER_INFO);
    localStorage.removeItem(storageKeys.USER_ACCESS_TOKEN);
    navigate(PageRoute.LOGIN);
  }
  const logOut = () => {
    console.log('error');
    // try {
    //   authService.logOut(new LogoutDTO());
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Layout>
      <Sider
        className={styles.wrapperSider}
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <div className={styles.wrapperLogo}>
          <img
            className={styles.logo}
            style={{display: collapsed ? 'none' : 'block'}}
            src={Logo}
            alt="Logo"
          />
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{marginBottom: 0}}
          >
            {collapsed ? (
              <MenuUnfoldOutlined style={{color: '#000', fontSize: '2rem'}} />
            ) : (
              <MenuFoldOutlined style={{color: '#000', fontSize: '2rem'}} />
            )}
          </Button>
        </div>
        <div className={styles.infoAccount} onClick={() => navigate('')}>
          <div className={styles.titleAccouny}>Account</div>
          <div className={styles.nameAccount}>{userInfo?.name}</div>
        </div>
        <Menu
          className={styles.mainMenu}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
          style={{backgroundColor: '#175CD3'}}
        />
        <div className={styles.wrapperButton}>
          <Button type="link" onClick={logOut} style={{marginBottom: 16}}>
            <img src={icLogout} alt="Logout" />{' '}
            <div style={{display: collapsed ? 'none' : 'block'}}>Logout</div>
          </Button>
        </div>
      </Sider>
      <Content className={styles.wrapperContent}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;
