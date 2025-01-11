import React from "react";
import style from "./Thread.module.scss";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

interface ThreadProps {
    board: string;
    id: number;
    title: string;
    text: string;
    author: string;
    replyCount: number;
    updated_at: string;
    img_upload: string | null;
}

const Thread: React.FC<ThreadProps> = ({
    board,
    id,
    title,
    text,
    author,
    replyCount,
    updated_at,
    img_upload,
}) => {
    const relativeTime = formatDistanceToNow(new Date(updated_at), {
        addSuffix: true,
    });

    const limitedText = text.length > 200 ? `${text.slice(0, 200)}...` : text;

    return (
        <Link href={`/b/${board}/${id}`} style={{ textDecoration: "none" }}>
            <div className={style.thread}>
                <div className={style.thread__title}>{title}</div>
                <div className={style.thread__details}>
                    by {author} •{" "}
                    {replyCount === 0 ? "last created " : "last replied "}
                    {relativeTime} • {replyCount}{" "}
                    {replyCount === 1 ? "reply" : "replies"}
                </div>
                {img_upload && (
                    <div className={style.thread__image}>
                        <Image
                            src={`http://127.0.0.1:8000${img_upload}`}
                            alt="Thread Image"
                            layout="responsive"
                            width={400}
                            height={400}
                        />
                    </div>
                )}
                <div className={style.thread__text}>
                    <ReactMarkdown>{limitedText}</ReactMarkdown>
                </div>
            </div>
        </Link>
    );
};

export default Thread;
