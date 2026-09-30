import prisma from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const defaultSettings = {
  storeInfo: {
    name: "Chhimwal Sweets",
    email: "",
    phone: "",
    address: "",
  },

  contactInfo: {
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    whatsapp: "",
  },

  seo: {
    title: "",
    description: "",
  },

  policies: {
    shipping: "",
    refund: "",
  },

  hours: [
    { day: "Monday", open: "09:00", close: "21:00", isClosed: false },
    { day: "Tuesday", open: "09:00", close: "21:00", isClosed: false },
    { day: "Wednesday", open: "09:00", close: "21:00", isClosed: false },
    { day: "Thursday", open: "09:00", close: "21:00", isClosed: false },
    { day: "Friday", open: "09:00", close: "21:00", isClosed: false },
    { day: "Saturday", open: "10:00", close: "22:00", isClosed: false },
    { day: "Sunday", open: "10:00", close: "20:00", isClosed: false },
  ],
};

const getSettings = asyncHandler(async (req, res) => {
  let settings = await prisma.storeSettings.findFirst();

  if (!settings) {
    settings = await prisma.storeSettings.create({
      data: defaultSettings,
    });
  }

  return res.status(200).json({
    success: true,
    data: settings,
    message: "Settings fetched successfully",
  });
});

const updateSettings = asyncHandler(async (req, res) => {
  const {
    storeInfo,
    contactInfo,
    seo,
    policies,
    hours,
  } = req.body;

  let settings = await prisma.storeSettings.findFirst();

  const data = {
    storeInfo: storeInfo || defaultSettings.storeInfo,
    contactInfo: contactInfo || defaultSettings.contactInfo,
    seo: seo || defaultSettings.seo,
    policies: policies || defaultSettings.policies,
    hours: hours || defaultSettings.hours,
  };

  if (settings) {
    settings = await prisma.storeSettings.update({
      where: { id: settings.id },
      data,
    });
  } else {
    settings = await prisma.storeSettings.create({
      data,
    });
  }

  return res.status(200).json({
    success: true,
    data: settings,
    message: "Settings saved successfully",
  });
});

export {
  getSettings,
  updateSettings,
};