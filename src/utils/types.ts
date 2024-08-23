import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
export type SetCookie = ReadonlyRequestCookies['set'];

export interface Message {
    messageId: number;
    roomId: number;
    sender: string;
    content: string;
    time: number;
}

export interface RoomPreviewInfo {
    roomId: number;
    roomName: string;
    lastMessage: Message | null;
}