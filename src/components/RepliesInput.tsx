/**
 * Program Title: Replies Input Component (RepliesInput.tsx)
 *
 * Programmers: Genesis Lovino, David Andrei Estrella
 *
 * Purpose:
 * - This component provides a form for users to submit replies to a specific thread on a board.
 * - Users can input text, upload an image, and choose to post their reply anonymously.
 *
 * Where the program fits in the general system designs:
 * - This component is part of the frontend of the anonforum application, specifically for handling user replies to threads.
 *
 * Date written: April 2024
 * Date revised: January 2025
 *
 * Data structures used:
 * - ReplyInputProps: Interface for the reply input component's props, containing board_id and thread_id.
 * - useState hooks for managing component state (reply text, image, submission status, message, anonymous state).
 * - useRef hook for managing the file input element.
 * - JSON objects: for sending data to the backend API.
 *
 * Algorithms used:
 * - Event handling for input changes and form submission.
 * - Form submission handling with validation and asynchronous API call to post the reply.
 *
 * Control Structures:
 * - Conditional checks for form validation and response handling.
 */

import React, { useRef, useState } from "react";
import style from "./RepliesInput.module.scss";
import Checkbox from "@/components/Checkbox"; // Import your Checkbox component

interface ReplyInputProps {
    board_id: string;
    thread_id: number;
}

const RepliesInput: React.FC<ReplyInputProps> = ({ board_id, thread_id }) => {
    const [reply, setReply] = useState("");
    const [replyImage, setReplyImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false); // State for anonymous checkbox
    const imageInput = useRef<HTMLInputElement | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        if (!reply) {
            setMessage("Please include a text to your reply.");
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append("body", reply);
        if (replyImage) formData.append("img_upload", replyImage);
        formData.append("anonymous", isAnonymous ? "true" : "false"); // Include the anonymous state

        const token = localStorage.getItem("token");

        if (!token) {
            setMessage("You need to be logged in to post a reply.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/b/${board_id}/${thread_id}/reply/`,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                setReply(""); // Clear the reply text area
                setReplyImage(null); // Clear the image selection
                if (imageInput.current) imageInput.current.value = ""; // Reset file input
                setMessage("Reply successfully posted!");
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.log(errorData);
                setMessage(errorData?.error || "Failed to post reply.");
            }
        } catch (err) {
            setMessage(
                "Something went wrong. Please try again. Error message: " + err
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setReplyImage(file);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={style.new_replies__input_divider}>
                <textarea
                    id="replies-new-text"
                    onChange={(e) => setReply(e.target.value)}
                    value={reply}
                />
            </div>
            <div className={style.new_replies__input_divider}>
                <input
                    type="file"
                    id="thread-new-image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="margin-left-5"
                    ref={imageInput}
                />
            </div>
            <div className={style.new_replies__input_divider_flexrow}>
                <button className="btn-small btn-pink" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Reply"}
                </button>
                <Checkbox
                    id="anon-reply"
                    text="Post as Anonymous"
                    checked={isAnonymous}
                    onChange={() => setIsAnonymous(!isAnonymous)} // Toggle the anonymous state
                />
            </div>
            {message && <p>{message}</p>}
        </form>
    );
};

export default RepliesInput;
