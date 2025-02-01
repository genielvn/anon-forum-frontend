"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            // Redirect to /a if no token
            router.push("/a");
        } else {
            // Redirect to /b if token exists
            router.push("/b");
        }
    }, [router]);

    return null; // You can return null as the page will handle the redirection
};

export default HomePage;
