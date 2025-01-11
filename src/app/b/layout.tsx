"use client";
import "@styles/globals.scss";
import style from "./layout.module.scss";
import Navigation from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const router = useRouter();

    // useEffect(() => {
    //     const token = localStorage.getItem("token"); // Or cookies, depending on storage method
    //     if (!token) {
    //         router.push("/account/");
    //     }
    // }, [router]);
    return (
        <>
            <header>
                <Navigation />
            </header>
            <main className={style.main}>{children}</main>
        </>
    );
}
