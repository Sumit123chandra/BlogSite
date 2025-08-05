const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware")

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

router.get("/me", verifyToken, (req, res) => {
  res.json(req.user); // Sends back the decoded JWT (e.g., userId, iat, exp)
});

module.exports = router;
