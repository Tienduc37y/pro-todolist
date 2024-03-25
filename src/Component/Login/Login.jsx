import { Form, Button, Input,notification, Space } from "antd"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate()
    const [api, contextHolder] = notification.useNotification();
    const NotifySuccess = (placement,type) => {
        api[type]({
        message: `Đăng nhập thành công`,
        description:
            'Chúc bạn 1 ngày mới tốt lành',
        placement,
        });
    };
    const NotifyError = (placement,type) => {
        api[type]({
        message: `Đăng nhập không thành công`,
        description:
            'Vui lòng thử lại',
        placement,
        });
    };
    function onFinish(values){
        axios({
            url: 'https://backoffice.nodemy.vn/api/auth/local',
            method: 'POST',
            data:values,
            headers: { 
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>{
            localStorage.setItem('token',res.data.jwt)
            localStorage.setItem('user',res.data.user.username)
            NotifySuccess('top','success')
            setTimeout(()=>{
                navigate('../')
            },2000)
                
        })
        .catch((err)=>{
            NotifyError('top','error')
        })
    }
    return (
        <div>
            <h1>Đăng Nhập</h1>
            <Form 
                name="Login"
                onFinish={onFinish}
                >
                <Form.Item name= "identifier" label= "Username">
                    <Input></Input>
                </Form.Item>
                <br />
                <Form.Item name= "password" label= "Password">
                    <Input.Password style={{marginLeft:5}}></Input.Password>
                </Form.Item>
                <br />
                <Space>
                    {contextHolder}
                    <Button type="primary" htmlType="submit" style={{border:"none" , outline:"none"}}>Đăng nhập</Button>
                    <Link style={{marginLeft:50,color:"black"}} to="/signin">Đăng ký</Link>
                </Space>
            </Form>
        </div>
    )
}