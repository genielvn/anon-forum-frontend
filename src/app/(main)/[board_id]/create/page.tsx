import style from "./page.module.scss";

export default function CreateThread() {
    return (
        <>
            <div className="subheader">
                /pup/ - Polytechnic University of The Philippines
            </div>
            <h2>Start a New Thread</h2>
            <div className={style.new_thread__input_divider}>
                <label htmlFor="thread-new-title">Title</label>
                <input type="text" id="thread-new-title" />
            </div>
            <div className={style.new_thread__input_divider}>
                <label htmlFor="thread-new-text">Content</label>
                <textarea id="thread-new-text" />
            </div>
            <div className={style.new_thread__input_divider}>
                <label htmlFor="thread-new-image">Image</label>
                <button className="btn-small btn-pink">Add Image</button>
            </div>

            <div className={style.new_thread__input_divider}>
                <button className="btn-small btn-pink">Post</button>
            </div>
        </>
    );
}
