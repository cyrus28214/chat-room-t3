"use client";

import { useState } from "react";
import Modal from "./modal/Modal";

interface RoomAddModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (roomName: string) => void;
}

export default function RoomAddModal({ show, onClose, onSubmit }: RoomAddModalProps) {
    const [roomName, setRoomName] = useState('');
    const createBtnClass = roomName.length > 0 ? 'btn-primary' : 'btn-disabled';

    return (<>
        <Modal show={show} onClose={onClose}>
            <h3 className="font-bold text-lg">新建房间</h3>
            <div className='py-7 px-3 space-y-5'>
                <input
                    type="text"
                    placeholder="房间名称"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="input input-bordered input-primary w-full" />
            </div>
            <div className='pt-2 px-3 flex justify-stretch space-x-4'>
                <button className='btn btn-outline btn-primary flex-1' onClick={onClose}>取消</button>
                <button className={`btn flex-1 ${createBtnClass}`}
                    onClick={() => {
                        setRoomName('');
                        onSubmit(roomName);
                    }}>创建</button>
            </div>
        </Modal>
    </>);
}
