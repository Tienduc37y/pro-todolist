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
                        <!-- Start of LiveChat (www.livechat.com) code -->
            <script>
                window.__lc = window.__lc || {};
                window.__lc.license = 18870288;
                window.__lc.integration_name = "manual_onboarding";
                window.__lc.product_name = "livechat";
                ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
            </script>
            <noscript><a href="https://www.livechat.com/chat-with/18870288/" rel="nofollow">Chat with us</a>, powered by <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a></noscript>
            <!-- End of LiveChat code -->
            
                    </>
    )
}
