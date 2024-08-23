"use client";

import { useState } from "react";
import CardWithIcon from "../_components/CardWithIcon";
import LoginForm from "../_components/LoginForm";
import NoticeModal from "../_components/modal/NoticeModal";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [message, setMessage] = useState('');
    const router = useRouter();
    return (
        <div className='h-screen flex justify-center items-center'>
            <CardWithIcon>
                <LoginForm
                    onError={(e) => setMessage(e.message)}
                    onSuccess={() => {
                        router.push('/chat-room');
                    }}
                />
            </CardWithIcon>
            <NoticeModal
                show={message.length > 0}
                onClose={() => setMessage('')}
                title="提示"
                message={message}
            >
            </NoticeModal>
        </div>);
}