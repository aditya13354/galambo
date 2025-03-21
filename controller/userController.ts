import { Request, Response } from "express";
import User from "../models/User"; // Assuming a User model is set up

// Controller function to handle search
export const searchUsers = async (req: any, res: any) => {
  const { query } = req.query;
  console.log(req.user);
  try {
    // Build the query object to search by full name, case-insensitive
    const searchQuery = query
      ? { name: { $regex: query, $options: "i" }, _id: { $ne: req.user.id } } // Case-insensitive search by full name
      : { _id: { $ne: req.user.id } }; // If no query, return all users

    // Fetch users based on the search query or all users sorted alphabetically
    const users = await User.find(searchQuery)
      .sort({ name: 1 }) // Sort by full name in ascending order
      .limit(10); // Limit results for performance (adjust this as needed)

    res.json(users);
  } catch (error: any) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
export const updateProfile = async (req: any, res: any) => {
  try {
    const { bio, userId } = req.body; // Make sure userId is passed from the frontend
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    if (!userId) {
      return res.status(401).json({ message: "User ID not provided" }); // Unauthorized if no userId
    }

    // Find the user and update bio and photo
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (bio) user.bio = bio;
    if (photo) user.photo = photo;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      bio: user.bio,
      photo: user.photo,
    });
  } catch (error: any) {
    console.error("Error updating profile:", error);
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID not provided" });
    }

    // Fetch the user profile from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return profile data with a fallback for photo
    res.status(200).json({
      bio: user.bio,
      photo: user.photo,
    });
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
};
