import prisma from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";

const getMyAddresses = async (userId) => {
  return await prisma.address.findMany({
    where: {
      userId,
    },
    orderBy: [
      { isDefault: "desc" },
      { createdAt: "desc" },
    ],
  });
};

const createAddress = async (userId, data) => {
  const {
    label,
    fullName,
    phone,
    houseNo,
    street,
    landmark,
    city,
    state,
    pinCode,
    isDefault,
  } = data;

  if (
    !fullName ||
    !phone ||
    !houseNo ||
    !street ||
    !city ||
    !state ||
    !pinCode
  ) {
    throw new ApiError(400, "Please fill all required address fields");
  }

  const shouldBeDefault = Boolean(isDefault);

  if (shouldBeDefault) {
    await prisma.address.updateMany({
      where: { userId },
      data: { isDefault: false },
    });
  }

  const existingAddresses = await prisma.address.count({
    where: { userId },
  });

  const address = await prisma.address.create({
    data: {
      userId,
      label: label?.trim() || "Home",
      fullName: fullName.trim(),
      phone: phone.trim(),
      houseNo: houseNo.trim(),
      street: street.trim(),
      landmark: landmark?.trim() || null,
      city: city.trim(),
      state: state.trim(),
      pinCode: pinCode.trim(),
      isDefault: existingAddresses === 0 || shouldBeDefault,
    },
  });

  return address;
};

const updateAddress = async (userId, addressId, data) => {
  const existingAddress = await prisma.address.findFirst({
    where: {
      id: addressId,
      userId,
    },
  });

  if (!existingAddress) {
    throw new ApiError(404, "Address not found");
  }

  const {
    label,
    fullName,
    phone,
    houseNo,
    street,
    landmark,
    city,
    state,
    pinCode,
    isDefault,
  } = data;

  if (
    !fullName ||
    !phone ||
    !houseNo ||
    !street ||
    !city ||
    !state ||
    !pinCode
  ) {
    throw new ApiError(400, "Please fill all required address fields");
  }

  if (Boolean(isDefault)) {
    await prisma.address.updateMany({
      where: {
        userId,
        id: { not: addressId },
      },
      data: {
        isDefault: false,
      },
    });
  }

  return await prisma.address.update({
    where: {
      id: addressId,
    },
    data: {
      label: label?.trim() || "Home",
      fullName: fullName.trim(),
      phone: phone.trim(),
      houseNo: houseNo.trim(),
      street: street.trim(),
      landmark: landmark?.trim() || null,
      city: city.trim(),
      state: state.trim(),
      pinCode: pinCode.trim(),
      isDefault: Boolean(isDefault),
    },
  });
};

const deleteAddress = async (userId, addressId) => {
  const address = await prisma.address.findFirst({
    where: {
      id: addressId,
      userId,
    },
  });

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  await prisma.address.delete({
    where: {
      id: addressId,
    },
  });

  return { message: "Address deleted successfully" };
};

export {
  getMyAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
};