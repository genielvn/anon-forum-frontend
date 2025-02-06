/**
 * Program Title: Thread and Reply Tab Component (ThreadReplyTab.tsx)
 *
 * Programmers: Genesis Lovino, David Andrei Estrella
 *
 * Purpose:
 * - The ThreadReplyTab component allows users to toggle between viewing their threads and replies.
 *
 * Where the program fits in the general system designs:
 * - This component is part of the user profile section, displaying the user's threads and replies.
 *
 * Date written: April 2024
 * Date revised: January 2025
 *
 * Data structures used:
 * - ThreadData: Interface for thread information.
 * - ReplyData: Interface for reply information.
 * - UserData: Interface combining threads and replies.
 *
 * Algorithms used:
 * - None
 *
 * Control Structures:
 * - Conditional rendering based on the active tab (threads or replies).
 */

import style from "./ThreadReplyTab.module.scss";
import { useState } from "react";
import UserThread from "./UserThread";
import UserReply from "./UserReply";

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
    img_upload: string | null;
    created_at: string;
    board: string;
    thread: number;
}
interface UserData {
    threads: ThreadData[];
    replies: ReplyData[];
}

interface ThreadReplyTabProps {
    data: UserData | null;
}
export default function ThreadReplyTab({ data }: ThreadReplyTabProps) {
    const [activeTab, setActiveTab] = useState<"threads" | "replies">(
        "threads"
    );

    return (
        <div className={style.thread_reply__main}>
            <div className={style.thread_reply__toggleSwitch}>
                <button
                    className={`btn-small-no-min ${
                        activeTab === "threads"
                            ? "btn-solid-pink"
                            : "btn-hollow-pink"
                    }`}
                    onClick={() => setActiveTab("threads")}
                >
                    Threads
                </button>
                <button
                    className={`btn-small-no-min ${
                        activeTab === "replies"
                            ? "btn-solid-pink"
                            : "btn-hollow-pink"
                    }`}
                    onClick={() => setActiveTab("replies")}
                >
                    Replies
                </button>
            </div>

            {activeTab === "threads" && (
                <div>
                    {data?.threads.length === 0 && <p>No threads found.</p>}
                    {data?.threads.map((reply, index) => (
                        <UserThread
                            key={index}
                            id={reply.id}
                            board={reply.board}
                            title={reply.title}
                            text={reply.body}
                            img_upload={reply.img_upload}
                            created_at={reply.created_at}
                        />
                    ))}
                </div>
            )}

            {activeTab === "replies" && (
                <div>
                    {data?.replies.length === 0 && <p>No replies found.</p>}
                    {data?.replies.map((reply, index) => (
                        <UserReply
                            key={index}
                            thread_title={reply.thread_title}
                            content={reply.body}
                            img_upload={reply.img_upload}
                            created_at={reply.created_at}
                            board={reply.board}
                            thread={reply.thread}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
