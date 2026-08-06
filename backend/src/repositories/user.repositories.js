import prisma from "../config/db.js";

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};

export const updateRefreshToken = async (id, refreshToken) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      refreshToken,
    },
  });
};

export const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    }
  });
};