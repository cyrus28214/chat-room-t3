import bcrypt from "bcryptjs";
import type { AuthSchema } from "./schema";
import jwt from "jsonwebtoken";
import { env } from "~/env";

export function hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
}

export function generateToken(auth: AuthSchema, options?: jwt.SignOptions): string {
    return jwt.sign(auth, env.JWT_SECRET, { expiresIn: "4h", ...options });
}

export function verifyToken(token: string): AuthSchema {
    return jwt.verify(token, env.JWT_SECRET) as AuthSchema;
}