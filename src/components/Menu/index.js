import React from 'react'
import { NavLink } from 'react-router-dom'

//只运行一次该模块  不做任何的导入
import './index.css'
export default function(){
    return (
        <ul className='menu'>
            <li><NavLink to='/'>首页</NavLink></li>
            <li><NavLink to='/students'>学生列表</NavLink></li>
            <li><NavLink to='/students/add'>添加学生</NavLink></li>
            <li><NavLink to='/courses'>课程列表</NavLink></li>
            <li><NavLink to='/course/add'>添加课程</NavLink></li>
        </ul>
    )
}