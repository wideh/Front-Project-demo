import React, { Component } from "react";
import { Modal, Button } from "antd";
// import Layout from '@common/components/antdClsProvider';
import ReactDom from "react-dom";
let div;

class NormalModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
    };
  }

  show() {
    this.setState({
      visible: true,
    });
  }

  hide() {
    if (div) {
      const box = document.getElementById("self-nomal-modal-wrapper");
      box.remove();
    }
    this.setState({ visible: false });
  }

  handleOk() {
    const { onOk } = this.props;
    
    if(typeof onOk == 'function') {
      let flag = onOk();
      if(Object.prototype.toString.call(flag) === '[object Promise]') {
        flag.then(res => {
          if(res) {
            this.hide();
          }
        })
      } else {
        if(flag) {
          this.hide();
        }
      }
    }
  }

  handleCancel() {
    const { onCancel } = this.props;
    this.hide();
    if(typeof onCancel == 'function') {
      onCancel();
    }
  }

  render() {
    const {
      loading,
      visible,
    } = this.state;

    const {
      title,
      content,
      okText,
      cancelText,
    } = this.props;

    return (
      // <Layout>
        <Modal
          width={480}
          title={title}
          visible={visible}
          // getContainer={() => document.getElementById("self-nomal-modal-wrapper")}
          onCancel={() => this.hide()}
          maskClosable={false}
          footer={[
            <Button onClick={this.handleCancel.bind(this)} key="cancel">{cancelText || '取消'}</Button>,
            <Button onClick={this.handleOk.bind(this)} key="ok" type="primary">{okText || '确定'}</Button>
          ]}
        >
          {content}
        </Modal>
      // </Layout>
    );
  }
}

function createContactBox(props) {
  div = document.createElement("div");
  document.body.appendChild(div);
  div.id = "self-nomal-modal-wrapper";
  console.log('div', div);
  let renderedBox = ReactDom.render(React.createElement(NormalModal, props), div);
  return renderedBox;
}

export const normalModal = function(props) {
  createContactBox(props).show();
};
