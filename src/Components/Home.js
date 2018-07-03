import React, { Component } from "react";
import "./Home.scss";
import { Layout, Icon, Breadcrumb } from "antd";
// 引入侧边栏
import SiderMenu from "./Common/SiderMenu";

const { Header, Content } = Layout;

class HomeCom extends Component {
  state = {
    menusList: [],
    collapsed: false,
    BreadcrumbName: ""
  };
  BreadcrumbName = e => {
    this.setState({
      BreadcrumbName: e
    });
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  componentDidMount() {}
  render() {
    return (
      <Layout>
        <SiderMenu
          BreadcrumbName={this.BreadcrumbName}
          onToggle={this.state.collapsed}
        />
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
              <a href="">{this.state.BreadcrumbName}</a>
            </Breadcrumb.Item>
            {/* <Breadcrumb.Item>An Application</Breadcrumb.Item> */}
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
            {this.props.children ? (
              ""
            ) : (
              <div className="homeContent">12313123</div>
            )}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default HomeCom;
