import React from 'react'
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Home from './Home'
import StudentList from './student/StudentList'
import StudentAdd from './student/StudentAdd'
import CourseList from './course/CourseList'
import CourseAdd from './course/CourseAdd'
//Route 组件跟在哪个组件当中 或者是哪个位置 没关系 只要在Router组件当中 只有遇到就会进行路径匹配
//如果路径匹配到了 就会渲染对应的组件
export default function(){
    return (
        <Layout header={<Header />} aside={<Menu />} >
            <>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/students" exact component={StudentList} />
                <Route path="/students/add" exact component={StudentAdd} />
                <Route path="/courses" exact component={CourseList} />
                <Route path="/course/add" exact component={CourseAdd} />
            </Switch>
            </>
        </Layout>
    )
}
