import { Navigate } from "react-router-dom";

export default function PrivateSignin(props){
    let token = localStorage.getItem('token')
    if(!token){
        return props.children
    }
    else {
        return <Navigate to="/"></Navigate>
    }
}