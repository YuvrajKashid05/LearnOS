import { deleteProfile, getProfile, updateProfile } from "../services/user.service.js";
import { clearRefreshTokenCookie } from "../utils/cookie.js";
import { sendSuccess } from "../utils/response.js";
import { updateAvatarSchema, updateProfileSchema } from "../validations/auth.validation.js";


export const userProfile = async (req, res, next) => {

    try {
        const user = await getProfile(req.user.id);

        return sendSuccess(
            res,
            "Profile fetched successfully ",
            user
        );  
    } catch (error) {
        return next(error);
    }
};

export const updateUser = async (req, res, next) => {

    try {
        const data = updateProfileSchema.parse(req.body);
        
        const user = await updateProfile(
            req.user.id,
            data,
        );

        return sendSuccess(
            res,
            "Profile updated successfully",
            user,
        );
    } catch (error) {
        return next(error);
    }
};

export const updateAvatar = async (req, res, next) => {

    try {
        const data = await updateAvatarSchema.parse(req.body);
        const user = await updateProfile(
            req.user.id,
            {
                avatar: data.avatar,
            }
        );

        return sendSuccess(
            res,
            "Avatar updated sucesfully",
            user
        );
        
    } catch (error) {
        return next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    
    try {
        await deleteProfile(req.user.id);

        clearRefreshTokenCookie(res);

        return sendSuccess(
            res,
            "User deleted successfully",
        );
    } catch (error) {
        return next(error);
    }
};