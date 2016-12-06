class CookieHandler{
    cookie:string;

    constructor(cookie:string){
        this.cookie = cookie;

        if(!localStorage.getItem(this.cookie)){
            localStorage.setItem(this.cookie,"0");
        }
        // this.delete();
    }

    delete(){
        localStorage.setItem(this.cookie,"0");
    }

    add(amount:number){
        var cookieAmount = this.getInt();
        // cookieAmount += amount;
        this.set(cookieAmount);
    }

    set(add:number){
        var cookieAmount = String(add);
        localStorage.setItem(this.cookie,cookieAmount);
    }

    getInt():any{
        if(localStorage.getItem(this.cookie)){
            return parseInt(localStorage.getItem(this.cookie));
        }else{
            return false;
        }
    }
}