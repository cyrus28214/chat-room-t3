import { authProcedure, createTRPCRouter } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    getUserInfo: authProcedure
        .query(async ({ ctx }) => {
            const user = await ctx.db.user.findUnique({
                where: { id: ctx.auth.uid }
            });
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        })
})
