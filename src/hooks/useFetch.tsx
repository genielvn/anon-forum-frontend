import { useEffect, useState } from "react";

interface Result<T> {
    data: T | null;
    error: string | null;
    isLoading: boolean;
}

function useFetch<T>(url: string): Result<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setisLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (response.status === 404) {
                    throw new Error("404");
                }
                const received = await response.json();
                setData(received);
            } catch (err) {
                console.error(`Error fetching ${url}: ${err}`);
                setError((err as Error).message);
            } finally {
                setisLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data, error, isLoading };
}

export default useFetch;
