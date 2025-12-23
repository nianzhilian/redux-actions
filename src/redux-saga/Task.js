export class Task{
    constructor(next,cobj){
        this.next = next;
        this.cobj = cobj;
        this.cobj.callback = ()=>{
            this.resolve && this.resolve();
        }
    }
    cancle(){
        this.next(null,null,true);
    }
    toPromise(){
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
        })
    }
}