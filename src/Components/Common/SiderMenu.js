import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router";
import "./SiderMenu.scss";
import axios from "../../axios/http";
// import domain from "../domain";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class HomeCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menusList: [],
      collapsed: false,
      clientHeight: 0,
      openKeys: ["sub0"]
    };
  }

  // submenu keys of first level
  rootSubmenuKeys = [
    "sub0",
    "sub1",
    "sub2",
    "sub3",
    "sub4",
    "sub5",
    "sub6",
    "sub7",
    "sub8",
    "sub9"
  ];

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  getBreadcrumb = e => {
    console.log(e.key);
    this.props.BreadcrumbName(e.key);
  };
  componentWillMount() {
    // domain.setCookie("a",123)
    this.setState({
      clientHeight: document.body.clientHeight
    });
    var Token =
      "F2BE3A66BAE5B7D5CA18665EE690DDD44CFE10DF5FF5A2C1E8FE509A0C99A75B49AB911F12F71CACA198C48F99F7882F2DF74791295C87D0990B134D7F612CBE";
    axios
      .get("/api/Menu/GetMenus", { Token: Token })
      .then(res => {
        this.setState({
          menusList: res.Result
        });
        console.log(this.state.menusList);
      })
      .catch(res => {
        console.log(res);
      });
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
          defaultSelectedKeys={["停车场列表"]}
          openKeys={this.state.openKeys}
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
