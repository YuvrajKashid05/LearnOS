import ms from "ms";

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: ms(process.env.JWT_REFRESH_EXPIRES || "7d"),
};


export const setRefreshTokenCookie = (res, token) => {
    res.cookie("refreshToken", token, COOKIE_OPTIONS);
};

export const clearRefreshTokenCookie = (res) => {
    res.cookie("refreshToken", "", {
        ...COOKIE_OPTIONS,
        maxAge: 0
    });
};
