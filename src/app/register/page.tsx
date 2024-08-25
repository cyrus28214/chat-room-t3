"use client";

import { useState } from "react";
import CardWithIcon from "../_components/CardWithIcon";
import RegisterForm from "../_components/RegisterForm";
import NoticeModal from "../_components/modal/NoticeModal";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [message, setMessage] = useState('');
    const router = useRouter();
    return (
        <div className='h-screen flex justify-center items-center'>
            <CardWithIcon>
                <RegisterForm
                    onError={(e) => setMessage(e.message)}
                    onSuccess={() => router.push('/chat-room')}
                />
                <Link href='/login'>
                    <p className='text-end text-sm hover:underline'>
                        {'已注册？前去登录 >'}
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