"use client";

import { useEffect, useState } from "react";
import Board from "@/components/Board";
import useFetch from "@/hooks/useFetch";

interface BoardData {
    board_id: string;
    name: string;
    description: string;
}

export default function Boards() {
    const { data, error, isLoading } = useFetch<BoardData[]>(
        "http://127.0.0.1:8000/"
    );

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
