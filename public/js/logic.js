class Model {
    constructor(api, token) {
        this.api = api;
        this.token = token;
    }
    secretWord;
    guessWord;
    attempts = [];

    async getSecretWord(level){
        const data = await this.api.getWord(level, this.token);
        return data.word;
    }

    async initSecretAndGuessWord(level){
        this.secretWord = await this.getSecretWord(level);
        this.guessWord = '_'.repeat(this.secretWord.length);
    }

    tryGuessLetter(letter){
        let isCorrect = false;
        const guessLettersArray =  this.guessWord.split('');
        this.secretWord.split('').forEach((item, index) => {

            if(letter === item){
                guessLettersArray[index] = letter;
                isCorrect = true;
            }
        });
        this.attempts.push({letter: letter, isCorrect});
        this.guessWord = guessLettersArray.join('');
    }
    isWinGame(){
        return this.secretWord === this.guessWord;
    }
    isLoseGame(){
        return this.attempts.filter(item => !item.isCorrect).length === 5;
    }
    getStatistics(){

        return {
            wrong: this.attempts.filter(item => !item.isCorrect).length,
            right: this.attempts.filter(item => item.isCorrect).length,
        };



    }
}