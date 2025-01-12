import style from "./ThreadReplyTab.module.scss";
import { useState } from "react";
import UserThread from "./UserThread";
import UserReply from "./UserReply";
import useFetch from "@/hooks/useFetch";

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
}
interface UserData {
    threads: ThreadData[];
    replies: ReplyData[];
}

export default function ThreadReplyTab() {
    const { data, error, isLoading } = useFetch<UserData>(
        `http://127.0.0.1:8000/u/`
    );

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
                    {isLoading && <p>Loading threads...</p>}
                    {error && <p>Error loading threads: {error}</p>}
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
                    {isLoading && <p>Loading replies...</p>}
                    {error && <p>Error loading replies: {error}</p>}
                    {data?.replies.length === 0 && <p>No replies found.</p>}
                    {data?.replies.map((reply, index) => (
                        <UserReply
                            key={index}
                            thread_title={reply.thread_title}
                            content={reply.body}
                            img_upload={reply.img_upload}
                            created_at={reply.created_at}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
