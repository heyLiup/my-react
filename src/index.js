import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from './my-createStore'
import propTypes from 'prop-types'
import {Provider,connect} from './my-provider'
// import {connect} from 'react-redux'
import {readuce,addgun,reduceGun} from './my-store'

const store =createStore(readuce)

store.subscribe(function(){
    console.log(store.getState())
})
class Warp extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={num:10}
        this.handleAdd=this.handleAdd.bind(this);
        this.handleReduce=this.handleReduce.bind(this);
    }
    // componentWillReceiveProps(){
    //     this.setState({num:this.props.gun})
    // }
    handleAdd(){
        this.props.addgun()
    }
    handleReduce(){
        this.props.reduceGun()
    }
    render(){
        return(
            <div>
                <button onClick={()=>{this.handleAdd()}}>增加</button>
                <button onClick={()=>{this.handleReduce()}}>减少</button>
                <p>现在有{this.props.state}把</p>
            </div>
           
        )
    }
}


Warp =connect(
    state=>state,
    {addgun,reduceGun}
)(Warp)

ReactDOM.render(
    <Provider store={store}>
        <Warp/>
    </Provider>
,document.getElementById('root'))




















// class Father extends React.Component{
//     static childContextTypes={
//         name:propTypes.string
//     }
//     constructor(props){
//         super(props)
//         this.state={name:"lius"}
//     }
//     componentDidMount(){
        
//     }
//     getChildContext(){
//         return this.state
//     }
//     render(){
//         return (
//             <div>这是父亲
//                 <Son />
//                 <Grandfather father={this.state.name}/>
//             </div>
            
//         )
//     }
// }

// class Son extends React.Component{
//     render(){
//         return (
//             <div>这是儿子</div>
//         )
//     }
// }

// class Grandfather extends React.Component{
//     static contextTypes={
//         name:propTypes.string
//     }
//     constructor(props,context){
//         super(props,context)
//         console.log(this.context);
//         console.log(this.props.children)
        
//     }
//     render(){
//         return (
//             <div>{`这是爷爷${this.context.name}`}</div>
//         )
//     }
// }