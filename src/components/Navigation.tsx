import style from "./Navigation.module.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";

const Navigation = () => {
    return (
        <nav>
            <Image src={Logo} alt="logo" width={40}></Image>
            <div className={style.menu}>
                <Link href={"/"} className={style.menu__list}>
                    Boards
                </Link>
            </div>
            <Link href={"/user"}>
                <i className={`bi bi-person-circle ${style.account}`}></i>
            </Link>
        </nav>
    );
};

export default Navigation;
