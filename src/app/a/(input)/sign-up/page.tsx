/**
 * Program Title: Sign Up Page (page.tsx)
 *
 * Programmers: Genesis Lovino, David Andrei Estrella
 *
 * Purpose:
 * - This component renders a sign-up form for new users to create an account.
 * - It handles user input for username, password, email, and university selection.
 * - It performs client-side validation and communicates with the backend API to register the user.
 *
 * Where the program fits in the general system designs:
 * - This page is part of the user authentication flow in the frontend application.
 * - It is responsible for the user registration process.
 *
 * Date written: April 2024
 * Date revised: January 2025
 *
 * Data structures used:
 * - useState hooks: for managing form input states and error messages.
 * - useEffect hook: for side effects such as fetching data and redirecting users.
 * - JSON objects: for sending data to the backend API.
 *
 * Algorithms used:
 * - Fetch API for making HTTP requests to the backend.
 * - Conditional rendering based on user authentication status and form validation.
 *
 * Control Structures:
 * - Conditional statements for rendering components based on user roles and states.
 * - Async/await for handling asynchronous API calls.
 * - useState hooks for managing component state.
 * - useEffect hooks for side effects and data fetching.
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import style from "./page.module.scss";

export default function AccountSignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [university, setUniversity] = useState("");
    const [universities, setUniversities] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/b"); // Redirect to /b if the token exists
        }

        const fetchUniversities = async () => {
            try {
                const response = await fetch(
                    "http://127.0.0.1:8000/universities/"
                );
                if (response.ok) {
                    const data = await response.json();
                    setUniversities(data);
                } else {
                    console.error("Failed to fetch universities.");
                }
            } catch (error) {
                console.error("Error fetching universities:", error);
            }
        };

        fetchUniversities();
    }, [router]);

    const handleSignInSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorMessage("");

        if (password !== confirmPassword) {
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
                    university,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", data.user);
                localStorage.setItem("isAdmin", data.isAdmin);
                localStorage.setItem("isBanned", data.isBanned);
                router.push("/b");
            } else {
                const errorData = await response.json();
                console.log(errorData);
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
                <div className={style.account__input_divider}>
                    <label htmlFor="university">Select University</label>
                    <select
                        id="university"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            Choose your university
                        </option>
                        {universities.map(
                            (uni: { university_id: string; name: string }) => (
                                <option
                                    key={uni.university_id}
                                    value={uni.university_id}
                                >
                                    {uni.name}
                                </option>
                            )
                        )}
                    </select>
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
