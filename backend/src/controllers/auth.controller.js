import { getCurrentUser, loginUser, refreshUserToken, registerUser, } from "../services/auth.service.js";
import { setRefreshTokenCookie } from "../utils/cookie.js";
import { sendSuccess } from "../utils/response.js";
import { loginSchema, registerSchema } from "../validations/auth.validation.js";

export const register = async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);

    const result = await registerUser(data);

    setRefreshTokenCookie(res, result.refreshToken);
   
    return sendSuccess(
      res,
      "User registered successfully", {
        user: result.user,
        accessToken: result.accessToken,
    },

      201
    );
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {

  try {
    const data = loginSchema.parse(req.body);

    const result = await loginUser(data);

    setRefreshTokenCookie(res, result.refreshToken);

    return sendSuccess(
      res,
      "Login successful",
      {
        user: result.user,
        accessToken: result.accessToken,
      },
      201,
    );
    
  } catch (error) {
    return next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user.id);

    return sendSuccess(
      res,
      "User fetched successfully",
      { user },
      200
    );
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const incomingToken = req.cookies?.refreshToken;

    const result = await refreshUserToken(incomingToken);

    setRefreshTokenCookie(res, result.refreshToken);

    return sendSuccess(
      res,
      "Token refreshed Successfully", {
        accessToken: result.accessToken,
      }
    )
  } catch (error) {
    return next(error);
  }
}