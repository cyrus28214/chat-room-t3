import type { RoomPreviewInfo } from "~/utils/types";
import Avatar from "./Avatar";
import { randomColor } from "~/utils/random";
import { SolidXmark } from "./icons";
import { useEffect, useState } from "react";

interface RoomItemProps {
    room: RoomPreviewInfo,
    onRoomDelete?: () => void,
    onRoomActivate?: () => void,
    cls?: string
}

// 特性：文字长度具有一定灵活性，当文字过长时，会自动省略，并显示省略号
export function RoomItem({ room, onRoomDelete, onRoomActivate, cls }: RoomItemProps) {
    const msg = room.lastMessage;
    const msgStr = msg ? `${msg.sender} : ${msg.content}` : '';
    const [avatarColor, setAvatarColor] = useState('');
    useEffect(() => {
        async function getColor() {
            const color = await randomColor(room.roomId.toString());
            setAvatarColor(color);
        }
        void getColor();
    }, [room.roomId]);

    return (<div className={`flex w-full justify-between group ${cls} py-3`}
        onClick={onRoomActivate}>
        <div className="w-12 flex justify-center shrink-0">
            <Avatar color={avatarColor} />
        </div>
        <div className='min-w-0 flex-grow flex flex-col ms-2'
            title={room.roomName + '\n' + msgStr}>
            <div className='text-base h-6 ellipsis'>{room.roomName}</div>
            <div className='opacity-60 h-5 ellipsis' > {msgStr} </div>
        </div >
        <SolidXmark className='-me-2 fill-current btn btn-sm btn-circle btn-ghost p-1 hidden group-hover:block'
        // onClick={(e) => {
        //     onRoomDelete();
        //     e.stopPropagation();
        // }}
        />
    </div>
    );
}

export function RoomList() {
    const rooms = [
        {
            roomId: 1,
            roomName: 'Room 1',
            lastMessage: null
        },
        {
            roomId: 2,
            roomName: 'Room 2',
            lastMessage: null
        }
    ]

    return (<ul className='menu h-full flex-nowrap'>
        {rooms.map((room) => (
            <li key={room.roomId}>
                <RoomItem
                    room={room}
                />
            </li>
        ))}
        {/* <RoomDeleteConfirm
            show={showDeleteModal}
            room={deleteTarget!}
            onClose={() => setShowDeleteModal(false)} /> */}
    </ul>);
}