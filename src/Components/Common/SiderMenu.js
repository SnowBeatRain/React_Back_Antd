import React, { Component } from "react";
import { Layout, Menu, Icon, message } from "antd";
import { Link } from "react-router";
import "./SiderMenu.scss";
import axios from "../../axios/http";
import domain from "../domain";
import { hashHistory } from "react-router";
import { urlToList } from '../_utils/pathTools';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class HomeCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menusList: [],
      collapsed: false,
      clientHeight: 0,
      rootSubmenuKeys: [],
      // 默认选中的子菜单名称
      defaultSelectedKeys: "",
      // 默认选中的父菜单名称
      openKeys: []
    };
  }

  // submenu keys of first level

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    // 打开菜单
    this.props.openMenu(true);
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
    localStorage.setItem("openKeys", openKeys[1]);
  };

  getBreadcrumb = e => {
    this.props.BreadcrumbName(e.key);
    localStorage.setItem("defaultSelectedKeys", e.key);
  };
  componentWillMount() {
    console.log(this.props);
    if (this.props.closeAll) {
      this.setState({
        defaultSelectedKeys: "",
        openKeys: []
      });
    } else {
      var okeys = localStorage.getItem("openKeys");
      this.setState({
        clientHeight: document.body.clientHeight,
        // 获取本地存储的一级菜单选中状态
        openKeys: [okeys],
        // 获取本地存储点击选中的子菜单用于刷新时选中
        defaultSelectedKeys: localStorage.getItem("defaultSelectedKeys")
      });
    }
    if (domain.getCookie("token")) {
      axios
        .get("/api/Menu/GetMenus", { Token: domain.getCookie("token") })
        .then(res => {
          this.setState({
            menusList: res.Result
          });
          // 创建一个空数组，用于存放所有的列表集合，动态赋值给rootSubmenuKeys，以便于侧边栏只打开一个
          var arr = [];
          res.Result.map((item, index) => {
            var str = "sub" + index;
            arr.push(str);
          });
          this.setState({
            menusList: res.Result,
            rootSubmenuKeys: arr
          });
        })
        .catch(res => {
          console.log(res);
        });
    } else {
      message.error("请先登录", 2);
      setTimeout(() => {
        hashHistory.push("/login");
      }, 2000);
    }
  }
  render() {
    return (
      // 通过属性传值，父传子，控制侧边栏this.props.onToggle
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.onToggle}
        style={{ background: "#fff", minHeight: this.state.clientHeight }}
      >
        <div className="logo">React后台管理</div>

        <Menu
          mode="inline"
          defaultSelectedKeys={
            this.props.cleanOpen ? [] : [this.state.defaultSelectedKeys]
          }
          openKeys={this.props.cleanOpen ? [] : this.state.openKeys}
          onOpenChange={this.onOpenChange}
        >
          {this.state.menusList.map((item, index) => (
            <SubMenu
              key={"sub" + index}
              title={
                <span>
                  <Icon type="mail" />
                  <span>{item.name}</span>
                </span>
              }
            >
              {this.state.menusList[index].snippet.map((item1, index) => (
                // key={item1.urlf.split(".")[0]}
                <Menu.Item key={item1.title} onClick={this.getBreadcrumb}>
                  <Link to={item1.urlf.split(".")[0]}>{item1.title}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
      </Sider>
    );
  }
}

export default HomeCom;
