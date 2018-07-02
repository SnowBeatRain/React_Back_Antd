import React, { Component } from "react";
import "./App.css";
import { Layout, Menu, Icon, Breadcrumb } from "antd";
// import RouterMap from "../../Router/RouterMap";
import RouterMap from "./Router/RouterMap";

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
// import Button from "antd/lib/button";
// import { Button } from "antd";
class App extends Component {
  state = {
    collapsed: false,
    clientHeight: 0,
    openKeys: []
  };
  // submenu keys of first level
  rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    console.log(latestOpenKey);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
      console.log(this.state.openKeys);
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
  }
  // render() {
  //   return (
  //     <div>
  //       <RouterMap />
  //     </div>
  //   );
  // }
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
            <SubMenu
              key={"sub" + 1}
              title={
                <span>
                  <Icon type="mail" />
                  <span>Navigation One</span>
                </span>
              }
            >
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </SubMenu>
            <SubMenu
              key={"sub" + 2}
              title={
                <span>
                  <Icon type="mail" />
                  <span>Navigation One</span>
                </span>
              }
            >
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <Menu.Item key="7">Option 7</Menu.Item>
            </SubMenu>
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
            <RouterMap />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
