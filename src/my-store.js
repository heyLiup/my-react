const inin={
    gun:10
}

export function readuce(state=10,action){
    switch(action.type){
        case "add":return state+1
            break;
        case "reduce":return state-1
            break;  
        default:return 10
    }
}

function bindDispatch(create,dispatch){
    return (...args)=>dispatch(create(...args))
}

export function bindActionDispatch(creaters,dispatch){
    const bound={};
    Object.keys(creaters).forEach(v=>{
        // bound[v]=bindDispatch(creaters[v],dispatch)
        bound[v]=(...args)=>dispatch(creaters[v](...args))

    })
    return bound
}

export function addgun(){
    return {type:"add"}
}
export function reduceGun(){
    return {type:"reduce"}
}
