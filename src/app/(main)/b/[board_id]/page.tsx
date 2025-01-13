"use client";

import { notFound } from "next/navigation";
import Thread from "@/components/Thread";
import ThreadCreate from "@/components/ThreadCreate";
import useFetch from "@/hooks/useFetch";
import style from "./page.module.scss";

interface ThreadListProps {
    params: {
        board_id: string;
    };
}

interface ThreadData {
    id: number;
    title: string;
    author: string;
    reply_count: number;
    body: string;
    updated_at: string;
    img_upload: string | null;
}

interface BoardData {
    board_id: string;
    name: string;
    description: string;
}

interface Data {
    board: BoardData;
    threads: ThreadData[];
}

export default function ThreadList({ params }: ThreadListProps) {
    const { board_id } = params;

    const { data, error, isLoading } = useFetch<Data>(
        `http://127.0.0.1:8000/b/${board_id}/`
    );

    const isBanned = localStorage.getItem("isBanned") === "true";

    if (isLoading) {
        return;
    }

    if (error) {
        return notFound();
    }

    return (
        <>
            <h2>{data?.board.name}</h2>
            <p className={style.thread__board_description}>
                {data?.board.description}
            </p>
            <div className={style.thread__list}>
                {!isBanned && <ThreadCreate board={board_id} />}
                {isBanned && (
                    <p style={{ color: "red", margin: "1rem 0" }}>
                        You are banned and cannot create threads.
                    </p>
                )}
                {data?.threads.map((thread) => (
                    <Thread
                        key={thread.id}
                        id={thread.id}
                        board={board_id}
                        title={thread.title}
                        text={thread.body}
                        author={thread.author}
                        replyCount={thread.reply_count}
                        updated_at={thread.updated_at}
                        img_upload={thread.img_upload}
                    />
                ))}
            </div>
        </>
    );
}
