var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
const config = require("./config");

firebase.initializeApp(config);

const { admin, db } = require('./admin');
const { validateSignupData } = require('./validation');

exports.createUserInfo = (req, res) => {
    const newUser = {
        email: req.body.email,
        location: req.body.location,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
    };

    const { valid, errors } = validateSignupData(newUser);

    if (!valid) return res.status(400).json(errors);

    db.doc(`/users/${newUser.email}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return res
                    .status(400)
                    .json({ errors: "this email have already taken" });
            } else {
                return db.doc(`/users/${newUser.email}`).set(newUser);
            }
        })
        .then(() => {
            return res.status(201).json({ messages: "Create user success" });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ errors: "Errors: Something wrong, try again" });
        });
}

exports.getUserInfomation = (req, res) => {
    db.collection('users').get()
    .then(doc => {
        let userData = [];
        doc.forEach(data => {
                userData.push({
                    email: data.data().email,
                    location: data.data().location,
                    phoneNumber: data.data().phoneNumber,
                    fullName: data.data().fullName
                })
            })
            return res.json(userData);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ errors: `Errors: ${err.code}` });
        });
}

exports.getAllData = (req,res)  => {
    db.collection('users').get()
    .then( data => {
        return res.status(400).json(data.size);
    }).catch(err => {
        console.log(err);
        return res.status(500).json({errors:err.code});
    })
}