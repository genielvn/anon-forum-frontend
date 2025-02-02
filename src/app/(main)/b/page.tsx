"use client";

import Board from "@/components/Board";
import useFetch from "@/hooks/useFetch";
import { notFound } from "next/navigation";

interface BoardData {
    board_id: string;
    name: string;
    description: string;
}

export default function Boards() {
    const { data, error, isLoading } = useFetch<BoardData[]>(
        "http://127.0.0.1:8000/b/"
    );

    if (error) return notFound();

    return (
        <>
            <h1>University Boards</h1>

            {data?.length === 0 ? (
                <p>Loading boards...</p>
            ) : (
                data?.map((board) => (
                    <Board
                        key={board.board_id}
                        id={board.board_id}
                        name={board.name}
                        description={board.description}
                    />
                ))
            )}
        </>
    );
}
