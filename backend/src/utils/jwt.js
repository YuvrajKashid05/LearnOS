import crypto from "crypto";
import jwt from "jsonwebtoken";

const requiredSecrets = ["JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET"];

for (const key of requiredSecrets) {
  if (!process.env[key] || process.env[key].length < 32) {
    throw new Error(
      `Missing or weak environment variable: ${key} (must be set and at least 32 characters)`
    );
  }
}

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES,
  });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES,
  });
};

export const hashToken = (token) => {
   return crypto.createHash("sha256").update(token).digest("hex");
}

export const compareTokenHashes = (hashA, hashB) => {
  const bufA = Buffer.from(hashA || "", "hex");
  const bufB = Buffer.from(hashB || "", "hex");

  if (bufA.length !== bufB.length) return false;

  return crypto.timingSafeEqual(bufA, bufB);
}

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};