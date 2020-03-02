const ATM = {
    isAuth: false, 
    currentUser: {},
    // all cash available in ATM
    cash: 2000,
    // all available users
    users: [
        { id: "0000", pin: "000", debet: 0, type: "admin" }, // EXTENDED
        { id: "0025", pin: "123", debet: 675, type: "user-1" },
        { id: "0026", pin: "124", debet: 600, type: "user-2" }
    ],
    // authorization
    auth(id, pin) {
       for(let i = 0; i < this.users.length; i++){ 
            if(this.users[i].id == id && this.users[i].pin == pin){ 
                this.isAuth = !this.isAuth;
                this.currentUser = this.users[i];
                if( this.currentUser.history === undefined){
                    this.currentUser.history = '';
                }
                return [true, this.users[i].type];
            }
        }

        return false;
    },
    // check current debet
    check() {
        return this.currentUser.debet;
    },
    // get cash - available for user only
    getCash(amount) {
        if(amount > 0 && this.isAuth && this.cash >= amount 
            && this.currentUser.debet >= amount) {
            this.currentUser.debet -= amount;
            this.currentUser.history += `${this.currentUser.type} debet: -${amount} <br> `;  
            this.cash -= amount;
        } else {
            return false;
        }

        return true;
    },
    // load cash - available for user only
    loadCash(amount) {
        if(amount > 0 && this.isAuth) {
            this.currentUser.debet += amount; 
            this.currentUser.history += `${this.currentUser.type} debet: +${amount} <br> `;
        } else {
            return false;
        }

        return true;
    },
    // load cash to ATM - available for admin only - EXTENDED
    loadAtmCash(amount) {
        if(amount > 0 && this.isAuth) {
            this.cash += amount;
            console.log(this.cash);
        } else {
            return false;
        }

        return true;
    },
    // get cash actions logs - available for admin only - EXTENDED
    getLogs() {
        let historyArr = this.users.filter(function(item) {
            return item.history !== '' && item.history != undefined;
        });
        let strHistory = '';
        historyArr.forEach(item => {
            strHistory += item.history;
        });
        return strHistory;
    },
    // log out
    logout() {
        const type = this.currentUser.type;
        this.currentUser = {};
        this.isAuth = !this.isAuth;
        return [this.isAuth, type];
    }
};

/*regular checks that this is an admin or user*/
const regUser = /user/;
const regAdmin = /admin/;

//log in
const btn = document.querySelectorAll('.btn');
const windowAuthorization = document.querySelector('.wrp-authorization');
const wrp = document.querySelector('.wrp');
const user = document.querySelector('.log-user');
const titleUser = document.querySelector('.user');
const admin = document.querySelector('.log-admin');
const titleAdmin = document.querySelector('.admin');
btn[0].addEventListener('click', () => {
    const id = String(document.querySelector('.id').value);
    const pin = String(document.querySelector('.pin').value);
    const log = ATM.auth(id, pin);

    //user
    if(log[0] && regUser.test(log[1])){
        user.style.display = 'block';
        titleUser.style.display = 'block';
        //change window
        windowAuthorization.style.display = 'none';
        btn[6].style.display = 'block';
        wrp.style.height = '80%';
    } else if(log[0] && regAdmin.test(log[1])) {//admin
        admin.style.display = 'block';
        titleAdmin.style.display = 'block';
        //change window
        windowAuthorization.style.display = 'none';
        btn[6].style.display = 'block';
        wrp.style.height = '80%';
    }
});

//withdraw money from the account
const field1 = document.querySelector('.cash-get-field');
btn[1].addEventListener('click', () => {
    const amount = Number(document.querySelector('.cash-get-field').value);
    ATM.getCash(amount) ? field1.style.borderColor = 'green' : field1.style.borderColor = 'red';
});

//deposit money from an account
const field2 = document.querySelector('.cash-load-field');
btn[2].addEventListener('click', () => {
    const amount = Number(field2.value);
    ATM.loadCash(amount) ? field2.style.borderColor = 'green' : field2.style.borderColor = 'red';
});

//check account
const checkCash = document.querySelector('.check-cash');
btn[3].addEventListener('click', () => {
    checkCash.textContent = ATM.check();
});

//log out
const historyUsers = document.querySelector('.check-history');
btn[6].addEventListener('click', () => {
    const log = ATM.logout();
    //user
    if(!log[0] && regUser.test(log[1])){
        user.style.display = 'none';
        titleUser.style.display = 'none';
        field1.style.borderColor = 'black';
        field1.value = '';
        field2.value = '';
        checkCash.textContent = '';
        field2.style.borderColor = 'black';
    } else if(!log[0] && regAdmin.test(log[1])) {//admin
        admin.style.display = 'none';
        titleAdmin.style.display = 'none';
        historyUsers.innerHTML = '';
    }
    //change window
    windowAuthorization.style.display = 'block';
    btn[6].style.display = 'none';
    wrp.style.height = '50%';
});

//user account action
btn[4].addEventListener('click', () => {
    let history = ATM.getLogs();
    historyUsers.innerHTML = history;
});

//cash load ATM
btn[5].addEventListener('click', () => {
    const amount = Number(document.querySelector('.cash-atm-field').value);
    if(amount > 0){
        ATM.loadAtmCash(amount);
    }
});

