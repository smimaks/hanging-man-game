class Api {

    #generateHeaders(token){
        return  {
            'Authorization': `Bearer ${token}`
        }
    }

   async addUser(user){
       const response = await fetch('/registration', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(user)
        })
        return await response.json();
    }

    async authUser(user){
        const response = await fetch('/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(user)
        })
        return await response.json();
    }

    async getWord(level, token) {
       const response = await fetch(`/${level}/word`, {
           headers: this.#generateHeaders(token)
       })
        return await response.json();
    }

    async getProfile(token){
        const response = await fetch('/profile', {
            headers: this.#generateHeaders(token)
        })
        return await response.json();
    }

    async getStatistic(token){
       const response = await fetch(`/user/statistics`, {
           headers: this.#generateHeaders(token)
       })
        return await response.json();
    }
 async tokenValidation(token){
        const response = await fetch('/validate-token', {
            headers : this.#generateHeaders(token)
        })
    return await response.json();
 }

async addStatistics(userStatistics, token){
        const response = await fetch('/post-statistics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userStatistics),
        })
    return await response.json();
 }
}