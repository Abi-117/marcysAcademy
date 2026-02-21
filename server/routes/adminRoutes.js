// backend/routes/adminRoutes.js
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Dummy admin credentials (replace with DB lookup)
const ADMIN = { email: "admin@example.com", password: "admin123" };

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN.email && password === ADMIN.password) {
    // Generate JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

export default router;
