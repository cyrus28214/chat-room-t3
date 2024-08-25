"use client";

import { useState } from "react";
import CardWithIcon from "../_components/CardWithIcon";
import LoginForm from "../_components/LoginForm";
import NoticeModal from "../_components/modal/NoticeModal";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
                <Link href='/register'>
                    <p className='text-end text-sm hover:underline'>
                        {'未注册？前去注册 >'}
                    </p>
                </Link>
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