import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './Component/Login/Login'
import TodoList from './Component/TodoList/TodoList.jsx'
import PrivateRouter from './Component/Login/PrivateRouter'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Signin from './Component/Login/Signin'
import PrivateSignin from './Component/Login/PrivateSignin'
import Home from './Component/Home'
import DetailTask from './Component/DetailTask.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element : <Home></Home>
  },
  {
    path: "/task/:id",
    element : (
      <PrivateRouter>
        <DetailTask></DetailTask>
      </PrivateRouter>
      )
  },
  {
    path: "/todolist",
    element: (
      <PrivateRouter>
        <TodoList></TodoList>
      </PrivateRouter>
    )
  },
  {
    path:"/login",
    element: (
        <Login></Login>
    )
  },
  {
    path:"/signin",
    element: (
      <PrivateSignin>
        <Signin></Signin>
      </PrivateSignin>
    )
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Login></Login>
      <TodoList></TodoList>
      <Signin></Signin>
    </RouterProvider>
  </React.StrictMode>,
)
