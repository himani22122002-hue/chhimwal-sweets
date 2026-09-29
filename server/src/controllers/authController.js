import bcrypt from "bcrypt";

import prisma from "../config/db.js";

import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { generateToken } from "../utils/generateToken.js";


const register = asyncHandler(async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  if (!fullName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  if (password.length < 8) {
    throw new ApiError(400, "Password must be at least 8 characters");
  }

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      phone,
      password: hashedPassword,
    },
  });

  const token = generateToken(user.id);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      "Registration successful"
    )
  );
});


const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user.id);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      "Login successful"
    )
  );
});


const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json(
    new ApiResponse(200, {}, "Logged out successfully")
  );
});


const getMe = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, req.user, "User profile")
  );
});


const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, phone } = req.body;

  if (!fullName || !fullName.trim()) {
    throw new ApiError(400, "Full name is required");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      fullName: fullName.trim(),
      phone: phone?.trim() || null,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
    },
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      updatedUser,
      "Profile updated successfully"
    )
  );
});


const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });

  if (!(await bcrypt.compare(oldPassword, user.password))) {
    throw new ApiError(400, "Invalid old password");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: req.user.id },
    data: {
      password: hashedPassword,
    },
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Password changed successfully"
    )
  );
});


export {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
};