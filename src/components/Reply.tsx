import React from "react";
import style from "./Reply.module.scss";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

interface ReplyProps {
    id: number;
    author: string;
    content: string;
    img_upload: string | null;
    created_at: string;
}

const Reply: React.FC<ReplyProps> = ({
    id,
    author,
    content,
    created_at,
    img_upload,
}) => {
    const relativeTime = formatDistanceToNow(new Date(created_at), {
        addSuffix: true, // Adds "ago" at the end
    });

    return (
        <div className={style.reply}>
            <div className={style.reply__details}>
                #{id} •{" "}
                <Link href={`/u/${author}`} className={style.reply__details_author}>{author}</Link> •{" "}
                {relativeTime}
            </div>
            <div className={style.reply__content}>
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            {img_upload && (
                <div className={style.reply__image}>
                    <Image
                        src={`http://127.0.0.1:8000${img_upload}`}
                        alt="reply"
                        layout="responsive"
                        height={400}
                        width={400}
                    />
                </div>
            )}
        </div>
    );
};

export default Reply;
