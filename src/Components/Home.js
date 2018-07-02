import React, { Component } from "react";
import "./Home.css";
import { Layout, Menu, Icon, Breadcrumb } from "antd";
import { Link } from "react-router";
import axios from "axios";
import domain from "./domain";
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

class HomeCom extends Component {
  state = {
    menusList: [],
    collapsed: false,
    clientHeight: 0,
    openKeys: []
  };
  // submenu keys of first level
  rootSubmenuKeys = ["0 ", "1 ", "2 ","3 ","4 ","5 ","6 ","7 ","8 ","9 "];

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
  componentWillMount() {
    this.setState({
      clientHeight: document.body.clientHeight
    });
    // axios.defaults.baseURL = "http://spsapp.spsing.com";

    var Token =
      "A98E6AE5AE191FB218DED0DF7AC178AF2B36CACA9A86876DB50B7190CE3E9F95375A47ACBDD377B9ED228D0ECC9C6ED29B7F0AF5B27176A37E83910CFA075304";
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
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{ background: "#fff", minHeight: this.state.clientHeight }}
        >
          <div className="logo">123213</div>

          <Menu
            mode="inline"
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
          >
            {this.state.menusList.map((item, index) => (
              <SubMenu
                key={index + " "}
                title={
                  <span>
                    <Icon type="mail" />
                    <span>{item.name}</span>
                  </span>
                }
              >
                {this.state.menusList[index].snippet.map((item1, index) => (
                  <Menu.Item key={item1.urlf.split(".")[0]}>
                    <Link to={item1.urlf.split(".")[0]}>{item1.title}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ))}
            {/* <SubMenu
              key={"sub" + 2}
              title={
                <span>
                  <Icon type="mail" />
                  <span>Navigation One</span>
                </span>
              }
            >
              <Menu.Item key="orderList">
                <Link to="/orderList">userList</Link>
              </Menu.Item>
            </SubMenu> */}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: "0 16px" }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
          <Breadcrumb style={{ padding: "24px 16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Application Center</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Application List</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            {/* <RouterMap /> */}
            {this.props.children}
            {/* {React.Children.map(this.props.children, function(value, key) {
              return (
                <li>
                  {value}----{key}
                </li>
              );
            })} */}
            {this.props.children ? "" : <div>12313123</div>}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default HomeCom;
