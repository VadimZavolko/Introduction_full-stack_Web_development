const ATM = {
    isAuth: false, 
    currentUser: {},
    // all cash available in ATM
    cash: 2000,
    // all available users
    users: [
        { id: "0000", pin: "000", debet: 0, type: "admin" }, // EXTENDED
        { id: "0025", pin: "123", debet: 675, type: "user-1" },
        { id: "0026", pin: "124", debet: 600, type: "user-2" },
        { id: "25", pin: "123", debet: 75, type: "user-3" }
    ],
    // authorization
    auth(id, pin) {
        if(this.isAuth){
            this.addLog(`${this.currentUser.type} already logged in`);
            console.log(`${this.currentUser.type} already logged in`);
            return false;
        }

        for(let i = 0; i < this.users.length; i++){ 
            if(this.users[i].id === id && this.users[i].pin === pin){ 
                this.isAuth = !this.isAuth;
                this.currentUser = this.users[i]; 
                this.addLog(`${this.currentUser.type} logged`);
                return true;
            }
        }
        this.addLog(`You are not logged`);
        return false;
    },
    // check current debet
    check() {
        if(!this.isAuth){
            console.log(`You are not logged`);
            this.addLog(`You are not logged`);
            return false;
        }

        this.addLog(`${this.currentUser.type} check debet: ${this.currentUser.debet}`);
        console.log(`${this.currentUser.type} check debet: ${this.currentUser.debet}`);   

        return true;
    },
    // get cash - available for user only
    getCash(amount) {
        if(!this.isAuth){
            console.log(`You are not logged`);
            this.addLog(`You are not logged`);
            return false;
        }

        if(amount < 0 || amount === undefined){
            this.addLog(`${this.currentUser.type} money entered incorrectly`);
            console.log(`Money entered incorrectly`); 
            return false;
        }

        if(this.cash < amount){
            this.addLog(`No cash left at the ATM`);
            console.log(`No cash left at the ATM`);
            return false;
        }

        if(this.currentUser.debet < amount){
            this.addLog(`${this.currentUser.type} account is empty`);
            console.log(`${this.currentUser.type} account is empty`);
            return false;
        }

        this.currentUser.debet -= amount;
        this.addLog(`${this.currentUser.type} debet: -${amount}`);
        console.log(`${this.currentUser.type} debet: -${amount}`);
        this.addLog(`ATM Cash: -${amount}`);  
        this.cash -= amount;

        return this.cash;
    },
    // load cash - available for user only
    loadCash(amount) {
        if(!this.isAuth){
            console.log(`You are not logged`);
            this.addLog(`You are not logged`);
            return false;
        }

        if(amount < 0 || amount === undefined){
            this.addLog(`${this.currentUser.type} money entered incorrectly`);
            console.log(`Money entered incorrectly`); 
            return false;
        }

        this.currentUser.debet += amount; 
        this.addLog(`${this.currentUser.type} debet: +${amount}`);
        console.log(`${this.currentUser.type} debet: +${amount}`);
        return true;
    },
    // load cash to ATM - available for admin only - EXTENDED
    loadAtmCash(amount) {
        if(!this.isAuth){
            console.log(`You are not logged`);
            this.addLog(`You are not logged`);
            return false;
        }
         
        if(!new RegExp('admin').test(this.currentUser.type)){
            console.log(`You are not admin`);
            this.addLog(`You are not admin`);
            return false
        }

        if(amount < 0 || amount === undefined){
            this.addLog(`${this.currentUser.type} money entered incorrectly`);
            console.log(`Money entered incorrectly`); 
            return false;
        }
        
        this.cash += amount;
        this.addLog(`${this.currentUser.type} cash ATM: +${amount}`);
        console.log(`${this.currentUser.type} cash ATM: +${amount}`);

        return true;
    },
    // get cash actions logs - available for admin only - EXTENDED
    getLogs() {
        if(!this.isAuth){
            console.log(`You are not logged`);
            this.addLog(`You are not logged`);
            return false;
        }

        if(!new RegExp('admin').test(this.currentUser.type)){
            console.log(`You are not admin`);
            this.addLog(`You are not admin`);
            return false;
        }

        console.log(this.logHistory.join('\n'));

        return true;
    },
    // log out
    logout() {
        if(!this.isAuth){
            console.log(`You are not logged`);
            this.addLog(`You are not logged`);
            return false;
        }
        
        const type = this.currentUser.type;
        this.addLog(`${type} log out`);
        this.currentUser = {};
        this.isAuth = !this.isAuth;
        return true;
    },

    addLog(strLog){
        if(typeof strLog === 'string'){
            this.logHistory === undefined ? this.logHistory = [strLog] : this.logHistory.push(strLog);
            return true;
        }
        return false;
    }
};