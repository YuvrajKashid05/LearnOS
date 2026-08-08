import { deleteUserProfile, getUserProfile, updateUserProfile } from "../repositories/user.repositories.js";
import AppError from "../utils/AppError.js";

export const getProfile = async (id) => {
    const user = await getUserProfile(id);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return user;
};

export const updateProfile = async (id, data) => {
    const user = await getUserProfile(id);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return updateUserProfile(id, data);
};

export const deleteProfile = async (id) => {
    const user = await getUserProfile(id);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    await deleteUserProfile(id);

    return true;
};