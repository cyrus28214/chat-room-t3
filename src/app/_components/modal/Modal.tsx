"use client";

import React, { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import xmarkSrc from "~/assets/icons/solid/xmark.svg";
import { createPortal } from "react-dom";
import { createContext } from "react";
interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    show: boolean;
}

export const ModalContainerContext = createContext<React.RefObject<HTMLDivElement> | null>(null);
export function ModalContainer({ children }: { children: React.ReactNode }) {
    const modalContainerRef = useRef<HTMLDivElement>(null);

    return (<div ref={modalContainerRef}>
        <ModalContainerContext.Provider value={modalContainerRef}>
            {children}
        </ModalContainerContext.Provider>
    </div>);
}

export default function Modal({ children, show, onClose }: ModalProps) {
    const modalRef = useRef<HTMLDialogElement>(null);
    const modalContainer = useContext(ModalContainerContext);

    useEffect(() => {
        if (!modalRef.current) {
            return;
        }
        if (show) {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        }
    }, [show]);

    const onCancel = (event: React.SyntheticEvent) => {
        event.preventDefault();
        onClose();
    }

    return <>
        {modalContainer?.current &&
            createPortal(
                <dialog ref={modalRef} className="modal" onCancel={onCancel}>
                    <div className="modal-box bg-base-200 overflow-hidden break-words">
                        <Image src={xmarkSrc as string} alt="关闭" onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 p-1 fill-current" />
                        {children}
                    </div>
                    {/* 点在黑色处也能关闭 */}
                    <div onClick={onClose} className="modal-backdrop" />
                </dialog>, modalContainer.current)
        }</>;
}
