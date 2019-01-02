import React, { Component } from "react";
import { Table, Modal, Button, Divider ,Breadcrumb} from "antd";


const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  });
}
class BackParkList extends Component {
  state = {
    loading: false,
    visible: false
  };
  showModal = () => {
    console.log(123123)
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        width: 150
      },
      {
        title: "Age",
        dataIndex: "age",
        width: 150
      },
      {
        title: "Address",
        dataIndex: "address"
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: () => <a onClick={this.showModal}>Delete</a>
      }
    ];
    return (
      <div>
        <Breadcrumb style={{ padding: "0px 0px 24px 16px" }}>
            <Breadcrumb.Item>
              <span onClick={this.clickHome}>Home</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">{this.state.BreadcrumbName}</a>
            </Breadcrumb.Item>
            {/* <Breadcrumb.Item>An Application</Breadcrumb.Item> */}
          </Breadcrumb>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          rowClassName={() => "editable-row"}
        />
        <Modal
          visible={this.state.visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.state.loading}
              onClick={this.handleOk}
            >
              Submit
            </Button>
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default BackParkList;
