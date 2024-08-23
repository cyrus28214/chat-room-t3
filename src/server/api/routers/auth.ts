import { z } from "zod";

import { authProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { passwordSchema, usernameSchema } from "~/utils/schema";
import { TRPCError } from "@trpc/server";
import { comparePassword, generateToken, hashPassword } from "~/utils/crypto";

export const authRouter = createTRPCRouter({
    login: publicProcedure
        .input(z.object({
            username: usernameSchema,
            password: passwordSchema
        }))
        .mutation(async ({ ctx, input: { username, password } }) => {
            const user = await ctx.db.user.findFirst({
                where: {
                    name: username,
                }
            });
            if (!user || !comparePassword(password, user.password)) {
                throw new TRPCError({
                    message: "用户名或密码错误",
                    code: "BAD_REQUEST"
                });
            }
            const auth = { uid: user.id };
            const token = generateToken(auth);
            ctx.setCookie('token', token);
            return auth;
        }),

    register: publicProcedure
        .input(z.object({
            username: usernameSchema,
            password: passwordSchema
        }))
        .mutation(async ({ ctx, input: { username, password } }) => {
            const hashedPassword = hashPassword(password);
            const user = await ctx.db.user.create({
                data: {
                    name: username,
                    password: hashedPassword
                }
            });
            const auth = { uid: user.id };
            const token = generateToken(auth);
            ctx.setCookie('token', token);
            return auth;
        }),
    getUidFromToken: authProcedure
        .input(z.string())
        .query(async ({ ctx }) => {
            return ctx.auth.uid;
        })
})
