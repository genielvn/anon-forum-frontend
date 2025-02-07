import React from "react";
import style from "./Reply.module.scss";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { deleteReply } from "@/services/api";

interface ReplyProps {
    id: number;
    author: string;
    content: string;
    img_upload: string | null;
    created_at: string;
    is_admin: boolean;
    current_user: string;
}

const Reply: React.FC<ReplyProps> = ({
    id,
    author,
    content,
    created_at,
    img_upload,
    is_admin,
    current_user,
}) => {
    const relativeTime = formatDistanceToNow(new Date(created_at), {
        addSuffix: true,
    });

    const handleDelete = async () => {
        const confirmed = confirm(
            "Are you sure you want to delete this reply?"
        );
        if (!confirmed) return;

        try {
            const response = await deleteReply(id);
            alert("Reply deleted successfully.");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("An error occurred while deleting the reply.");
        }
    };

    return (
        <div className={style.reply}>
            <div className={style.reply__details}>
                #{id} •{" "}
                {author === "Anonymous" ? (
                    <span className={style.reply__details_author}>
                        {author}
                    </span>
                ) : (
                    <Link
                        href={`/u/${author}`}
                        className={style.reply__details_author}
                    >
                        {author}
                    </Link>
                )}
                • {relativeTime}
                {(current_user === author || is_admin) && ( // Check if the user is the author or an Admin
                    <span
                        className={style.reply__deleteButton}
                        onClick={handleDelete}
                    >
                        {" • "}Delete
                    </span>
                )}
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
