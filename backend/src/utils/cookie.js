const parseDurationToMs = (
    value = "7d"
) => {
    const match =
        /^(\d+)\s*(s|m|h|d|w)$/i.exec(
            value
        );

    if (!match) {
        return 7 * 24 * 60 * 60 * 1000;
    }

    const amount =
        Number(match[1]);

    const unit =
        match[2].toLowerCase();

    const multipliers = {
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000,
        w: 7 * 24 * 60 * 60 * 1000,
    };

    return amount * multipliers[unit];
};

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure:
        process.env.NODE_ENV === "production",
    sameSite:
        process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
    maxAge: parseDurationToMs(
        process.env.JWT_REFRESH_EXPIRES ||
        "7d"
    ),
};

export const setRefreshTokenCookie = (
    res,
    token
) => {
    res.cookie(
        "refreshToken",
        token,
        COOKIE_OPTIONS
    );
};

export const clearRefreshTokenCookie = (
    res
) => {
    res.cookie(
        "refreshToken",
        "",
        {
            ...COOKIE_OPTIONS,
            maxAge: 0,
        }
    );
};