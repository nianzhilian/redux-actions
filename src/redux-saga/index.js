
import runSaga from "./runSaga"
import { Channel } from "./Channel";
//中间件创建函数 返回一个中间件
export default function(){
    return function mid(store){
        const env = {
            store,
            channel:new Channel()
        }
        //使用bind生成一个新函数
        /**
         * @param env 此传参是一个占位符 把这个参数放到函数的第一位置
         * 当调用的时候 传递的函数放到后面
         * mid.run(generator)
         */
        mid.run = runSaga.bind(mid,env);
        return function(next){
            return function(action){
                let res = next(action);
                env.channel.put(action.type,action)
                return res;
            }
        }
    }
}