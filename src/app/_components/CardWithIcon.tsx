import classnames from "classnames";
import { SolidComments } from "./icons";

interface CardWithIconProps {
    children: React.ReactNode;
    title?: string;
    className?: classnames.Argument;
}

export default function CardWithIcon({
    children,
    title = '',
    className = 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
}: CardWithIconProps) {
    const cls = classnames('w-full h-32 flex items-center justify-center', className);
    return (<div className='h-full flex flex-col items-center justify-center'>
        <div className='card bg-base-100 w-96 shadow-xl overflow-hidden
            flex items-center'>
            <div className={cls}>
                <div className="size-16">
                    <SolidComments className="fill-slate-900" />
                </div>
            </div>
            <div className="card-body w-full p-6">
                <h2 className="card-title">{title}</h2>
                {children}
            </div>

        </div>
    </div>);
}