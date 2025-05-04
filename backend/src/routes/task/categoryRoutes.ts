import {} from "../../types/express";
import express from "express";
import User from "../../models/user/User";
import authMiddleware from "../../middleware/authMiddleware";
import asyncHandler from "../../types/asyncHandler";

const router = express.Router();

// GET /api/categories
router.get(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ categories: user.categories });
  })
);

// POST /api/categories
router.post(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    const { category } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!category || !category.trim()) {
      return res.status(400).json({ message: "Category is required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.categories.includes(category)) {
      user.categories.push(category);
      await user.save();
    }

    res.status(200).json({ categories: user.categories });
  })
);

// PUT /api/categories – uppdatera kategori
router.put(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    const { oldCategory, newCategory } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!oldCategory || !newCategory) {
      return res.status(400).json({ message: "Missing old or new category" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const index = user.categories.indexOf(oldCategory);
    if (index === -1) {
      return res.status(404).json({ message: "Old category not found" });
    }

    user.categories[index] = newCategory;
    await user.save();

    res.status(200).json({ categories: user.categories });
  })
);

// DELETE /api/categories – ta bort kategori
router.delete(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    const { category } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!category) return res.status(400).json({ message: "Category is required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.categories = user.categories.filter((c) => c !== category);
    await user.save();

    res.status(200).json({ categories: user.categories });
  })
);

export default router;
