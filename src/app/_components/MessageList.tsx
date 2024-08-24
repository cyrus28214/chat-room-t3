import { useRamdomColor } from "~/utils/random";
import type { Message } from "~/utils/types";
import Avatar from "./Avatar";
import { type ReactNode } from "react";

interface MessageItemProps {
    message: Message;
    putEnd?: boolean;
}

export function MessageItem({
    message: { sender, content, time },
    putEnd,
}: MessageItemProps) {
    const chatCls = putEnd ? 'chat-end' : 'chat-start';
    const avatarColor = useRamdomColor(sender);

    return (
        <div className={`chat ${chatCls}`}>
            <div className="w-10 chat-image">
                <Avatar color={avatarColor} />
            </div>
            <div className="chat-header">
                <div className="flex items-center">
                    <p className='shrink max-w-36 ellipsis' title={sender}>{sender}</p>
                    <time className="ms-2 text-xs opacity-50">{new Date(time).toLocaleString()}</time>
                </div>
            </div>
            <div className="chat-bubble text-wrap break-words whitespace-pre">
                {content}
            </div>
        </div>);
}

export default function MessageList({ children }: { children: ReactNode }) {
    return (<div className='h-full'>
        {children}
    </div>);
}