## 自己动手实现redux 及 react-redux 
### npm i 
### npm start 运行

### 首先 我们先实现context

- context是什么呢？我们每一次通过this.props在组件中层层传递参数就会浪费性能，那么在顶层组件提供一个context，类似于全局变量，顶层组件的所有的子组件就可以访问到this.context来获取参数值了

- 由于context是全局的，对类型很严格，所以父子组件在接受和传递时都要约定数据类型，在最新的react中，propTypes是被抽离出来的，为了维持react的纯洁精简

- 父组件给子组件传递数据时
  ```
    getChildContext(){
        return {name:"lllll"}    //核心，将store放到context环境中
    }

    static childContextTypes={
         name:propsType.string
    }    
   ```
 - 这样子组件在接收的时候
 
```
    static contextTypes={
        name:propsType.string
    }
```
    
    在constructor里定义了props， context后
    就可与通过this.context.name  拿到context里的了，不管数据嵌套了多深
    
### 第二步  实现redux里的createStore
    
    - createStore接收一个reduce和middleWare或者initStore
      源码里还有一系列的类型监测赋值等，我们先就把重要的捡出来说
      createStore里面提供了三个方法getState  subscribe   dispatch
      
 ```
      export function createStore(reduce,middleWare,initStore){
        let currentState=initState||null;
        let currentListener=[];
        let initAction={type:"INIT"}
        
        function dispatch(obj){
          currentState=reduce(obj);
          currentListener.forEach(v=>v())
        }
        function getState(){
          return currentState
        }
        function subscribe(fun){
          currentListener.push(fun)
        }
        dispatch(initAction)  //初始化state
        return {dispatch,getState,subscribe}
      }
      
 ```

