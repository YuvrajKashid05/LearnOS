const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
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
