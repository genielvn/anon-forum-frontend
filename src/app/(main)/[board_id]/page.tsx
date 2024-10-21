"use client";

import { notFound } from "next/navigation";
import Thread from "@/components/Thread";
import ThreadCreate from "@/components/ThreadCreate";
interface ThreadListProps {
    params: {
        board_id: string;
    };
}

interface ThreadData {
    title: string;
    author: string;
    replyCount: number;
    text: string;
}

const sampleThreads: Record<string, ThreadData> = {
    1: {
        title: "Nakita niyo ba yung pencil ko?",
        author: "Kim",
        replyCount: 5,
        text: "Weird lang, kasi nung nag-eexam ako, ginagamit ko yung pencil ko for shading. Nagbura lang ako ng sagot ko, pagtingin ko, wala na! Pahanap naman ng pencil ko guys, need na need ko yun.",
    },
    2: {
        title: "sir xxxxx issue",
        author: "Kim",
        replyCount: 121,
        text: "SIR *****, MAGALING KA SANA MAGTURO, KASO LAGI KANG NAGAGALIT AYUSIN MO NAMAN. KAYA AYAW NAMIN SUMAGOT KASI PARANG INAAWAY NIYO KAMING MGA ESTUDYANTE",
    },
};

const validIDs: string[] = ["pup", "up"];
const sampleBoards: Record<string, { name: string; motto: string }> = {
    pup: {
        name: "Polytechnic University of The Philippines",
        motto: "Tanglaw ng Bayan",
    },
    up: {
        name: "University of The Philippines",
        motto: "Honor, Excellence, Service",
    },
};

export default function ThreadList({ params }: ThreadListProps) {
    const board_id = params.board_id;

    if (!validIDs.includes(board_id)) return notFound();

    const board = sampleBoards[board_id];

    return (
        <>
            <h2>{board.name}</h2>
            <p>{board.motto}</p>

            <div>
                <ThreadCreate board={board_id} />
                {Object.keys(sampleThreads).map((threadId) => {
                    const thread = sampleThreads[threadId];
                    return (
                        <Thread
                            key={threadId}
                            id={parseInt(threadId)}
                            board={board_id}
                            title={thread.title}
                            text={thread.text}
                            author={thread.author}
                            replyCount={thread.replyCount}
                        />
                    );
                })}
            </div>
        </>
    );
}
