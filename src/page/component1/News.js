import React from 'react'
import BatterLink from '../../BatterLink';
function News(props){
    console.log(props)
  return (
    <div>
        <nav className="nav">
            <BatterLink exact to={{name:'newsHome'}}>新闻首页</BatterLink>
            <BatterLink exact to={{name:'newsList'}}>新闻列表</BatterLink>
            <BatterLink exact to={{name:'newsDetail'}}>新闻详情</BatterLink>
            {/* <NavLink exact to="/news/">新闻首页</NavLink>
            <NavLink exact to="/news/list">新闻列表</NavLink>
            <NavLink exact to="/news/detail">新闻详情</NavLink> */}
        </nav>
      {
        props.children
      }
    </div>
  )
}

export default News;