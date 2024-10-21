import React from "react";
import style from "./Thread.module.scss";
import Link from "next/link";

interface ThreadProps {
    board: string;
    id: number;
    title: string;
    text: string;
    author: string;
    replyCount: number;
}

const Thread: React.FC<ThreadProps> = ({
    board,
    id,
    title,
    text,
    author,
    replyCount,
}) => {
    return (
        <Link href={`/${board}/${id}`} style={{ textDecoration: "none" }}>
            <div className={style.thread}>
                <div className={style.thread__title}>{title}</div>
                <div className={style.thread__details}>
                    by {author} • last replied 3 minutes ago • {replyCount}{" "}
                    replies
                </div>
                <div className={style.thread__text}>{text}</div>
            </div>
        </Link>
    );
};

export default Thread;
