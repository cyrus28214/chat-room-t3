"use client";

import { api } from "~/trpc/react";

export default function TestPage() {
    const { data: uid, error } = api.auth.getUidFromToken.useQuery('asdfasdf');
    return (<div>{uid ? `UID: ${uid}` : error?.message ?? 'Loading...'}</div>);
} 