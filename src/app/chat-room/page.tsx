// import { useContext, useEffect, useState } from "react";
// import { ChatContext, UserContext } from "../utils/context";
// import SideBar from "../components/SideBar";
// import RoomEntry from "../components/RoomEntry";
// import { Navigate } from "react-router-dom";
// import { useCache } from "../utils/cache";

"use client";

import { useState } from "react";
import { SolidPlus } from "../_components/icons";
import RoomAddModal from "../_components/RoomAddModal";
import { RoomList } from "../_components/RoomList";
import cn from "classnames";

// export function ChatRoom() {
//     const [roomIdCache, setRoomIdCache] = useCache("roomId", "");
//     const [roomId, setRoomId] = useState(roomIdCache ? parseInt(roomIdCache) : null);
//     useEffect(() => {
//         setRoomIdCache(roomId ? roomId.toString() : "");
//     }, [roomId, setRoomIdCache]);

//     const { name } = useContext(UserContext);
//     useEffect(() => {
//         if (name) {
//             document.title = `聊天室 - ${name}`;
//         } else {
//             document.title = "聊天室";
//         }
//     }, [name]);

//     if (!name) {
//         return <Navigate to="./set-name" />;
//     }

//     return (
//         <ChatContext.Provider value={{ roomId, setRoomId }}>
//             <div className='h-screen flex overflow-hidden'>
//                 <div className='h-full w-56 md:w-72 lg:w-96'>
//                     <SideBar />
//                 </div>
//                 <div className='h-full flex-1 min-w-0'>
//                     <RoomEntry />
//                 </div>
//             </div>
//         </ChatContext.Provider>);
// }

function SideBar() {
    const [roomAddShow, setRoomAddShow] = useState(false);
    const toolItemClass = 'menu-item tooltip';
    const toolBtnClass = 'btn btn-sm btn-circle btn-ghost p-1';

    function handleRoomAddSubmit(name: string) {
        console.log(`Create room: ${name}`);
        setRoomAddShow(false);
    }

    return (<div className='flex flex-col h-full bg-base-200'>
        <div className='flex-1 overflow-y-auto'>
            <RoomList />
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
    </div>);
}

export default function ChatRoomPage() {
    return (<div className='h-screen flex overflow-hidden'>
        <div className='h-full w-56 md:w-72 lg:w-96'>
            <SideBar />
        </div>
        <div className='h-full flex-1 min-w-0'>
        </div>
    </div>);
}