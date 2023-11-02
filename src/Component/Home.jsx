import { Link } from "react-router-dom"
import Signout from "./Login/Signout"
import { useState } from "react"
export default function Home(){
    const signout = localStorage.getItem('user')
    const [value,setValue] = useState(false)
    return (
        <>
            <Link to="/todolist" className='todolist'>TodoList</Link>
            <div className='toolbar'>
                {signout 
                ? 
                <>
                    <Link>{signout}</Link>
                    <Signout values={setValue}></Signout>
                </>
                : 
                <>
                    <Link to="./login">Đăng nhập</Link>
                    <Link to="./signin">Đăng ký</Link>
                </>}
            </div>
        </>
    )
}