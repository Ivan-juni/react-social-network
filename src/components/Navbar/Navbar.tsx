import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import avatar from "../../images/ava-icon.jpeg";
import { AppDispatch } from "../../Redux/redux-store.ts";
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsTC } from "../../Redux/sidebar-reducer.ts";
import { RootState } from '../../types/types';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import SubMenu from "antd/lib/menu/SubMenu";

const { Sider } = Layout;

const Navbar: React.FC = () => {
  const friends = useSelector((state: RootState) => state.sidebar.friends);
  const dispatch: any = useDispatch();

  useEffect(()=> {
    dispatch(getFriendsTC());
  }, [])
  
  let friendsDataTest = friends.map((f) => {
    return (
      <NavLink to={"/profile/" + f.id} className={styles.link} key={f.id}>
        <div className={styles.friend} key={f.id}>
          <img src={f.photos.small ? f.photos.small : avatar} alt="avatar" className={styles.avatar} />
          <span>{f.name}</span>
        </div>
      </NavLink>
    );
  });

  return (
    <Sider width={250} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0, paddingTop: '20px' }}
          >
            <SubMenu title="My Profile">
              <Menu.Item key={"1"} icon={<UserOutlined />}>
                <NavLink to="/profile">
                  Profile
                </NavLink>
              </Menu.Item>
              <Menu.Item key={"2"} icon={<LaptopOutlined />}>
                <NavLink to="/dialogs">
                  Messages
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key={"3"}>
                <NavLink to="/users">
                  Users
                </NavLink>
            </Menu.Item>
            <Menu.Item key={"4"}>
                <NavLink to="/news">
                  News
                </NavLink>
            </Menu.Item>
            <Menu.Item key={"5"}>
                <NavLink to="/music">
                  Music
                </NavLink>
            </Menu.Item>
            <Menu.Item key={"6"}>
                <NavLink to="/settings">
                  Settings
                </NavLink>
            </Menu.Item>
            <div className={styles.wrapper__friends}>
              <div className={styles.friends__caption}>Followed users</div>
              <div className={styles.friends}>{friendsDataTest}</div>
            </div>
          </Menu>
    </Sider>
    // <div className={styles.wrapper}>
    //   <nav>
    //     <ul className={styles.menu}>
    //       <li className={styles.navbar__link}>
    //         <NavLink
    //           to="/profile"
    //           className={(NavData) =>
    //             NavData.isActive ? styles.active : styles.link
    //           }
    //         >
    //           Profile
    //         </NavLink>
    //       </li>
    //       <li className={styles.navbar__link}>
    //         <NavLink
    //           to="/dialogs"
    //           className={(NavData) =>
    //             NavData.isActive ? styles.active : styles.link
    //           }
    //         >
    //           Mesages
    //         </NavLink>
    //       </li>
    //       <li className={styles.navbar__link}>
    //         <NavLink
    //           to="/users"
    //           className={(NavData) =>
    //             NavData.isActive ? styles.active : styles.link
    //           }
    //         >
    //           Users
    //         </NavLink>
    //       </li>
    //       <li className={styles.navbar__link}>
    //         <NavLink
    //           to="/news"
    //           className={(NavData) =>
    //             NavData.isActive ? styles.active : styles.link
    //           }
    //         >
    //           News
    //         </NavLink>
    //       </li>
    //       <li className={styles.navbar__link}>
    //         <NavLink
    //           to="/music"
    //           className={(NavData) =>
    //             NavData.isActive ? styles.active : styles.link
    //           }
    //         >
    //           Music
    //         </NavLink>
    //       </li>
    //       <li className={styles.navbar__link}>
    //         <NavLink
    //           to="/settings"
    //           className={(NavData) =>
    //             NavData.isActive ? styles.active : styles.link
    //           }
    //         >
    //           Settings
    //         </NavLink>
    //       </li>
    //     </ul>
    //     <div className={styles.wrapper__friends}>
    //       <div className={styles.friends__caption}>Followed users</div>
    //       <div className={styles.friends}>{friendsDataTest}</div>
    //     </div>
    //   </nav>
    // </div>
  );
};

export default Navbar;
