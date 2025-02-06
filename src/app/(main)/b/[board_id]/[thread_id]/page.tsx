"use client";

import React, { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import style from "./page.module.scss";
import RepliesInput from "@/components/RepliesInput";
import Reply from "@/components/Reply";
import useFetch from "@/hooks/useFetch";
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
    author: string;
}

interface Data {
    board: BoardData;
    thread: ThreadData;
}

export default function Thread({ params }: ThreadProps) {
    const { board_id, thread_id } = params;

    const { data, error, isLoading } = useFetch<Data>(
        `http://127.0.0.1:8000/b/${board_id}/${thread_id}/`
    );
    const { data: replies } = useFetch<RepliesData[]>(
        `http://127.0.0.1:8000/b/${board_id}/${thread_id}/replies/`
    );

    const router = useRouter();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [beingEdited, setBeingEdited] = useState(false);
    const [editedBody, setEditedBody] = useState("");

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

    const handleEdit = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/b/${board_id}/${thread_id}/edit/`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        body: editedBody,
                    }),
                }
            );

            if (response.ok) {
                alert("Thread updated successfully!");
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert(errorData?.error || "Failed to update the thread.");
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong. Please try again.");
        }
    };
    const handleDelete = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/b/${board_id}/${thread_id}/delete/`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                alert("Thread deleted successfully!");
                window.location.href = `/b/${board_id}`;
            } else {
                const errorData = await response.json();
                alert(errorData?.error || "Failed to delete the thread.");
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
        }
    };

    const currentUser = localStorage.getItem("user");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const isBanned = localStorage.getItem("isBanned") === "true";

    return (
        <>
            <div className={style.thread__nav}>
                <button
                    onClick={() => router.back()}
                    className="btn-small btn-pink"
                >
                    ← Back
                </button>
                <Link
                    className={`subheader margin-left-5 ${style.thread__subheader}`}
                    href={`/b/${data?.board.board_id}`}
                >
                    /{data?.board.board_id}/ - {data?.board.name}
                </Link>
            </div>
            <div className={style.thread__header}>
                <h2 className={style.thread__title}>{data?.thread.title}</h2>
                {(data?.thread.author === currentUser || isAdmin) && (
                    <div className={style.thread__dropdown}>
                        <div className={style.thread__dropdown_button}>
                            <i
                                onClick={() =>
                                    setIsDropdownOpen((prev) => !prev)
                                }
                                className="bi bi-three-dots"
                            ></i>
                        </div>
                        {isDropdownOpen && (
                            <div className={style.thread__dropdown_menu}>
                                {!isBanned && (
                                    <div
                                        className={style.thread__dropdown_item}
                                        onClick={() => {
                                            setBeingEdited(true);
                                            setEditedBody(
                                                data?.thread.body || ""
                                            );
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        Edit
                                    </div>
                                )}

                                <div
                                    className={style.thread__dropdown_item}
                                    onClick={handleDelete}
                                >
                                    Delete
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className={style.thread__details}>
                by{" "}
                {data?.thread.author === "Anonymous" ? (
                    <span>{data?.thread.author}</span>
                ) : (
                    <Link href={`/u/${data?.thread.author}`}>
                        {data?.thread.author}
                    </Link>
                )}{" "}
                • posted {relativeTime}
            </div>

            {beingEdited ? (
                <div className={style.thread__text}>
                    <textarea
                        value={editedBody}
                        onChange={(e) => setEditedBody(e.target.value)}
                    />
                    <button className="btn-small btn-pink" onClick={handleEdit}>
                        Save
                    </button>
                    <button
                        className="btn-small btn-pink"
                        onClick={() => setBeingEdited(false)}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div className={style.thread__text}>
                    <ReactMarkdown>{data?.thread.body || ""}</ReactMarkdown>
                </div>
            )}

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
            {!isBanned ? (
                !beingEdited && (
                    <RepliesInput board_id={board_id} thread_id={thread_id} />
                )
            ) : (
                <p style={{ color: "red", margin: "1rem 0" }}>
                    You are banned and cannot post replies.
                </p>
            )}

            <h3 style={{ marginTop: "1em" }}>Replies</h3>
            {replies?.length === 0
                ? "No replies yet"
                : replies?.map((reply) => (
                      <Reply
                          key={reply.id}
                          id={reply.id}
                          author={reply.author}
                          content={reply.body}
                          created_at={reply.created_at}
                          img_upload={reply.img_upload}
                      />
                  ))}
        </>
    );
}
