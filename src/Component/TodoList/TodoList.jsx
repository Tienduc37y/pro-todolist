import axios from "axios"
import { useEffect, useState } from "react"
import { SearchOutlined } from '@ant-design/icons';
import { List, Button, Input, Form ,notification, Modal} from 'antd';
import { Link } from "react-router-dom";
export default function Todo(){
    var [listTask,setListTask] = useState([])
    const [edit,setEdit] = useState()
    const [idEdit,setId] = useState()
    const [form] = Form.useForm()
    const token = localStorage.getItem('token')
    const [api, contextHolder] = notification.useNotification();
    const NotifySuccess = (placement,type,typeTask) => {
        api[type]({
        message: `${typeTask} thành công`,
        description:
            'Chúc bạn 1 ngày mới tốt lành',
        placement,
        });
    };
    const NotifyError = (placement,type,typeTask) => {
        api[type]({
        message: `${typeTask} không thành công`,
        description:
            'Vui lòng thử lại',
        placement,
        });
    };
    axios({
        url:"https://backoffice.nodemy.vn/api/tasks?=&sort[0]=createdAt:desc",
        method:"GET"
    })
    .then((res)=>{
        setListTask(res.data.data)
        // console.log(res.data.data)
    })
    .catch((err)=>{
        console.log(err)
    })
    function AddTask(values){
        console.log(values)
        axios({
            url: "https://backoffice.nodemy.vn/api/tasks",
            method: "POST",
            data: {
                data: values
            },
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + token
            },
        })
        .then((res)=>{
            // console.log(res.data.data)
            setListTask([...listTask,res.data.data])
            setTimeout(()=>{
                NotifySuccess('top','success','Thêm mới')
            },1000)
            // console.log(listTask)
            form.setFieldsValue({
                title:""
            })
        })
        .catch((err)=>{
            NotifyError('top','error',"Thêm mới")
        })
    }
    function DeleteTask(id){
        axios({
            url:'https://backoffice.nodemy.vn/api/tasks/'+ id,
            method:'DELETE',
            headers: { 
                'Authorization': 'Bearer ' + token
            }
        })
        .then((res)=>{
            setTimeout(()=>{
                NotifySuccess('top','success','Xóa')
                const DelArr = listTask.filter((item=>{
                    return item.id !== id
                }))
                setListTask(DelArr)
            },1000)
        })
        .catch((err)=>{
            NotifyError('top','error',"Xóa")
        })
    }
    function SearchTask(values){
        axios({
            url:"https://backoffice.nodemy.vn/api/tasks?filters[title][$contains]="+ values.search,
            method:"GET"
        })
        .then((res)=>{
            var searchTask = res.data.data
            // console.log(searchTask)
            if(searchTask.length == 0) {
                NotifyError('top','warning','Search')
                setListTask([])
            }
            else {
                NotifySuccess('top','success','Search')
                // console.log(listTask)
                setListTask(searchTask)
            }
        })
        .catch((err)=>{
            console.log("Search lỗi")
        })
        console.log(listTask)

    }
    function EditTask(values){
        console.log(values)
        axios({
            url:"https://backoffice.nodemy.vn/api/tasks/" + idEdit,
            method: "PUT",
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer '+ token
            },
            data:{
                data:{
                    title:values.edit
                }
            }
        })
        .then((res)=>{
            setTimeout(()=>{
                const newArray = listTask.map(item=>(item.id === res.data.data.id ? res.data.data : item))
                setListTask(newArray)
                setEdit(edit+20)
            },1000)
            setTimeout(()=>{
                NotifySuccess('top','success','Sửa')
            },1500)
        })
        .then((err)=>{
            console.log("that bai")
        })
    }
    return (
        <>
        {contextHolder}

            <h1 style={{marginTop:50}}>Welcome CRUD Nodemy</h1>
            <div style={{height:"100vh"}}>
                <Link to="/" className="navlink">Home</Link>
                <Form onFinish={SearchTask} className="todosearch">
                    <Form.Item name="search">
                        <Input placeholder="Nhập data cần tìm kiếm"></Input>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                    </Button>
                </Form>
                <Form onFinish={AddTask} className="todoform" form={form}>
                        <Form.Item name="title">
                            <Input placeholder="Nhập data cần thêm"></Input>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" onClick={()=>{
                        }}>Thêm</Button>
                </Form>
                <List
                    style={{marginTop:30}}
                    size="small"
                    bordered
                    dataSource={listTask}
                    pagination={{
                        position: "bottom",
                        align: "center",
                        pageSize:5,

                    }}
                    renderItem={(item,index) => (
                        <List.Item >
                                <p>{item.id}</p>
                                {edit === index ? (
                                    <>
                                        <Form onFinish={EditTask} style={{display:"flex",gap:35}}>
                                            <Form.Item name="edit" initialValue={item.attributes.title}>
                                                <Input></Input>
                                            </Form.Item>
                                            <Button htmlType="submit">Update</Button>
                                            <Button htmlType="submit" onClick={()=>{
                                                setEdit(index + 20)
                                            }}>Cancel</Button>
                                        </Form>
                                    </>
                                ) : (
                                    <>
                                        <p>{item.attributes.title}</p>
                                        <div className="btn-display">
                                            <Button onClick={()=>{
                                                // console.log(index)
                                                setEdit(index)
                                                setId(item.id)
                                            }}>Sửa</Button>
                                            <Button onClick={()=>{
                                                DeleteTask(item.id)
                                            }}>Xóa</Button>
                                        </div>
                                    </>
                                    
                                )}
                                
                        </List.Item>
                    )  
                    }
                />
            </div>
        </>
    )
}