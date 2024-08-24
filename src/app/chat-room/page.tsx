"use client";

import React, { useEffect, useState } from "react";
import { SolidPlus } from "../_components/icons";
import RoomAddModal from "../_components/RoomAddModal";
import { RoomItem, RoomList } from "../_components/RoomList";
import cn from "classnames";
import { api } from "~/trpc/react";
import NoticeModal from "../_components/modal/NoticeModal";
import ConfirmModal from "../_components/modal/ConfirmModal";
import type { User, RoomPreviewInfo } from "~/utils/types";
import { atom, useAtom } from "jotai";
import { ChatInput } from "../_components/ChatInput";
import MessageList, { MessageItem } from "../_components/MessageList";

interface Modal {
    title: string;
    message: string
};
const modalAtom = atom<Modal | null>(null);
const activeRoomAtom = atom<RoomPreviewInfo | null>(null);

function useRoomApi() {
    const { data: rooms, refetch: refetchRooms } = api.im.getRooms.useQuery();
    const setModal = useAtom(modalAtom)[1];
    const { mutate: deleteRoom } = api.im.deleteRoom.useMutation({
        onError: (e) => {
            setModal({ title: '删除房间失败', message: e.message });
        },
        onSuccess: () => {
            void refetchRooms();
        }
    });

    const { mutate: createRoom } = api.im.createRoom.useMutation({
        onError: (e) => {
            setModal({ title: '创建房间失败', message: e.message });
        },
        onSuccess: (data) => {
            void refetchRooms();
            setModal({ title: '创建房间成功', message: `创建房间“${data.name}”成功` });
        }
    });

    return {
        rooms,
        refetchRooms,
        deleteRoom,
        createRoom,
    }
}
function useActiveRoom() {
    const [activeRoom, setActiveRoom] = useAtom(activeRoomAtom);
    const { rooms } = useRoomApi();
    useEffect(() => {
        if (rooms?.find((room) => room.id === activeRoom?.id)) {
            return;
        }
        setActiveRoom(null);
    }, [rooms, activeRoom, setActiveRoom]); //在房间列表更新的同时，检查当前房间是否仍然存在
    return [activeRoom, setActiveRoom] as const;
}

function SideBar() {
    const toolItemClass = 'menu-item tooltip';
    const toolBtnClass = 'btn btn-sm btn-circle btn-ghost p-1';

    const [roomAddShow, setRoomAddShow] = useState(false);
    const [activeRoom, setActiveRoom] = useActiveRoom();
    const roomApi = useRoomApi();

    const [deleteRoom, setDeleteRoom] = useState<RoomPreviewInfo | null>(null);
    const [deleteRoomNameMessage, setDeleteRoomNameMessage] = useState('');
    useEffect(() => {
        if (deleteRoom) {
            setDeleteRoomNameMessage(`确定要删除“${deleteRoom.name}”房间吗？`);
        }
    }, [deleteRoom]);

    function handleRoomAddSubmit(name: string) {
        roomApi.createRoom({ name });
        setRoomAddShow(false);
    }

    return (<div className='flex flex-col h-full bg-base-200'>
        <div className='flex-1 overflow-y-auto'>
            <RoomList>
                {(roomApi.rooms ?? [])
                    .map((room) => (
                        <RoomItem
                            room={room}
                            onClick={() => setActiveRoom(room)}
                            onClickDelete={() => setDeleteRoom(room)}
                            key={room.id}
                            active={room.id === activeRoom?.id}
                        />))
                }
            </RoomList>
        </div>
        <ul className='menu menu-horizontal justify-end space-x-3'>
            <li className={toolItemClass} data-tip='新建房间'>
                <SolidPlus className={cn(toolBtnClass, 'fill-current')}
                    onClick={(e) => {
                        e.preventDefault();
                        setRoomAddShow(true);
                    }} />
            </li>
        </ul>
        <RoomAddModal
            show={roomAddShow}
            onClose={() => setRoomAddShow(false)}
            onSubmit={handleRoomAddSubmit}
        />
        <ConfirmModal
            show={deleteRoom !== null}
            onCancel={() => setDeleteRoom(null)}
            onConfirm={() => {

                const id = deleteRoom?.id;
                if (id) {
                    setDeleteRoom(null);
                    roomApi.deleteRoom({ id });
                }
            }}
            title='删除房间'
            message={deleteRoomNameMessage}
        />
    </div>);
}

function RoomEntry({ activeRoom }: { activeRoom: RoomPreviewInfo }) {
    const setModal = useAtom(modalAtom)[1];
    const { data: user } = api.user.getUserInfo.useQuery();

    const [messageToSend, setMessageToSend] = useState('');
    const { data: messages } = api.im.getMessagesByRoom.useQuery({
        roomId: activeRoom.id
    });

    const { refetch: refetchMessages } = api.im.getMessagesByRoom.useQuery({
        roomId: activeRoom.id,
    });
    const { mutate: sendMessage } = api.im.sendMessage.useMutation({
        onError: (e) => {
            setModal({ title: '发送失败', message: e.message });
        },
        onSuccess: () => {
            void refetchMessages();
            setMessageToSend('');
        }
    });

    function onSubmit() {
        sendMessage({
            roomId: activeRoom.id,
            content: messageToSend
        });
    }
    return <div className='h-full flex flex-col'>
        <div className='h-16 px-6 shadow-md flex items-center'>
            <h2 className='text-lg font-bold ellipsis'
                title={activeRoom.name ?? ''}>
                {activeRoom.name ?? ''}
            </h2>
        </div>
        <div className='flex-1 overflow-y-scroll overflow-x-hidden'>
            <div className='px-6 py-4'>
                <MessageList>{(messages ?? []).map((msg) =>
                    <MessageItem key={msg.id} message={msg} putEnd={msg.sender === user?.name} />
                )}</MessageList>
            </div>
        </div>
        <div className='px-6 pb-6'>
            <ChatInput
                value={messageToSend}
                onChange={(e) => setMessageToSend(e.target.value)}
                onSubmit={onSubmit}
                disabled={messageToSend.trim().length === 0}
            />
        </div>
    </div>;
}

export default function ChatRoomPage() {
    const [activeRoom] = useAtom(activeRoomAtom);
    const [modal, setModal] = useAtom(modalAtom);

    return <div className='h-screen flex overflow-hidden'>
        <div className='h-full w-56 md:w-72 lg:w-96'>
            <SideBar />
        </div>
        <div className='h-full flex-1 min-w-0'>
            {activeRoom && <RoomEntry activeRoom={activeRoom} />}
        </div>
        {modal && <NoticeModal
            show={modal !== null}
            title={modal.title}
            message={modal.message}
            onClose={() => setModal(null)}
        />}
    </div>
}