import React, { Component,useState,useEffect,useRef} from 'react'
import { Provider } from 'react-redux'
import store from './test'
import SysEntry from './test/SysEntry'
//将路由添加到状态中分三步
//1、在rootReducer中指定路由状态
//2、为store指定路由中间件
//3、连接路由容器 路面封装的是router组件
export default function(){
    return (
        <Provider store={store}>
            <SysEntry />
        </Provider>
    )
}

