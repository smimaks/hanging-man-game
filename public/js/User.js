

class User {
    constructor(loginElem, passwordElem, api) {
        this.loginElem = loginElem;
        this.passwordElem = passwordElem;
        this.api = api;
    }
   async createUser(){
   return await this.api.addUser({username: this.loginElem.value, password: this.passwordElem.value})
    }
}


