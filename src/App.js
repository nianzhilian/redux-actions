import React, { Component,useState,useEffect,useRef} from 'react'
import { Provider } from './react-redux'
import store from './test'
import Counter from './test/component/counter'

export default function(){
    return (
        <Provider store={store}>
            <Counter />
        </Provider>
    )
}

