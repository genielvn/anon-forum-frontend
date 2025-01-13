"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./page.module.scss";

export default function AccountSignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleSignInSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage(""); // Clear any previous errors

        try {
            const response = await fetch("http://127.0.0.1:8000/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                // Store the JWT token in localStorage or cookies
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", data.user);
                localStorage.setItem("isAdmin", data.isAdmin);
                localStorage.setItem("isBanned", data.isBanned);

                // Redirect to the boards list or homepage
                router.push("/b");
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || "Invalid credentials.");
            }
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <h1> Welcome back! </h1>
            <form onSubmit={handleSignInSubmit}>
                <div className={style.account__input_divider}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={style.account__input_divider}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && (
                    <p className={style.error_message}>{errorMessage}</p>
                )}
                <div className={style.account__input_buttons}>
                    <button
                        type="button"
                        className="btn-full-width btn-hollow-pink margin-bottom-20"
                        onClick={() => router.push("/a/sign-up")}
                    >
                        {"Don't have an account?"}
                    </button>
                    <button
                        type="submit"
                        className="btn-full-width btn-solid-pink"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </>
    );
}
