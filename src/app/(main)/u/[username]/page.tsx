"use client";

import ThreadReplyTab from "@/components/ThreadReplyTab";
import UserBanner from "@/components/UserBanner";
import useFetch from "@/hooks/useFetch";
import { notFound } from "next/navigation";

interface User {
    username: string;
    profile_banner: string | null;
    profile_picture: string | null;
    university: string;
}
interface ThreadData {
    id: number;
    board: string;
    title: string;
    body: string;
    img_upload: string | null;
    created_at: string;
}
interface ReplyData {
    thread_title: string;
    body: string;
    img_upload: string | undefined;
    created_at: string;
    board: string;
    thread: number;
}
interface UserData {
    user: User;
    threads: ThreadData[];
    replies: ReplyData[];
}

interface UserProps {
    params: { username: string };
}
export default function UserOthers({ params }: UserProps) {
    const { data, error, isLoading } = useFetch<UserData>(
        `http://127.0.0.1:8000/u/${params.username}/`
    );

    if (isLoading) return;

    if (error) {
        return notFound();
    }

    return (
        <>
            <UserBanner data={data?.user} />
            <ThreadReplyTab data={data} />
        </>
    );
}
