const express = require('express');
const router = express.Router();

//get home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Farm Voyage' });
});

//home to main search
router.get('/main', (req, res) => {
    res.render('main', {
    message: req.flash("error"),
	});
});

module.exports = router;
