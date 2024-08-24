import type { RoomPreviewInfo } from "~/utils/types";
import Avatar from "./Avatar";
import { randomColor } from "~/utils/random";
import { SolidXmark } from "./icons";
import { type ReactNode, useEffect, useState } from "react";

interface RoomItemProps {
    room: RoomPreviewInfo,
    onClickDelete?: () => void,
    onClick?: () => void,
    active?: boolean
}

// 特性：文字长度具有一定灵活性，当文字过长时，会自动省略，并显示省略号
export function RoomItem({ room, onClick, onClickDelete, active }: RoomItemProps) {
    // const msg = room.lastMessage;
    // const msgStr = msg ? `${msg.sender} : ${msg.content}` : '';
    const msgStr = '';
    const [avatarColor, setAvatarColor] = useState('');
    useEffect(() => {
        async function getColor() {
            const color = await randomColor(room.id.toString());
            setAvatarColor(color);
        }
        void getColor();
    }, [room.id]);

    return (<li><div className={`flex w-full justify-between group ${active ? 'active' : ''} py-3`}
        onClick={onClick}>
        <div className="w-12 flex justify-center shrink-0">
            <Avatar color={avatarColor} />
        </div>
        <div className='min-w-0 flex-grow flex flex-col ms-2'
            title={room.name + '\n' + msgStr}
        >
            <div className='text-base h-6 ellipsis'>{room.name}</div>
            <div className='opacity-60 h-5 ellipsis' > {msgStr} </div>
        </div >
        <SolidXmark className='-me-2 fill-current btn btn-sm btn-circle btn-ghost p-1 hidden group-hover:block'
            onClick={(e) => {
                onClickDelete?.();
                e.stopPropagation();
            }}
        />
    </div></li>);
}

interface RoomListProps {
    children?: ReactNode;
};

export function RoomList({ children }: RoomListProps) {
    return (<ul className='menu h-full flex-nowrap'>
        {children}
    </ul>);
}