import React, { Component,useState,useEffect,useRef} from 'react'


class CompA extends Component {

    state = {
        n: 1
    }

    componentDidMount() {
        console.log("CompA 新建(挂载完毕)")
    }

    componentWillUnmount() {
        console.log("CompA 卸载")
    }


    render() {
        console.log('创建虚拟dom')
        return <div>
            数字：{this.state.n} <button onClick={() => {
                this.setState({
                    n: this.state.n + 1
                })
            }}>+</button>
        </div>
    }
}
//初次渲染打印顺序
//创建虚拟dom  CompA 新建(挂载完毕)
//状态变更重新渲染  打印顺序
//创建虚拟dom  CompA 卸载   CompA 新建(挂载完毕)

//如果使用相同的key 会进行检查 如果一样则会使用同样的实例 不走卸载 会复用类的实例 只需要重新走render 比对渲染就行

//异步回调中读取到最新的state

function Test(props){
    //赋值初始值依赖于props 只在首次渲染的时候起作用 后续渲染不会在进行初始化了 就没作用了
    const ref = useRef(props);
    useEffect(() => {
       //为了能够读取到最新的值
       //每次组件重新渲染该副作用都会执行
       //为ref 的current属性重新赋值成最新的props
       ref.current = props;
    })
    useEffect(() => {
        function tick(){
            console.log(ref.current)
        }
        const id = setInterval(tick,1000);
        return () => clearInterval(id);
    }, [])
    return null
}

function Parent(){
    const [count, setcount] = useState(0);
    useEffect(() => {
        setInterval(() => {
            setcount(c=>c+1)
        }, 2000);
        return () => {
            
        };
    }, [])
    return (
        <Test num={count} />
    )
}

export default class App extends Component {
    state = {
        isVisible: false
    }
    render() {
        // if (this.state.isVisible) {
        //     return <div>
        //         <h1>标题</h1>
        //         <CompA key="compa" />
        //         <button onClick={() => {
        //             this.setState({
        //                 isVisible: !this.state.isVisible
        //             })
        //         }}>显示/隐藏</button>
        //     </div>
        // }
        // return (
        //     <>
        //     <Parent />
        //     <div>
        //         <CompA key="compa" />
        //         <button onClick={() => {
        //             this.setState({
        //                 isVisible: !this.state.isVisible
        //             })
        //         }}>显示/隐藏</button>
        //     </div>
        //     </>
        // )
        return null;
    }
}

