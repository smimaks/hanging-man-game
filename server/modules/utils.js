const fs = require('fs/promises');
const path = require("path");


const readDataFromDb = async (path) => {

    try {
        const data =  JSON.parse((await fs.readFile(path)).toString());
        if(!Array.isArray(data)) {
            throw new Error("is not array");

        } return data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

const writeFileInDb = async (path, data) => {
   await fs.writeFile(path, JSON.stringify(data, null, 4));
}


const generateStrForToken = () => Math.random().toString(36).substr(2, 9);



module.exports = {readDataFromDb, generateStrForToken, writeFileInDb}