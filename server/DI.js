const WordsService = require('./modules/words/wordsService');
const UsersService  = require('./modules/users/usersService');
const Validator = require('./validation')
const path = require("path");


const wordsService = new WordsService(path.resolve(__dirname, 'modules/words/words.json'));
const usersService = new UsersService(path.resolve(__dirname, 'modules/users/users.json'));
const validator = new Validator();

module.exports = {
    wordsService,
    usersService,
    validator
}