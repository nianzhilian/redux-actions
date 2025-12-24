import React from 'react'
//只运行一次该模块  不做任何的导入
import './index.css'
export default function(){
    return (
        <ul className='menu'>
            <li><a href='/'>首页</a></li>
            <li><a href='/students'>学生列表</a></li>
            <li><a href='/students/add'>添加学生</a></li>
            <li><a href='/courses'>课程列表</a></li>
            <li><a href='/course/add'>添加课程</a></li>
        </ul>
    )
}