import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  // NotificationOutlined,
  SettingOutlined,
  SnippetsOutlined
  // UserOutlined
  // MessageOutlined
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router";
import logo from "../../logo.svg";
import * as actionSagaUser from "../../modules/users/actions";
import { MODULE_NAME as MODULE_USER } from "../../modules/users/models";

export default function SideBar({ openSidebar, admin }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector(state => state[MODULE_USER].isLogin);
  const url = useLocation();

  const handleSelect = value => {
    history.push(value.key);
  };

  const handleLogout = () => {
    dispatch(actionSagaUser.logout());
    history.go("/");
  };

  return (
    <nav className={`navbar ${openSidebar ? "active" : ""}`}>
      <Menu
        onSelect={handleSelect}
        selectedKeys={[url.pathname]}
        theme="dark"
        className="navbar-nav"
      >
        <Menu.Item disabled style={{ cursor: "pointer" }} className="nav-item logo">
          <img style={{ width: 50, height: 50, margin: "auto" }} src={logo} alt="" />
        </Menu.Item>
        <Menu.Item key="/" className="nav-item">
          <HomeOutlined />
          <span className="nav-text">Trang chủ</span>
        </Menu.Item>
        {admin ? (
          <Menu.Item key="/write_blog" className="nav-item">
            <SnippetsOutlined />
            <span className="nav-text">Viết Blogs</span>
          </Menu.Item>
        ) : null}
        {isLogin === false ? (
          <Menu.Item style={{ float: "right" }} key="/login" className="nav-item">
            <SettingOutlined />
            <span className="nav-text">Đăng nhập</span>
          </Menu.Item>
        ) : (
          <Menu.Item key="" style={{ float: "right" }} onClick={handleLogout} className="nav-item">
            <SettingOutlined />
            <span className="nav-text">Đăng xuất</span>
          </Menu.Item>
        )}
        {/* <Menu.Item key="/news" className="nav-item">
          <NotificationOutlined />
          <span className="nav-text">News</span>
        </Menu.Item> */}
        {/* <Menu.Item style={{ float: "right" }} className="nav-item">
          <UserOutlined />
          <span className="nav-text">Tài khoản</span>
        </Menu.Item> */}
        {/* <Menu.Item className="nav-item">
          <MessageOutlined />
          <span className="nav-text">Ngôn ngữ</span>
        </Menu.Item> */}
        {/* <Menu.Item key="/setting" className="nav-item">
          <SettingOutlined />
          <span className="nav-text">Cài đặt</span>
        </Menu.Item> */}
      </Menu>
    </nav>
  );
}

SideBar.propTypes = {
  openSidebar: PropTypes.bool.isRequired,
  admin: PropTypes.bool.isRequired
};

SideBar.defaultPropTypes = {
  openSidebar: false
};
