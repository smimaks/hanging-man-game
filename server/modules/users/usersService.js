const fs = require('fs/promises');
const {readDataFromDb, generateStrForToken, writeFileInDb} = require("../utils");
const path = require("path");


class UsersService {
    constructor(path) {
        this.path = path;
    }

    async addUser(username, password) {
        if(await this.#isLoginExist(username)){
            throw new Error('User with current login is already exists!')
        }
        const user = {username, password}
        const data = await readDataFromDb(this.path);
        user.token = generateStrForToken();
        data.push(user);
        await writeFileInDb(this.path, data);
        return user.token;
    }

    async findUser(username) {
        const usersArray = await readDataFromDb(this.path);
        return usersArray.find(item => item.username === username);
    }

    async findUserByToken(token){
        const usersArray = await readDataFromDb(this.path);
        return usersArray.find(item => item.token === token);
    }

   async updateUserByToken(token, user){
        const usersArray = await readDataFromDb(this.path);
        const userIndex = usersArray.findIndex(item => item.token === token);
        usersArray[userIndex] = user;
        await writeFileInDb(this.path, usersArray)

    }


    async addStatistics(token, userStatistics) {
        const user = await this.findUserByToken(token);
        if(user.statistics){
        user.statistics.wrong += userStatistics.wrong;
        user.statistics.right += userStatistics.right;
        user.statistics.gamesCounter++;
        }
        else{
            user.statistics = userStatistics;
            user.statistics.gamesCounter = 1;
        }
        await this.updateUserByToken(token, user);
        return user;
    }

    async authUser(username, password){
        const user = await this.findUser(username);
        if(!user){
            throw new Error(`user ${username} not found!`)
        }
        if(user.password === password){
            return user.token;
        }
        throw new Error(`password for ${username} incorrect!`);
    }

    async #isLoginExist(login){
        return !!(await this.findUser(login))
    }
}
module.exports = UsersService;