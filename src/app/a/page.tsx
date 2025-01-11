"use client";

import Image from "next/image";
import style from "./page.module.scss";
import Logo from "@/public/logo.png";
import { useRouter } from "next/navigation";

export default function Account() {
    const router = useRouter();

    return (
        <div className={style.account__div}>
            <div className={style.account__first_half}>
                <Image
                    src={Logo}
                    alt="not-found-logo"
                    className={style.notFound__logo}
                    height={200}
                />
            </div>

            <div className={style.account__second_half}>
                <button
                    className="btn-full-width btn-hollow-pink margin-bottom-20"
                    onClick={() => router.push("/a/sign-in")}
                >
                    Sign In
                </button>
                <button
                    className="btn-full-width btn-solid-pink"
                    onClick={() => router.push("/a/sign-up")}
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}
