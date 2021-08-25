const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs/promises');
const {wordsService, usersService, validator}  = require('./DI');
const {log} = require("nodemon/lib/utils");

//Найти вариант рендерить HTML страницы с бэка

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.resolve(__dirname, '../public')));
app.set("view engine", "html");
const port = 3000;

//Отобюражение времени и метода запролса с клиента
app.use((req, res, next) => {
    console.log(`[${new Date(Date.now()).toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
    next();
});

const validateToken =  async (req, res, next) => {

    if(!req.get('Authorization')) {
        console.log(req.get);
        res.status(401).json({
            type: 'error',
            message: 'Yanki, go home!'
        })

    } else {

        const token = req.get('Authorization').split(' ')[1];
        const foundedUser = await usersService.findUserByToken(token);

        if (foundedUser) {
            req.user = foundedUser;
            next();
        } else {
            res.status(403).json({
                type: 'error',
                message: 'Not Authorized!'
            })
        }

    }
}


const publicHtmlPath = path.resolve(__dirname, '../public/html')

app.post('/registration', async (req, res) => {
    try{
        const {
            body: {username, password}
        } = req;

        validator.validateUser(username, password);

        const token = await usersService.addUser(username, password);
        res.json({token});
    //send html profile
    } catch(err){
        res.status(400).json({
            type: 'error',
            message: err.message
        })
    }
});

app.get("/profile", validateToken, (req, res ) => {
    res.json({username: req.user.username})
})

app.post('/auth', async (req, res) => {
try {
    const {
        body: {username, password}
    } = req;

    validator.validateUser(username, password);

  const token = await usersService.authUser(username, password);
  res.json({token})
} catch(err){
    res.status(400).json({
        type: 'error',
        message: err.message
    })
}
});

app.get('/:level/word', validateToken, async (req, res) => {
 try {
     const level = req.params.level;
     const word = await wordsService.getWord(level);
     res.json({word})
 } catch (err) {
     res.status(400).json({
         type: 'error',
         message: err.message
     })
 }
});

app.post('/post-statistics', validateToken, async (req, res) =>{
    try {
        const token = req.get('Authorization').split(' ')[1];
        const user = await usersService.addStatistics(token, req.body);


        res.json(user);
    } catch(err){
        res.status(400).json({
            type: 'error',
            message: err.message
        })
    }
});

app.get('/user/statistics', validateToken, async (req, res) => {

    res.json(req.user.statistics)
} )

app.get('/validate-token', validateToken, (req, res) => {
    res.json({validate: true})
})

app.listen(port, ()=> console.log('server was started'));