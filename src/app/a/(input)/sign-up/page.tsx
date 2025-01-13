"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./page.module.scss";

export default function AccountSignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleSignInSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage("");

        if (password != confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/auth/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    email,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                router.push("/b");
            } else {
                const errorData = await response.json();
                console.log(errorData)
                setErrorMessage(errorData.error || "Invalid credentials.");
            }
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <h1> Welcome!</h1>
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
                <div className={style.account__input_divider}>
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={style.account__input_divider}>
                    <label htmlFor="email">School Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && (
                    <p className={style.account__input_divider}>
                        {errorMessage}
                    </p>
                )}
                <div className={style.account__input_buttons}>
                    <button
                        type="button"
                        className="btn-full-width btn-hollow-pink margin-bottom-20"
                        onClick={() => router.push("/a/sign-in")}
                    >
                        {"Already have an account?"}
                    </button>
                    <button
                        type="submit"
                        className="btn-full-width btn-solid-pink"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </>
    );
}
