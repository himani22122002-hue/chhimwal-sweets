import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {
  getMyAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../services/address.service.js";

const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await getMyAddresses(req.user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      addresses,
      "Addresses fetched successfully"
    )
  );
});

const addAddress = asyncHandler(async (req, res) => {
  const address = await createAddress(
    req.user.id,
    req.body
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      address,
      "Address added successfully"
    )
  );
});

const editAddress = asyncHandler(async (req, res) => {
  const address = await updateAddress(
    req.user.id,
    req.params.id,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      address,
      "Address updated successfully"
    )
  );
});

const removeAddress = asyncHandler(async (req, res) => {
  const result = await deleteAddress(
    req.user.id,
    req.params.id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      result,
      "Address deleted successfully"
    )
  );
});

export {
  getAddresses,
  addAddress,
  editAddress,
  removeAddress,
};