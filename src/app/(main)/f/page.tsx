"use client";
import { notFound } from "next/navigation";
import FeedThread from "@/components/FeedThread";
import useFetch from "@/hooks/useFetch";
import style from "./page.module.scss";

interface ThreadData {
    id: number;
    title: string;
    author: string;
    reply_count: number;
    body: string;
    updated_at: string;
    img_upload: string | null;
    board: string;
    board_name: string;
}

export default function Feed() {
    const { data, error, isLoading } = useFetch<ThreadData[]>(
        `http://127.0.0.1:8000/f/`
    );

    if (isLoading) {
        return;
    }

    if (error) {
        return notFound();
    }

    return (
        <>
            <h1>Latest</h1>
            <div className={style.thread__list}>
                {data?.map((thread, index) => (
                    <FeedThread
                        key={thread.id}
                        id={thread.id}
                        board={thread.board}
                        board_name={thread.board_name}
                        title={thread.title}
                        text={thread.body}
                        author={thread.author}
                        replyCount={thread.reply_count}
                        updated_at={thread.updated_at}
                        img_upload={thread.img_upload}
                        index={index}
                    />
                ))}
            </div>
        </>
    );
}
