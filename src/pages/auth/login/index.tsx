import React from 'react';
import {Button, Checkbox, Form, Input, message} from 'antd';
import Container from 'typedi';
import {AuthService} from 'services/auth.service';
import {LoginDTO} from 'shared/dto/auth.dto';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
export default function Login() {
  const authService = Container.get(AuthService);
  const onFinish = (value: {username: string; password: string}) => {
    authService
      .signIn(new LoginDTO(value))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((rs: any) => {
        const {data} = rs;

        if (data?.statusCode === 401) {
          return message.error('login fail');
        }
        if (data?.access_token) {
          console.log({data});
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  const [form] = Form.useForm();
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      style={{maxWidth: 600}}
      initialValues={{remember: true}}
      onFinish={onFinish}
      form={form}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{required: true, message: 'Please input your username!'}]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{required: true, message: 'Please input your password!'}]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{offset: 8, span: 16}}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{offset: 8, span: 16}}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
