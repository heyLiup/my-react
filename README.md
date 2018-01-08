## 自己动手实现redux 及 react-redux 做的一个小demo
### npm i 
### npm start 运行

### 首先 context实现

- 每一次通过this.props在组件中层层传递参数浪费性能，在顶层组件提供一个context，类似于全局变量，顶层组件的所有的子组件就可以访问到this.context

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
    static contextType={
        name:propsType.string
    }
    ```
    在constructor里定义了props， context后
    就可与通过this.context.name  拿到context里的了，不管数据嵌套了多深

