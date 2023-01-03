const passport = require('passport')
const router = require('express').Router()


router.get('/login/data', async (req, res) =>{
   
    try {
        if(req.user.provider === 'google'){
            console.log(req.user._json?.picture);
            return res.status(200).json({
                picture : req.user._json?.picture,
                name: req.user?.displayName,
                provider: req.user.provider
            })
        }
        else if(req.user.provider === 'github'){
            return res.status(200).json({
                picture : req.user._json?.avatar_url,
                name: req.user?.username,
                provider: req.user?.provider
            })
        }
        else {
            return res.status(406).json({})
        }
    } catch (error) {
        return res.status(401).json({
              error: error
        })
    }
 
})

router.get('/google', passport.authenticate("google", {scope: [ 'email', 'profile' ]}))

router.get('/google/callback', passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: process.env.CLIENT_FAILURE_URL,
}))


router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', passport.authenticate('github', { 
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: process.env.CLIENT_FAILURE_URL 
}));    

router.get('/logout', (req, res) =>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect(process.env.CLIENT_SIGN_OUT_URL)
     })
})

module.exports = router