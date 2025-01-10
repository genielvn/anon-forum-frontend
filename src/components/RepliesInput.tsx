import React, { useRef } from "react";
import style from "./RepliesInput.module.scss";
import Checkbox from "./Checkbox";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ReplyInputProps {
    board_id: string;
    thread_id: number;
    onReplyPosted: () => void;
}

const RepliesInput: React.FC<ReplyInputProps> = ({
    board_id,
    thread_id,
    onReplyPosted,
}) => {
    const [reply, setReply] = useState("");
    const [replyImage, setReplyImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const imageInput = useRef<HTMLInputElement | null>(null);

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        if (!reply && !replyImage) {
            setMessage("Please post an image or a body.");
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append("body", reply);
        if (replyImage) formData.append("img_upload", replyImage);

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/${board_id}/${thread_id}/reply/`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (response.ok) {
                setReply(""); // Clear the reply text area
                setReplyImage(null); // Clear the image selection
                if (imageInput.current) imageInput.current.value = ""; // Reset file input
                onReplyPosted(); // Trigger the callback
                setMessage("Reply successfully posted!");
            } else {
                const errorData = await response.json();
                setMessage(errorData?.error || "Failed to post reply.");
            }
        } catch (err) {
            setMessage(
                "Something went wrong. Please try again. Error message: " + err
            );
        } finally {
            setIsSubmitting(false);
            router.refresh(); // Refresh the page
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
                <label htmlFor="replies-new-text">Replies</label>
                <textarea
                    id="replies-new-text"
                    onChange={(e) => setReply(e.target.value)}
                    value={reply}
                />
                <div>
                    <button
                        className="btn-small btn-pink"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Reply"}
                    </button>
                    <input
                        type="file"
                        id="thread-new-image"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="margin-left-5"
                        ref={imageInput}
                    />
                    {message && <p>{message}</p>}
                </div>
            </div>
            <div className={`${style.new_replies__input_divider}`}>
                <Checkbox id="reply-anon" text="Reply as Anonymous"></Checkbox>
            </div>
        </form>
    );
};

export default RepliesInput;
