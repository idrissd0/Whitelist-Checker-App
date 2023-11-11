const router = require('express').Router();
const passport = require('passport');

// router.get('/redirect',  passport.authenticate('discord', {
//     failureRedirect: '/forbidden'
// }), (req, res) => {
//     res.send(200);
// })

// router.get('/secretstuff', (req, res) => {
//     res.json({
//         message: 'Welcome to the secret stuff page!'
//     });
// });

router.get('/',  passport.authenticate('discord', {
    successRedirect: '/discord/callback',
    failureRedirect: '/failure'
}), function(req, res) {
    res.redirect('/secretstuff') // Successful auth
    console.Consolelog(res)
});

router.get("/failure", (req, res) => {
    res.json({
        message: "Not logged in"
    })
})

router.get("/discord/callback", (req, res) => {
    res.json({
        message: "Successfully Logged In"
    })
})

// router.get('/discord/callback', passport.authenticate('discord', {
//     successRedirect: '/discord/callback',
//     failureRedirect: '/failure'
// }), function(req, res) {
//     res.redirect('/secretstuff') // Successful auth
// });

module.exports = router;