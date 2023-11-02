import { Form, Button, Input,notification, Space } from "antd"
import axios from "axios"
import React from "react"
import { Link, useNavigate } from "react-router-dom";

export default function Signin(){
    const navigate = useNavigate()
    const [api, contextHolder] = notification.useNotification();
    const NotifySuccess = (placement,type) => {
        api[type]({
        message: `Đăng ký thành công`,
        description:
            'Chúc bạn 1 ngày mới tốt lành',
        placement,
        });
    };
    const NotifyError = (placement,type) => {
        api[type]({
        message: `Đăng ký không thành công`,
        description:
            'Vui lòng thử lại',
        placement,
        });
    };
    function onFinish(values){
        axios({
            url: 'https://backoffice.nodemy.vn/api/auth/local/register',
            method: 'POST',
            data:{...values,"role": 3},
            headers: { 
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>{
            console.log(res.data)
            NotifySuccess('top','success')
            setTimeout(()=>{
                navigate("/login")
            },2000)
        })
        .catch((err)=>{
            console.log(values)
            NotifyError('top','error')
        })
    }
    return (
        <div style={{
            width:400,
            height:400,
            padding:20
        }}>
            <h1>Đăng Ký</h1>
            <Form 
                name="Signin"
                onFinish={onFinish}
                >
                <Form.Item name= "username" label= "Username">
                    <Input style={{marginLeft:-10,width:300}} required></Input>
                </Form.Item>
                <br />
                <Form.Item name="email" label="Email">
                    <Input style={{marginLeft:20,width:300}} required></Input>
                </Form.Item>
                <br />
                <Form.Item name= "password" label= "Password">
                    <Input.Password style={{marginLeft:-5,width:300}} required></Input.Password>
                </Form.Item>
                <br />
                <Space>
                    {contextHolder}
                    <Button type="primary" htmlType="submit" style={{border:"none" , outline:"none"}}>Đăng Ký</Button>
                    <Link style={{marginLeft:40,color:"black"}} to="/login">Đăng Nhập</Link>
                </Space>
            </Form>
        </div>
    )
}