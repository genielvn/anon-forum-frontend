import React from "react";
import style from "./Thread.module.scss";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface ThreadProps {
    board: string;
    id: number;
    title: string;
    text: string;
    author: string;
    replyCount: number;
    updated_at: string;
}

const Thread: React.FC<ThreadProps> = ({
    board,
    id,
    title,
    text,
    author,
    replyCount,
    updated_at,
}) => {
    const relativeTime = formatDistanceToNow(new Date(updated_at), {
        addSuffix: true, // Adds "ago" at the end
    });

    return (
        <Link href={`/${board}/${id}`} style={{ textDecoration: "none" }}>
            <div className={style.thread}>
                <div className={style.thread__title}>{title}</div>
                <div className={style.thread__details}>
                    by {author} •{" "}
                    {replyCount == 0 ? "last created " : "last replied "}
                    {relativeTime} • {replyCount}{" "}
                    {replyCount == 1 ? "reply" : "replies"}
                </div>
                <div className={style.thread__text}>{text}</div>
            </div>
        </Link>
    );
};

export default Thread;
