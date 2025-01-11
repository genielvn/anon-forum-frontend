"use client";
import { useState } from "react";
import Link from "next/link";
import style from "./page.module.scss";
import useFetch from "@/hooks/useFetch";
import { useRouter, notFound } from "next/navigation";
import Image from "next/image";

interface CreateThreadProps {
    params: {
        board_id: string;
    };
}

interface BoardData {
    board: {
        board_id: string;
        name: string;
        description: string;
    };
}

export default function CreateThread({ params }: CreateThreadProps) {
    const { board_id } = params;
    const { data, error, isLoading } = useFetch<BoardData>(
        `http://127.0.0.1:8000/${board_id}/`
    );

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null); // For image preview
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const router = useRouter();

    if (isLoading) return <p>Loading...</p>;
    if (error === "404") return notFound();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Set the preview URL
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        if (!title) {
            setMessage("Please set a title.");
            setIsSubmitting(false);
            return;
        }

        if (!body && !image) {
            setMessage("Please post an image or a body.");
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        if (image) formData.append("img_upload", image);

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/${board_id}/create/`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (response.ok) {
                const json = await response.json();
                const thread_id = json.id;
                router.push(`/${board_id}/${thread_id}`);
            } else {
                const errorData = await response.json();
                throw new Error(errorData?.error);
            }
        } catch (err) {
            setMessage(
                "Something went wrong. Please try again. Error message: " + err
            );
        } finally {
            setMessage("Thread successfully posted!");
        }
    };

    return (
        <>
            <Link className="subheader" href={`/${data?.board.board_id}`}>
                /{data?.board.board_id}/ - {data?.board.name}
            </Link>
            <h2>Start a New Thread</h2>
            <form onSubmit={handleSubmit}>
                <div className={style.new_thread__input_divider}>
                    <label htmlFor="thread-new-title">Title</label>
                    <input
                        type="text"
                        id="thread-new-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={style.new_thread__input_divider}>
                    <label htmlFor="thread-new-text">Content</label>
                    <textarea
                        id="thread-new-text"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <div className={style.new_thread__input_divider}>
                    <label htmlFor="thread-new-image">Image</label>
                    <input
                        type="file"
                        id="thread-new-image"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    {imagePreview && (
                        <div className={style.new_thread__img_preview}>
                            <Image
                                src={imagePreview} // Use the preview URL
                                alt="Thread Image Preview"
                                layout="responsive"
                                width={400}
                                height={400}
                            />
                        </div>
                    )}
                </div>
                {message && <p className="error">{message}</p>}
                <div className={style.new_thread__input_divider}>
                    <button
                        type="submit"
                        className="btn-small btn-pink"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Post"}
                    </button>
                </div>
            </form>
        </>
    );
}
