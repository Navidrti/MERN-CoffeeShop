// src/utils/token.js
import jwt from 'jsonwebtoken';

export const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};
