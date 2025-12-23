
import React from 'react'
import { BrowserRouter as Router, Route,NavLink } from 'react-router-dom'

const load = (component)=>{
    return React.lazy(()=>import(`./page/component1/${component}`))
}

// 改写成根据name去匹配路径
const configs = [
    {
        path:'/news',
        component:load('News'),
        name:'news',
        children:[
            {
                path:'/',
                component:load('NewsHome'),
                exact:true,
                name:'newsHome'
            },
            {
                path:'/list',
                component:load('NewsList'),
                exact:true,
                name:'newsList'
            },
            {
                path:'/detail',
                component:load('NewDetail'),
                exact:true,
                name:'newsDetail'
            }
        ]
    },
    {
        path:'/',
        component:load('Home'),
        name:'home'
    }
]

export default configs;