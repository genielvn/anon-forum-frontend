import Board from "@/components/Board";

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
export default function Boards() {
    return (
        <>
            <h1>University Boards</h1>

            {Object.keys(sampleBoards).map((id) => (
                <Board
                    key={id} // Use the board ID as the key
                    id={id}
                    name={sampleBoards[id].name}
                    motto={sampleBoards[id].motto}
                />
            ))}
        </>
    );
}
