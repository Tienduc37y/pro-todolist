import { Navigate } from "react-router-dom";

export default function PrivateRouter(props){
    let token = localStorage.getItem('token')
    if(!token){
        return <Navigate to="/login"></Navigate>
    }
    else {
        return props.children
    }
}