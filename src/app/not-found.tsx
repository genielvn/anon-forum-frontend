"use client";

import { useRouter } from "next/navigation";
import style from "@styles/notfound.module.scss";
import Image from "next/image";
import NotFound from "@/public/404.png";

const quote404 = [
    "Maybe the real page was the friends we made along the way...",
    "Aw, snap!",
    "It's not on our database, sorry.",
    "We will never gonna give you up, though.",
    "お探しのページが見つかりません。",
    "The page you are looking for could not be found.",
];

export default function Custom404() {
    const router = useRouter();
    const token = localStorage.getItem("token"); // Or cookies, depending on storage method

    const goToBoards = () => {
        router.push("/b");
    };
    const joinTheFun = () => {
        router.push("/a");
    };

    return (
        <div className={style.notFound}>
            <Image
                src={NotFound}
                alt="not-found-logo"
                className={style.notFound__logo}
                height={200}
            />
            <h1>Page not found!</h1>
            <p className="subheader">
                {quote404[Math.floor(Math.random() * quote404.length)]}
            </p>
            <div className={style.notFound__button_div}>
                <button
                    className="btn-full-width btn-solid-pink"
                    onClick={token ? goToBoards : joinTheFun}
                >
                    {token ? "Go to Boards" : "Join the fun!"}
                </button>
            </div>
        </div>
    );
}
