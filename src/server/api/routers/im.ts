import { z } from "zod";

import { authProcedure, createTRPCRouter } from "~/server/api/trpc";

export const imRouter = createTRPCRouter({
    getRooms: authProcedure
        .query(async ({ ctx }) => {
            const rooms = await ctx.db.room.findMany({
                orderBy: { createdAt: "desc" },
            });
            return rooms.map((room) => ({
                id: room.id,
                name: room.name,
            }));
        }),
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
    deleteRoom: authProcedure
        .input(z.object({
            id: z.number(),
        }))
        .mutation(async ({ ctx, input: { id } }) => {
            const user = ctx.auth.uid;
            const room = await ctx.db.room.findUnique({
                where: { id },
            });
            if (!room) {
                throw new Error("找不到指定的房间");
            }
            if (room.ownerId !== user) {
                throw new Error("你不是房主，不能删除房间");
            }
            await ctx.db.room.delete({
                where: { id },
            });
            return null;
        }),
    sendMessage: authProcedure
        .input(z.object({
            roomId: z.number(),
            content: z.string(),
        }))
        .mutation(async ({ ctx, input: { roomId, content } }) => {
            const senderId = ctx.auth.uid;

            const room = await ctx.db.room.findUnique({
                where: { id: roomId },
            });
            if (!room) {
                throw new Error("找不到指定的房间");
            }

            const message = await ctx.db.message.create({
                data: {
                    roomId,
                    senderId,
                    content,
                },
            });

            return {
                id: message.id
            };
        }),
    getMessagesByRoom: authProcedure
        .input(z.object({
            roomId: z.number(),
        }))
        .query(async ({ ctx, input: { roomId } }) => {
            const messages = await ctx.db.message.findMany({
                where: { roomId },
                orderBy: { createdAt: "asc" },
                include: {
                    sender: {
                        select: {
                            name: true,
                        }
                    }
                }
            });
            return messages.map((message) => {
                return {
                    id: message.id,
                    roomId: message.roomId,
                    content: message.content,
                    sender: message.sender?.name,
                    time: message.createdAt.toISOString(),
                };
            });
        }),
});
