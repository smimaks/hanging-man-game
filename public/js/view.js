class View{
    constructor({startBtn, lettersContainer, levelOptions, secretWordContainer, hangingManContainer}) {
       this.startBtn = startBtn;
       this.lettersContainer = lettersContainer;
       this.levelOptions = levelOptions;
       this.secretWordContainer = secretWordContainer;
       this.hangingManContainer = hangingManContainer;
    }

    letters = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЬЭЮЯ';
    canvas;

    initPaintLetters(btnCallBack){
        this.lettersContainer.innerHTML = '';
        let htmlLetters = "";
        this.letters.split('').forEach((item) => htmlLetters += `<button class="letters">${item}</button>`);
        const dom = new DOMParser().parseFromString(`<div>${htmlLetters}</div>`, 'text/html');
        dom.querySelectorAll('.letters').forEach(button => button.addEventListener('click',
            btnCallBack));
        this.lettersContainer.appendChild(dom.querySelector('div'));
    }

    initPaintSecretWord(word){
        this.secretWordContainer.innerHTML = '';
        let guessWord = "";
        word.split('').forEach(item => guessWord += `<span class="guess-letter">${item}</span>`)
        const dom = new DOMParser().parseFromString(`<div>${guessWord}</div>`, 'text/html');
        this.secretWordContainer.appendChild(dom.querySelector('div'));
    }
    initPaintHangingMan(wrongAttemptsAmount){
        this.hangingManContainer.innerHTML = '';
        const fieldForPaint = new DOMParser().parseFromString(`<canvas width="400" height="200" id="canvas"></canvas>`,`text/html`);
        this.canvas = fieldForPaint.querySelector('#canvas');
        this.drawHangingMan(wrongAttemptsAmount);
        this.hangingManContainer.appendChild(this.canvas);
    }

    drawHangingMan( wrongAttemptsAmount){
        if(!wrongAttemptsAmount){
            return
        }
        const ctx = this.canvas.getContext('2d');
        const radians = (deg) => (Math.PI/180) * deg;
        const canvasPainter = {
            step1: ()=>{
                ctx.moveTo(50, 50);
                ctx.lineTo(170, 50);
                ctx.moveTo(50, 300);
                ctx.lineTo(50, 50);
            },
            step2: ()=>{
                ctx.moveTo(170, 50);
                ctx.lineTo(170, 70);
                ctx.moveTo(170, 50);
                ctx.lineTo(170, 70);
            },
            step3: ()=>{
                ctx.arc(163, 80, 10, 0,  radians(360));
                ctx.moveTo(163, 90);
                ctx.lineTo(164, 120);
            },
            step4: () => {
                ctx.moveTo(163, 90);
                ctx.lineTo(190, 100);
                ctx.moveTo(163, 90);
                ctx.lineTo(143, 103);
        },
            step5: ()=>{
                ctx.moveTo(163, 120);
                ctx.lineTo(180, 130);
                ctx.moveTo(163, 120);
                ctx.lineTo(143, 130);
            },
        };
        ctx.beginPath();
        canvasPainter[`step${wrongAttemptsAmount}`]()
        ctx.stroke();
    }


    initStartBtn(initGameCb){
        this.startBtn.addEventListener('click', initGameCb);
    }
    getLevel(){
        for(const level of this.levelOptions){
            if(level.selected){
                return level.value;
            }
        }
    }
    printLoseGame(secretWord){
        const finishDom = new DOMParser().parseFromString(`
            <h2>Вы проиграли, загаданное слово - ${secretWord}</h2>
        `, `text/html`);
        this.#finishGame(finishDom)
    }

    printWinGame(){
        const finishDom = new DOMParser().parseFromString(`
            <h2>Вы выиграли</h2>
        `, `text/html`);
        this.#finishGame(finishDom)

    }
    #finishGame(finishDom){
        this.lettersContainer.removeChild(this.lettersContainer.querySelector('div'));
        this.lettersContainer.appendChild(finishDom.querySelector('h2'))
    }

}