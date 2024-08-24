import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
export type SetCookie = ReadonlyRequestCookies['set'];

export interface Message {
    id: number;
    roomId: number;
    sender: string;
    content: string;
    time: string; // ISO string
}

export interface RoomPreviewInfo {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
}