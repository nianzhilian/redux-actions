import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
//运行一次该模块不做任何的导入
import './test/index'

//匿名函数自动会执行
// (function(factory){
//    factory.call()
// })(function(){
//     alert('传的参数是函数')
// })

function async(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('完成')
        }, 1000);
    })
}

function* task(){
   let res = yield async();
    console.log(res)
    yield 456;
    console.log(456)
}

function run(gn){
    const iterator = gn();
    next();
    function next(nextVal){
        let res = iterator.next(nextVal);
        if(res.done){
            return;
        }
        if(typeof res.value.then == 'function'){
            res.value.then((data)=>{
                console.log('异步执行完了')
                next(data);
            })
        }else{
            next();
        }
    }
}

run(task)

ReactDOM.render(<App/>, document.getElementById('root'));
