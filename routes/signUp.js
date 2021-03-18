var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

let users = [
    {
        "email": "user1@test1.com",
        "password": "pass1"
    },
    {
        "email": "user2@test2.com",
        "password": "pass2"
    },
    {
        "email": "user3@test3.com",
        "password": "pass3"
    }
];

router.post('/', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        let emailExists = false;
        users.forEach(user => {
            if(user.email == email) {
                emailExists = true;
                return;
            }
        });
        if(!emailExists) {
            users.push({
                "email": email,
                "password": hashedPassword
            });
            res.send("Account created.");
            console.log(users);
        } else {
            res.send("Account already exists");
        }
    } catch {
        res.status(500).send();
    }
});

module.exports = router;