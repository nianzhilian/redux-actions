import React from 'react'
import store from '../..';  
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

const mapDiapatchToProps = (dispatch)=>{
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

function withHoc(Component){
    class Temp extends React.Component{
        constructor(props){
            super(props);
            this.state = mapStateToProps(store.getState());
            store.subscribe(()=>{
                this.setState(mapStateToProps(store.getState()))
            })
        }
        render(){
            const handles = mapDiapatchToProps(store.dispatch);
            return (
                <Component {...this.state} {...handles} />
            )
        }
    }
    return Temp;
}

export default withHoc(Counter);