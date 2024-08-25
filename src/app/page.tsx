// import Link from "next/link";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "~/utils/crypto";

export default function Home() {
  const token = cookies().get("token")?.value;
  const auth = token && verifyToken(token);
  if (auth) redirect("/chat-room");
  else redirect("/login");
}