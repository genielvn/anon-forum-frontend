import React from "react";
import Image from "next/image";
import style from "./UserBanner.module.scss";
import banner from "@/public/default_banner.jpg";
import icon from "@/public/default_basil.jpg";

interface UserBannerProps {
    message?: string;
}

const UserBanner: React.FC<UserBannerProps> = ({}) => {
    return (
        
            <div className={style.banner__box}>
                <Image
                    src={banner}
                    className={style.banner__cover}
                    alt="cover"
                    objectFit="cover"
                />
                <div className={style.banner__details}>
                    <Image
                        src={icon}
                        height={120}
                        width={120}
                        alt="profile-pic"
                        objectFit="fill"
                        className={style.banner__image}
                    ></Image>
                    <div className={style.banner__text}>
                        <div className={style.banner__text_user}>SmiliePop</div>
                        <div className={style.banner__text_school}>
                            Far Eastern University
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default UserBanner;
