var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
    const {gallons, date} = req.body;
    // console.log(gallons);
    // console.log(date);
    let response = {
        address: '123 Temporary Address Ln',
        suggestedPrice: '1000.00',
        amountDue: '1000.00'
    };
    res.json(response);
});

router.get('/', (req, res, next) => {
    res.json({
        gallonsRequested: 100,
        address: '123 Temporary Address Ln',
        suggestedPrice: '1000.00',
        amountDue: '1000.00'
    });
});

module.exports = router;