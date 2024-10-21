import React from "react";
import style from "./RepliesInput.module.scss";
import Checkbox from "./Checkbox";

const RepliesInput = () => {
    return (
        <>
            <div className={style.new_replies__input_divider}>
                <label htmlFor="replies-new-text">Replies</label>
                <textarea id="replies-new-text" />
                <div className="right">
                    <button className="btn-small btn-pink">Add Image</button>
                    <button className="btn-small btn-pink">Reply</button>
                </div>
            </div>
            <div className={`right ${style.new_replies__input_divider}`}>
                <Checkbox id="reply-anon" text="Reply as Anonymous"></Checkbox>
            </div>
        </>
    );
};

export default RepliesInput;
