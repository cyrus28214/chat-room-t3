"use client";

import { useState } from "react";
import CardWithIcon from "../_components/CardWithIcon";
import RegisterForm from "../_components/RegisterForm";
import NoticeModal from "../_components/modal/NoticeModal";

export default function RegisterPage() {
    const [message, setMessage] = useState('');
    return (
        <div className='h-screen flex justify-center items-center'>
            <CardWithIcon>
                <RegisterForm
                    onError={(e) => setMessage(e.message)}
                    onSuccess={(data) => {
                        setMessage(JSON.stringify(data));
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