import React, { Component } from "react";
import { Layout, Menu, Icon, Breadcrumb } from "antd";
import { Link } from "react-router";
import axios from "axios";
import domain from "../domain";
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class HomeCom extends Component {
  state = {
    menusList: [],
    collapsed: false,
    clientHeight: 0,
    openKeys: ['sub0']
  };
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
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
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
      "B18C52B53F6A071C709F6E7BB330216019F22307D62D12FBFA68D8DACB339D985800E354DF10D6D53ACAE4B3AE0D7E557DF700AF7C3AC06C6A7F1DB003CBD09F";
    axios
      .get(domain.baseurl + "/api/Menu/GetMenus", { params: { Token: Token } })
      .then(res => {
        this.setState({
          menusList: res.data.Result
        });
        console.log(this.state.menusList);
      })
      .catch(res => {
        console.log(res);
      });
  }
  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
        style={{ background: "#fff", minHeight: this.state.clientHeight }}
      >
        <div className="logo">123213</div>

        <Menu
          mode="inline"
          defaultSelectedKeys={['停车场列表']}
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
        >
          {this.state.menusList.map((item, index) => (
            <SubMenu
              key={"sub" +index}
              title={
                <span>
                  <Icon type="mail" />
                  <span>{item.name}</span>
                </span>
              }
            >
              {this.state.menusList[index].snippet.map((item1, index) => (
                                  // key={item1.urlf.split(".")[0]}
                <Menu.Item
                  key={item1.title}
                  onClick={this.getBreadcrumb}
                >
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
