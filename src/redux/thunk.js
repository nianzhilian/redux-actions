
export default function(store){
    return function(next){
        return function(action){
            console.log('每次都走这里');
            if(typeof action == 'function'){
                return action(store.dispatch,store.getState)
            }
            return next(action);
        }
    }
}