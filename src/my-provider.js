//借助于context 将store注入进App组件
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {bindActionDispatch} from './my-store'
export class Provider extends React.Component{
    static childContextTypes={
        store:PropTypes.object
    }
    //把store放到context里面   然后所有的子组件就可以读取到
    getChildContext(){
        return {store:this.store}
    }
    constructor(props,context){
        super(props,context)
        this.store=props.store
    }
    render(){
        return this.props.children
    }
}
//接收两部分  一个是注入到WarpComponent里的state  一个提供this.props里的方法
export const connect =(mapStateToProps=state=>state,mapDispatchToProps)=>(WarpComponent)=>{
    return class WarpComponents extends React.Component{
        static contextTypes={
            store:PropTypes.object
        }
        constructor(props,context){
            super(props,context)
            this.state={
                props:{

                }
            }
        }
        componentDidMount(){
            const {store}=this.context
            store.subscribe(()=>this.update())
            this.update()
        }
        update(){
            const {store}=this.context
            const stateProps=mapStateToProps(store.getState()) 
            // const actionBindDispatch=bindActionDispatch(mapDispatchToProps,store.dispatch)
            const actionBindDispatch={}
            Object.keys(mapDispatchToProps).forEach(v=>{
                actionBindDispatch[v]=(...args)=>store.dispatch(mapDispatchToProps[v](...args));
            })
            this.setState({
                props:{
                    ...this.state.props,
                    ...actionBindDispatch,
                    state:stateProps
                }
            })
        }
        render(){
            console.log(this.state.props)
            return (
                <WarpComponent {...this.state.props}/>
            )
        }
    }
}
