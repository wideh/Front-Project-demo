import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Row, Col } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';

// @connect(({ loading, myProfileModel }) => ({
//   loading: loading.effects['myProfileModel/edit'],
//   myProfileModel,
// }))
export default class Index extends PureComponent {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      phoneEdit: false,
      passwordEdit: false,
      isViewPassword: false,
      Password: '',
    };
  }

  componentWillMount() {
    this.setState({ visible: true });
  }

  handelPassword = () => {
    this.formRef.current
    .validateFields(['password'])
    .then(values => {
      this.setState({
        passwordEdit: false,
        isViewPassword: false,
        Password: values.password
      })
    })
    .catch(() => { });
  }

  handlePasswordCancel = () => {
    const {
      Password
    } = this.state;
    if(Password) {
      this.formRef.current.setFieldsValue({
        password: Password,
      })
    } else {
      this.formRef.current.resetFields(["password"])
    }
    
    this.setState({
      passwordEdit: false,
      isViewPassword: false,
    })
  }


  viewPasswordChange = (e) => {
    e.stopPropagation();
    const { isViewPassword } = this.state;
    this.setState({
      isViewPassword: !isViewPassword,
    })
  }

  render() {
    const { visible, phoneEdit, passwordEdit, isViewPassword, Password } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    return (
      <div style={{backgroundColor: "#fff", height: '90vh'}}>
        {visible && (
          <div>
            <Form
              {...formItemLayout}
              ref={this.formRef}
              onFinish={null}
              initialValues={{
                Password
              }}
            >
              <Row>密码信息</Row>
              <Row>
                <Col span={12} style={{position: 'relative'}}>
                  <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: '请输入密码',
                      },
                    ]}
                  >
                    {isViewPassword ? 
                    <Input 
                      placeholder="请输入密码"
                      disabled={!passwordEdit}
                      style={{paddingRight: '25px'}}
                      key='passwordVis'
                    />:
                    <Input.Password
                      placeholder="请输入密码"
                      visibilityToggle={false}
                      disabled={!passwordEdit}
                      style={{paddingRight: '25px'}}
                      key='passwordDisv'
                    />}
                  </Form.Item>
                  <span 
                    style={{position: 'absolute', right: '6px', top: '5px', cursor: 'pointer'}}
                    onClick={this.viewPasswordChange.bind(this)}
                  >
                    {isViewPassword?<EyeOutlined />:<EyeInvisibleOutlined />}
                  </span>
                </Col>
                {
                  passwordEdit ?
                    <Col span={12} >
                      <Button onClick={debounce(this.handelPassword.bind(this), 200)} type="text" style={{ color: '#52c41a', margin: 0 }}>
                        保存
                      </Button>
                      <Button onClick={() => {this.handlePasswordCancel()}} type="text" style={{ color: '#bfbfbf' }}>
                        取消
                      </Button>
                    </Col>
                    :
                    <Col span={12} >
                      <Button onClick={() => { this.setState({ passwordEdit: true }) }} type="text" style={{ color: '#52c41a' }}>
                        修改
                      </Button>
                    </Col>
                }
              </Row>
            </Form>
          </div>
        )}
      </div>
    );
  }
}
