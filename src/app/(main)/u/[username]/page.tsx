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
    is_banned: string;
    is_admin: string;
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

    const isAdmin = localStorage.getItem("isAdmin") === "true";

    const handleBanUser = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/u/${params.username}/ban/`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const json = await response.json()
                throw new Error(json.error);
            }

            alert("User banned successfully");
            window.location.reload(); // Reload to reflect changes
        } catch (error) {
            console.error("Error banning user:", error);
            alert("An error has occured.")
        }
    };

    if (isLoading) return;

    if (error) {
        return notFound();
    }

    return (
        <>
            <UserBanner data={data?.user} />
            <ThreadReplyTab data={data} />
            {isAdmin && (
                <div className="margin-top-5">
                    <h2>
                        Moderator Settings
                    </h2>
                    <button
                        className="btn-small btn-red"
                        onClick={handleBanUser}
                    >
                        Ban User
                    </button>
                </div>
            )}
        </>
    );
}
