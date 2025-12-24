import React from 'react'
import ctx from './context'

export default class extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <>
            <ctx.Provider value={this.props.store}>
                {this.props.children}
            </ctx.Provider>
            </>
        )
    }
}