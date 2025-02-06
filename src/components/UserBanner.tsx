/**
 * Program Title: User Banner Component (UserBanner.tsx)
 *
 * Programmers: Genesis Lovino, David Andrei Estrella
 *
 * Purpose:
 * - This component is used to display a banner with user information, such as username and user status.
 *
 * Where the program fits in the general system designs:
 * - This file is part of the frontend of the application. It is a reusable component that can be used across different pages to display user information.
 *
 * Date written: April 2024
 * Date revised: January 2025
 *
 * Data structures used:
 * - UserBannerProps: Interface for the user banner component's props, containing username and status.
 *
 * Algorithms used:
 * - None
 *
 * Control Structures:
 * - Conditional rendering for displaying user status.
 */

import React from "react";
import Image from "next/image";
import style from "./UserBanner.module.scss";
import banner from "@/public/default_banner.jpg";
import icon from "@/public/default_basil.jpg";

interface User {
    username: string;
    profile_banner: string | null;
    profile_picture: string | null;
    university: string;
    is_banned: string;
    is_admin: string;
}
interface UserBannerProps {
    data: User | undefined;
}

export default function UserBanner({ data }: UserBannerProps) {
    return (
        <div className={style.banner__box}>
            <Image
                src={
                    data?.profile_banner
                        ? `http://127.0.0.1:8000${data?.profile_banner}`
                        : banner
                }
                className={style.banner__cover}
                alt="cover"
                objectFit="cover"
                height={500}
                width={500}
            />
            <div className={style.banner__details}>
                <Image
                    src={
                        data?.profile_picture
                            ? `http://127.0.0.1:8000${data?.profile_picture}`
                            : icon
                    }
                    height={120}
                    width={120}
                    alt="profile-pic"
                    objectFit="fill"
                    className={style.banner__image}
                ></Image>
                <div className={style.banner__text}>
                    <div className={style.banner__text_user}>
                        {data?.username}
                    </div>
                    <div className={style.banner__text_school}>
                        {data?.university}
                    </div>
                </div>
            </div>
        </div>
    );
}
