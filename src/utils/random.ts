export async function randomColor(str: string) {
    const salt = 'cyrus28214.top';
    const buffer = Buffer.from(str + salt, 'utf8');
    const shasum = await crypto.subtle.digest('sha-1', buffer);
    const uarray = new Uint32Array(shasum);
    const hue = uarray[0]! % 360;
    const saturation = 40 + uarray[1]! % 50;
    const lightness = 40 + uarray[2]! % 40;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}