import { PrismaClient } from "@prisma/client";
import passport from "passport";
const prisma = new PrismaClient();

var GoogleStrategy = require("passport-google-oauth2").Strategy;

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
interface types {
  email: string;
  given_name: string;
  name: string;
  photos: any;
}
passport.use(
  new GoogleStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },

    async function (request, accessToken, refreshToken, profile, done: any) {
      console.log(profile);

      const { email, given_name, photos }: types = profile;
      const user = JSON.stringify({
        name: given_name,
        email: email,
        photo: photos[0].value,
      });
      console.log(user);

      const upsertUser = await prisma.user.upsert({
        where: {
          email: email,
        },
        update: {
          name: given_name,
        },
        create: {
          email: email,
          name: given_name,
          profilePicture: photos[0].value,
        },
      });

      return done(upsertUser);
    }
  )
);

module.exports = passport;



