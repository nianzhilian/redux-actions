import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
//运行一次该模块不做任何的导入
// import './test/index'

//匿名函数自动会执行
// (function(factory){
//    factory.call()
// })(function(){
//     alert('传的参数是函数')
// })


ReactDOM.render(<App/>, document.getElementById('root'));
