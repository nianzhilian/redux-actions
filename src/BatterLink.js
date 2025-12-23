import React from 'react'
import { BrowserRouter as Router, Route,NavLink } from 'react-router-dom'
import configs from './routerConfig';

function getPathFromName(configs,name,baseUrl){
  let url = baseUrl || '';
  for (const cf of configs) {
    if(cf.name == name){
      return url+cf.path;
    }else{
      if(Array.isArray(cf.children)){
        let path = getPathFromName(cf.children,name,cf.path);
        if(path!=undefined){
          return path
        }
      }
    }
  }
}

function BatterLink({to,...rest}){
  //判断是否存在name属性和是否是对象
  if(to.name && typeof to!='string'){
    to.pathname = getPathFromName(configs,to.name);
    if(to.pathname === undefined){
      throw new Error(`name属性值无效${to.name}`)
    }
  }
  return (
    <NavLink {...rest} to={to} />
  )
}

export default BatterLink;
