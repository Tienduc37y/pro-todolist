import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Form, Input} from "antd"

export default function DetailTask(){
    const params = useParams()
    const nav = useNavigate()
    const [form] = Form.useForm()
    const [listTask,setListTask] = useState()
    const [editTask,isEdit] = useState(true)
    const token = localStorage.getItem('token')
    useEffect(()=>{
        axios({
            url:`https://backoffice.nodemy.vn/api/tasks/${params.id}?populate=*`,
            method:"GET"
        })
        .then((res)=>{
            var dataList = res.data.data
            setListTask(dataList)
        })
    },[])
    function onFinish(values){
        axios({
            url: `https://backoffice.nodemy.vn/api/tasks/${params.id}`,
            method:"PUT",
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + token
            },
            data : {
                data:values
            }
        })
        .then((res)=>{
            const dataEdit = res.data.data
            setListTask(dataEdit)
            setTimeout(()=>{
                isEdit(true)
            },1000)        
        })
    }
    return (
        <>
            {editTask ? 
            (
            <>
                <div style={{margin:0,textAlign:"left"}}>
                    <ul style={{listStyleType:"none",display:"flex",flexDirection:"column",gap:30}}>
                        <li> ID : {listTask?.id}</li>
                        <li> Tiêu đề : {listTask?.attributes?.title}</li>
                        <li> Trạng thái : {listTask?.attributes?.complete ? "Hoàn thành" : "Chưa hoàn thành"}</li>
                        <li> Ngày tạo : {listTask?.attributes?.createdAt}</li>
                        <li> Ngày update : {listTask?.attributes?.updatedAt}</li>
                        <li> Ngày đăng : {listTask?.attributes?.publishedAt}</li>
                    </ul>
                    <br />
                </div>
                <Button type="primary" onClick={()=>{
                    isEdit(false)
                }}>Sửa</Button>
                <Button style={{marginLeft:20}} onClick={()=>{
                    nav(`/todolist`)
                }}>Back</Button>
            </>
            ):
            (
            <>
                {
                    form.setFieldsValue({
                        title: listTask?.attributes?.title,
                    })
                }
                <h1>{listTask?.id}</h1>
                <Form onFinish={onFinish} form={form} style={{display:"flex",flexDirection:"column",gap:30}}>
                    <Form.Item name="title" label="Title">
                        <Input></Input>
                    </Form.Item>
                    <Button htmlType="submit" type="primary">Cập nhật</Button>
                    <Button onClick={()=>{
                        form.setFieldsValue({
                            title:""
                        })
                    }}>Reset</Button>
                </Form>
            </>
            )}
        </>
    )
}