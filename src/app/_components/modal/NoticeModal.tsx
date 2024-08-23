"use client";

import Modal from "./Modal";

interface NoticeModalProps {
    show: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

export default function NoticeModal({ show, onClose, title, message }: NoticeModalProps) {
    return (
        <Modal show={show} onClose={onClose}>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="py-4">{message}</p>
            <button className="btn btn-primary w-full" onClick={onClose}>确认</button>
        </Modal>
    );
}