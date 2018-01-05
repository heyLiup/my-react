// app=connect(mapStateToProps=state=>state,mapDispatchToProps  )(app)


const connect=function(mapStateToProps=state=>state,mapDispatchToProps){
    return function(swapComponent){
        return class WarpComponent extends React{

            render(){
                return WarpComponent
            } 
        }
    }
}

const connect=(mapStateToProps=state=>state,mapDispatchToProps)=>(swapComponent)=>{
    return class WarpComponent extends React{

    }
    
}