//

export function createStore(reducer){
    let initStore={};
    let listenList=[];

    function getState(){
        return initStore
    }
    function subscribe(fun){
        listenList.push(fun)
    }
    function dispatch(action){
        initStore=reducer(initStore,action);
        listenList.forEach(v=>v())
    }

    dispatch({type:"@init-react"})
    return {getState,subscribe,dispatch}
}