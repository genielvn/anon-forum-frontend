import { notFound } from "next/navigation";
import style from "./page.module.scss";
import RepliesInput from "@/components/RepliesInput";
interface ThreadProps {
    params: {
        thread_id: string;
    };
}

const sampleThreads: Record<
    number,
    { title: string; content: string; author: string; minutesAgo: number }
> = {
    1: {
        title: "Nakita niyo ba yung pencil ko?",
        content:
            "Weird lang, kasi nung nag-eexam ako, ginagamit ko yung pencil ko for shading. Nagbura lang ako ng sagot ko, pagtingin ko, wala na! Pahanap naman ng pencil ko guys, need na need ko yun.",
        author: "Kim",
        minutesAgo: 20,
    },
};

const sampleComments: Record<number, { author: string; content: string }> = {
    1: {
        author: "Anonymous",
        content: "pen mo bulok",
    },
};

export default function Thread({ params }: ThreadProps) {
    const thread_id = Number(params.thread_id);

    if (isNaN(thread_id)) return notFound();
    if (!Object.keys(sampleThreads).includes(String(thread_id)))
        return notFound();

    const thread = sampleThreads[thread_id];

    return (
        <>
            <div className="subheader">
                /pup/ - Polytechnic University of The Philippines
            </div>
            <h3>{thread.title}</h3>
            <div className={style.thread__details}>
                by {thread.author} • {thread.minutesAgo} minutes ago
            </div>
            <div className={style.thread__text}>{thread.content}</div>
            <RepliesInput />
        </>
    );
}
