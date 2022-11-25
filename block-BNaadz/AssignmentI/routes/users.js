var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

    console.log(req.session);
    res.render('user', { title: 'Users' });
});
router.get('/logout', function(req, res) {
    req.session.destroy();
    res.clearCookie('connect.sid');
    return res.redirect('/login')
});

module.exports = router;