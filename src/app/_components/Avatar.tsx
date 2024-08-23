export default function Avatar({ color }: { color: string }) {
    return (<div className="size-full avatar">
        <div className="size-full rounded-full opacity-60" style={{ backgroundColor: color }} />
    </div>);
}