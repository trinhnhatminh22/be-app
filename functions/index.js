const functions = require("firebase-functions");
var express = require('express');
var app = express();

const { getUserInfomation, createUserInfo, getAllData } = require ('./utils/userInfo');


app.get('/getInfo', getUserInfomation);

app.post('/createUser', createUserInfo);

app.get('/getAllData', getAllData);

exports.api = functions.https.onRequest(app);