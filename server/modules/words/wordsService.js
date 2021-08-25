const fs = require('fs/promises');
const path = require('path');
const {readDataFromDb} = require('../utils');

class WordsService{
    constructor(path) {
        this.path = path;
    }

    levels = {
        easy: 4,
        medium: 6,
        hard: 8
    }

    /**
     *
     * @param {string} level
     * @returns {Promise<*>}
     */

   async getWord(level){
       if (Object.keys(this.levels).includes(level)){
     const words = await readDataFromDb(this.path);
     const filteredWords = this.#filterWords(words, level);
     return this.#getRandomWord(filteredWords);
       } else {
           throw new Error(`No such level: ${level}`)
       }
    }

    /**
     *
     * @param {string[]}words
     * @param level
     * @returns {string[]}
     */

    #filterWords(words, level){
      return  words.filter(item => item.length === this.levels[level]);
    }

    #getRandomWord(words){
       return words[Math.round(Math.random() * words.length)]
    }

}
module.exports = WordsService