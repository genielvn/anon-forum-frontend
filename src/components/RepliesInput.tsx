import React, { useRef, useState } from "react";
import style from "./RepliesInput.module.scss";
import { useRouter } from "next/navigation";
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
