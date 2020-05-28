const express = require("express");
const path = require('path');
const bodyparser = require('body-parser');
const upload = require('express-fileupload');
const expressHandlebars = require("express-handlebars");
const app = express();
const {processJpg,processPng} = require('./server/server')
//const uploadRoutes = require('./routes/routes.js')
app.use(upload());
app.use('/',express.static('static'));
app.use(express.static('./server/solutions'))
app.use(bodyparser.urlencoded({
    extended : true
}));
app.set('views', path.join(__dirname,'/views/'));

app.engine('hbs',expressHandlebars({
    extname : 'hbs',
    defaultLayout : 'mainlayout',
    layoutsDir : __dirname + '/views/layouts'
}))

app.set("view engine","hbs");


//Getting
app.get('/upload',(req,res) => {
    res.sendFile(path.join(__dirname+'/static/static.html'));
});

//Setting
let gblimg;
app.post('/upload',(req,res) => {
    let image;
    let imgpos;
    if (req.files&&req.body) {
        image=req.files.file;
        imgpos=req.body;
        gblimg=image;
    }
    if (image.mimetype === 'image/jpeg') {
        let result=processJpg(image,imgpos);
        if (result==true) {
            res.redirect('/result');//,{src:'output-'+image.name});   
        }else{res.render('error');}
          
    }else if(image.mimetype === 'image/png') {
        //let result= processPng(image,imgpos);
        //if (result==true) {
            //res.redirect('/result');   
        //}else{res.render('error');}
        res.send('error');
    }else{
        res.render('error');
    }
});

//Getting
app.get('/result',(req,res) => {
    res.render('result');
});
//Setting
app.post('/result',(req,res) => {
    if (gblimg.mimetype=='image/jpeg') {
        res.render('result',{src:'output-'+gblimg.name});
    } else {
        let newname=gblimg.name.substring(0,gblimg.name.indexOf('.'))+'.jpg';
        res.render('result',{src:'output-'+newname});
    }
    
});








//app.use('/mazesolver',uploadRoutes);
app.listen("3000",()=>{
    console.log("server started")
});