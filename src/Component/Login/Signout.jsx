import { Button } from "antd";

export default function Signout({values}){
    return (
        <Button onClick={()=>{
            setTimeout(()=>{
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                values(true)
            },1000)
        }} style={{background:"#000", border:"none",outline:"none"}}>Đăng xuất
        </Button>
    )
}