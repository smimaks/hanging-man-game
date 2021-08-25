class Controller {
    constructor(model, view, api, token) {
        this.model = model;
        this.view = view;
        this.api = api;
        this.token = token;
        this.tryGuessLetter = this.model.tryGuessLetter.bind(this.model);
        this.initPaintSecretWord = this.view.initPaintSecretWord.bind(this.view);
        this.initPaintLetters = this.view.initPaintLetters.bind(this.view);
        this.initSecretAndGuessWord = this.model.initSecretAndGuessWord.bind(this.model);
        this.initStartBtn = this.view.initStartBtn.bind(this.view);
        this.drawHangingMan = this.view.drawHangingMan.bind(this.view);
        this.isWinGame = this.model.isWinGame.bind(this.model);
        this.isLoseGame = this.model.isLoseGame.bind(this.model);
        this.printLoseGame = this.view.printLoseGame.bind(this.view);
        this.printWinGame = this.view.printWinGame.bind(this.view);
        this.getStatistics = this.model.getStatistics.bind(this.model);
        this.addStatistics = this.api.addStatistics.bind(this.api);
    }

    handlerWrongStep(){
     return this.model.attempts.reduce((item, current) => !current.isCorrect + item, 0);
    }

   async updateGuessWord(e){
        this.tryGuessLetter(e.target.innerText);
        this.initPaintSecretWord(this.model.guessWord);
        this.drawHangingMan(this.handlerWrongStep());
      await this.finishGame();
        e.target.disabled = true;
    }

    async start(){
        this.model.attempts = [];
        await this.initSecretAndGuessWord(this.view.getLevel());
        this.initPaintLetters(await this.updateGuessWord.bind(this));
        this.initPaintSecretWord(this.model.guessWord);
        this.view.initPaintHangingMan(this.handlerWrongStep());
    }

    async initGame() {
        this.initStartBtn(this.start.bind(this))
    }

   async finishGame(){
        if(this.isLoseGame()){
            this.printLoseGame(this.model.secretWord);
            await this.putStatistic()

        }
        if(this.isWinGame()){
            this.printWinGame();
            await this.putStatistic();
        }

    }

  async putStatistic(){
  await this.api.addStatistics(this.getStatistics(), this.token);

   }
}