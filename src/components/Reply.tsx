import React from "react";
import style from "./Reply.module.scss";

interface ReplyProps {
    id: number;
    author: string;
    content: string;
}

const Reply: React.FC<ReplyProps> = ({ id, author, content }) => {
    return (
        <div className={style.reply}>
            <div className={style.reply__details}>
                #{id} • <span className={style.reply__details_author}>{author}</span> • 5 minutes ago
            </div>
            <div className={style.reply__content}>{content}</div>
        </div>
    );
};

export default Reply;
