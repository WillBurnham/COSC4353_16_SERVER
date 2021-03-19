var express = require('express');
const { ViewModuleSharp } = require('@material-ui/icons');
var router = express.Router();

router.post('/', (req, res, next) => {
    const {gallons, date} = req.body;
    console.log(gallons);
    console.log(date);
    let response = {
        address: '123 Temporary Address Ln',
        suggestedPrice: '1000.00',
        amountDue: '1000.00'
    };
    res.send(response);
});

module.exports = router;