import { z } from "zod";

import { authProcedure, createTRPCRouter } from "~/server/api/trpc";

export const imRouter = createTRPCRouter({
    createRoom: authProcedure
        .input(z.object({
            name: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            const { name } = input;
            const user = ctx.auth.uid;
            const room = await ctx.db.room.create({
                data: { name, ownerId: user },
            });
            return {
                id: room.id,
                name: room.name,
            }
        }),
})
