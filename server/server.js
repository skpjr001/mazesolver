const jimp = require('jimp');
const util =require('util');
const execFile = util.promisify(require('child_process').execFile);
const exec = util.promisify(require('child_process').exec);
const {
    promises: fsPromises,
    constants: {
      COPYFILE_EXCL
    }
  } = require('fs');

//PNG TO JPG Conversion 
async function toJpg(src,name) {
     await jimp.read(src).then((image) => {
        image.writeAsync(__dirname+`/${name}`)
    });
    console.log('inside tojpg func');
}

//Console mazesolver program
async function solve(...args) {
    await execFile("./MazeSolver", [`${args[0]}`,`${args[1]}`,`${args[2]}`,`${args[3]}`,`${args[4]}`],{cwd:__dirname})
    .catch((err) => {
        console.log('ERROR @ SOLVE: ',err);
    });
    console.log('inside solve func');
}

// Removing file after finding solution
async function remove(name) {
    await exec(`rm -rf ${name} output-${name}`,{cwd:__dirname})
    .catch((err) => {
        console.log('ERROR @ REMOVE: ',err);
    });
    console.log('inside remove func');
}
        
// Copy function for files
async function copy(name) {
    await fsPromises.copyFile(__dirname+`/output-${name}`,__dirname+`/solutions/output-${name}`)
    .catch((err) => {
        console.log('ERROR @ COPY: ',err);
    });
    console.log('inside copy func');
}

//solve('output.jpg','120','9','570','563');

function processJpg(image,imgpos) {
    let condition=true;
    image.mv(__dirname+`/${image.name}`,(err) => {
        if (!err) {
            solve(`${image.name}`,`${imgpos.startX}`,`${imgpos.startY}`,`${imgpos.endX}`,`${imgpos.endY}`)
            .then(() => {
                copy(image.name);   
            })
            .then(() => {
                remove(image.name);
            })
            .catch((err) => {
                console.log('ERROR: ',err);
                condition = false;
            });
        } else {
            condition=false;
        }
    });
    return condition;
}
console.log(__dirname);
function processPng(image,imgpos) {
    let condition=true;
    let dest=image.name.substring(0,image.name.indexOf('.'));
    let newDest=dest+'.jpg';
    console.log(newDest);
    image.mv(__dirname+`/png/${image.name}`,(err) => {
        if (!err) {
            toJpg(__dirname+`/png/${image.name}`,newDest)
            .then(() => {
                solve(`${newDest}`,`${imgpos.startX}`,`${imgpos.startY}`,`${imgpos.endX}`,`${imgpos.endY}`);
            })
            .then(() => {
                copy(newDest);
            })
            .then(() => {
                remove(newDest);
            })
            .catch(() => {
                condition=false;
            });
        } else {
            condition=false;
        }
    });
    return condition;
}




module.exports = {processJpg,processPng};