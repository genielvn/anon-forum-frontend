"use client";

import { notFound } from "next/navigation";
import style from "./page.module.scss";
import RepliesInput from "@/components/RepliesInput";
import Reply from "@/components/Reply";
import useFetch from "@/hooks/useFetch";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface ThreadProps {
    params: {
        board_id: string;
        thread_id: number;
    };
}

interface ThreadData {
    id: number;
    title: string;
    author: string;
    reply_count: number;
    body: string;
    created_at: string;
    img_upload: string | null;
}

interface BoardData {
    board_id: string;
    name: string;
    description: string;
}

interface RepliesData {
    id: number;
    body: string;
    created_at: string;
    img_upload: string | null;
}

interface Data {
    board: BoardData;
    thread: ThreadData;
}

export default function Thread({ params }: ThreadProps) {
    const { board_id, thread_id } = params;

    const { data, error, isLoading } = useFetch<Data>(
        `http://127.0.0.1:8000/${board_id}/${thread_id}/`
    );

    const [replies, setReplies] = useState<RepliesData[] | null>(null);

    // Fetch replies data
    const fetchReplies = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/${board_id}/${thread_id}/replies/`
            );
            if (response.ok) {
                const jsonData: RepliesData[] = await response.json();
                setReplies(jsonData);
            }
        } catch (err) {
            console.error("Failed to fetch replies:", err);
        }
    };

    // Initial fetch of replies
    if (!replies && !isLoading) {
        fetchReplies();
    }

    if (isLoading) {
        return;
    }

    if (error) {
        return notFound();
    }

    const relativeTime =
        data?.thread.created_at &&
        formatDistanceToNow(new Date(data.thread.created_at as string), {
            addSuffix: true,
        });
    return (
        <>
            <Link className="subheader" href={`/${data?.board.board_id}`}>
                /{data?.board.board_id}/ - {data?.board.name}
            </Link>
            <h2>{data?.thread.title}</h2>
            <div className={style.thread__details}>
                by {data?.thread.author} • posted {relativeTime}
            </div>
            <div className={style.thread__text}>
                <ReactMarkdown>{data?.thread.body || ""}</ReactMarkdown>
            </div>
            {data?.thread.img_upload && (
                <div className={style.thread__image}>
                    <Image
                        src={`http://127.0.0.1:8000${data.thread.img_upload}`}
                        alt="Thread Image"
                        layout="responsive"
                        width={400}
                        height={400}
                    />
                </div>
            )}
            <RepliesInput
                board_id={board_id}
                thread_id={thread_id}
                onReplyPosted={fetchReplies} // Pass the refetch function
            />
            <h3>Replies</h3>
            {replies?.length === 0
                ? "No replies yet"
                : replies?.map((reply, index) => (
                      <Reply
                          key={reply.id}
                          id={index + 1}
                          author="Anonymous"
                          content={reply.body}
                          created_at={reply.created_at}
                          img_upload={reply.img_upload}
                      />
                  ))}
        </>
    );
}
