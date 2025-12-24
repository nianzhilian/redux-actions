import React from 'react' 
import { connect } from '../../../react-redux';
import { incress,dincress, asyncDincress, asyncIncress } from '../../redux-actions/counter';
export function Counter(props){
    return (
        <div>
            <button onClick={props.onAsyncDincress}>异步减</button>
            <button onClick={props.onDincress}>减</button>
            {props.count}
            <button onClick={props.onIncress}>增</button>
            <button onClick={props.onAsyncIncress}>异步增</button>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        count:state.counter
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onAsyncDincress:function(){
            dispatch(asyncDincress())
        },
        onDincress:function(){
           dispatch(dincress())
        },
        onIncress:function(){
            dispatch(incress())
        },
        onAsyncIncress:function(){
            dispatch(asyncIncress())
        },
    }
}
//只要存在就会被js解释器所解析 会解析整个文件的语法和检查变量的引用
// function withHoc(Component){
//     class Temp extends React.Component{
//         constructor(props){
//             super(props);
//             this.state = mapStateToProps(store.getState());
//             store.subscribe(()=>{
//                 this.setState(mapStateToProps(store.getState()))
//             })
//         }
//         render(){
//             const handles = mapDiapatchToProps(store.dispatch);
//             return (
//                 <Component {...this.state} {...handles} />
//             )
//         }
//     }
//     return Temp;
// }

export default connect(mapStateToProps,mapDispatchToProps)(Counter);