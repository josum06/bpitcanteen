const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/userModel");
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route that Google redirects to
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { user, token } = req.user;
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Remove password field if it exists
    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;
    // Return JWT token to the client
    res.cookie("token", token, {
      secure: true, // ✅ Required for HTTPS
      httpOnly: false, // ❌ If you need to read it in frontend JS, set to false
      sameSite: "None", // ✅ Required for cross-site cookies
    });
    
    res.redirect(
      `${process.env.FRONTEND_URL}/snacks?token=${token}&user=${encodeURIComponent(
        JSON.stringify(userWithoutPassword)
      )}`
    );
  }
);

module.exports = router;
