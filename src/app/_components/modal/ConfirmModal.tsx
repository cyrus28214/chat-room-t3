import Modal from "./Modal";

interface ConfirmModalProps {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    message: string;
}

export default function ConfirmModal({ show, onConfirm, onCancel, title, message }: ConfirmModalProps) {
    return (<Modal show={show} onClose={onCancel}>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className='pt-2 px-3 flex justify-stretch space-x-4'>
            <button className='btn btn-outline btn-primary flex-1' onClick={onCancel}>取消</button>
            <button className="btn btn-primary flex-1" onClick={onConfirm}>确认</button>
        </div>
    </Modal>);
}