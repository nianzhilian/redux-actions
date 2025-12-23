export class Channel{
    //初始化一个实例属性
    listerns = {};
    //添加订阅
    //原型链方法
    /**
     * 
     * @param {*} props action类型
     * @param {*} fn 添加的回调
     */
    take(props,fn){
        if(this.listerns[props]){
            this.listerns[props].push(fn);
        }else{
            this.listerns[props] = [fn];
        }
    }
    //发布订阅
    put(prop,...args){
        if(this.listerns[prop]){
            var fns = this.listerns[prop];
            delete this.listerns[prop];
            fns.forEach(fn => {
                fn.apply(null,args)
            });
        }
    }
}