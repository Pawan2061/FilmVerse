const passport = require("../strategies/google-oauth");
exports.googleLogin = passport.authenticate("google", {
  scope: ["email", "profile"],
});
exports.googleCallback = passport.authenticate("google", {
  successRedirect: "/auth/google/success",
  failureRedirect: "/auth/google/failure",
});
