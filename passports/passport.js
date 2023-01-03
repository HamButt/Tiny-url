const passport = require('passport');
const {Users} =  require('../models')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;


//google

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET_KEY,
    callbackURL: process.env.CALLBACK_URL,
  },

       function(accessToken, refreshToken, profile, done) {
        //=== Integrating with database =====
        
        //  await Users.findOrCreate({where : {email: profile.email},
        //     defaults: {
        //       email: profile.email,
        //       name: profile.displayName,
        //       token: accessToken,
        //       image: profile._json.picture,
        //       provider: profile.provider,
        //       password: profile.password
        //     }
        //   })
          return done(null, profile)
        
          }
))

//github

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/auth/github/callback"
},
     async function(accessToken, refreshToken, profile, done) {
        await Users.findOrCreate({where : {name: profile.username},
      defaults: {
          name: profile.username,
          token: accessToken,
          image: profile._json.avatar_url,
          provider: profile.provider
          
        }
      })
      
      return done(null, profile)
}
));


  passport.serializeUser((user,done)=>{
      done(null,user)
  })
  passport.deserializeUser((user,done)=>{
      done(null,user)
  })