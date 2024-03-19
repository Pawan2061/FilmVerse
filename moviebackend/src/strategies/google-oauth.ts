import passport from "passport";

var GoogleStrategy = require("passport-google-oauth2").Strategy;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
passport.use(
  new GoogleStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      const { email, name, photos } = profile;
      const user = {
        name: name.givenName,
        email: email,
        photo: photos[0].value,
      };
      console.log(user);

      return done({
        name: user.name,
        email: user.email,
        photo: user.photo,
      });
    }
  )
);
module.exports = passport;
