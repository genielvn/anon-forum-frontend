"use client";

import UserBanner from "@/components/UserBanner";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useRef, useState } from "react";
import banner from "@/public/default_banner.jpg";
import icon from "@/public/default_basil.jpg";
import style from "./page.module.scss";

interface User {
    username: string;
    profile_banner: string | null;
    profile_picture: string | null;
}
interface UserData {
    user: User;
}

export default function UserYou() {
    const { data, error, isLoading } = useFetch<UserData>(
        `http://127.0.0.1:8000/u/`
    );

    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [profileBanner, setProfileBanner] = useState<File | null>(null);
    const [profilePreview, setProfilePreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const profileInputRef = useRef<HTMLInputElement | null>(null);
    const bannerInputRef = useRef<HTMLInputElement | null>(null);

    const handleProfileUpload = async () => {
        if (!profilePicture) {
            console.error("No profile picture selected.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("User is not authenticated.");
            return;
        }

        const formData = new FormData();
        formData.append("profile_picture", profilePicture);

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/s/upload-profile-picture/`,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Profile picture upload failed:", errorData);
                return;
            }

            console.log("Profile picture uploaded successfully.");
            window.location.reload();
        } catch (error) {
            console.error(
                "An error occurred while uploading the profile picture:",
                error
            );
        }
    };

    const handleBannerUpload = async () => {
        if (!profileBanner) {
            console.error("No profile banner selected.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("User is not authenticated.");
            return;
        }

        const formData = new FormData();
        formData.append("profile_banner", profileBanner);

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/s/upload-banner/`,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Profile banner upload failed:", errorData);
                return;
            }

            console.log("Profile banner uploaded successfully.");
            window.location.reload();
        } catch (error) {
            console.error(
                "An error occurred while uploading the profile banner:",
                error
            );
        }
    };

    const handleAccountDeletion = async () => {
        const confirmation = confirm(
            "Are you sure you want to delete your account? This action is irreversible."
        );

        if (!confirmation) return;

        const token = localStorage.getItem("token");
        if (!token) {
            console.error("User is not authenticated.");
            return;
        }

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/s/delete-account/`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Account deletion failed:", errorData);
                alert("Failed to delete the account. Please try again.");
                return;
            }

            alert("Your account has been deleted successfully.");
            localStorage.removeItem("token");
            window.location.href = "/a";
        } catch (error) {
            console.error(
                "An error occurred while deleting the account:",
                error
            );
            alert("Something went wrong. Please try again.");
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return notFound();
    }

    return (
        <>
            <UserBanner data={data?.user} />
            <div className={style.settings__main}>
                <h2>Settings</h2>
                <div className={style.settings__division}>
                    <h3>Decoration</h3>
                    <p>Change your profile picture and banner by tapping the images.</p>
                    <div className={style.settings__profile_upload}>
                        {/* Profile Picture */}
                        <div className={style.settings__profile_division}>
                            <Image
                                src={
                                    profilePreview
                                        ? profilePreview
                                        : data?.user.profile_picture
                                        ? `http://127.0.0.1:8000${data?.user.profile_picture}`
                                        : icon
                                }
                                alt="Profile Picture"
                                width={120}
                                height={120}
                                objectFit="fill"
                                className={style.settings__profile_picture}
                                onClick={() => profileInputRef.current?.click()} // Trigger input on image click
                            />
                            <input
                                ref={profileInputRef}
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files
                                        ? e.target.files[0]
                                        : null;
                                    setProfilePicture(file);
                                    setProfilePreview(
                                        file ? URL.createObjectURL(file) : null
                                    );
                                }}
                                className={style.settings__upload_hidden}
                                accept="image/*"
                            />
                            {profilePicture && (
                                <button
                                    className="btn-small btn-pink margin-top-5"
                                    onClick={handleProfileUpload}
                                >
                                    Upload
                                </button>
                            )}
                        </div>

                        {/* Profile Banner */}
                        <div
                            className={`${style.settings__100} ${style.settings__profile_division}`}
                        >
                            <Image
                                src={
                                    bannerPreview
                                        ? bannerPreview
                                        : data?.user.profile_banner
                                        ? `http://127.0.0.1:8000${data?.user.profile_banner}`
                                        : banner
                                }
                                alt="Profile Banner"
                                className={`${style.settings__profile_picture} ${style.settings__profile_banner}`}
                                onClick={() => bannerInputRef.current?.click()} // Trigger input on image click
                                width={500}
                                height={500}
                            />
                            <input
                                ref={bannerInputRef}
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files
                                        ? e.target.files[0]
                                        : null;
                                    setProfileBanner(file);
                                    setBannerPreview(
                                        file ? URL.createObjectURL(file) : null
                                    );
                                }}
                                className={style.settings__upload_hidden}
                                accept="image/*"
                            />
                            {profileBanner && (
                                <button
                                    className="btn-small btn-pink margin-top-5"
                                    onClick={handleBannerUpload}
                                >
                                    Upload
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className={style.settings__division}>
                    <h3>Danger Zone</h3>
                    <button
                        className="btn-small btn-red"
                        onClick={handleAccountDeletion}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </>
    );
}
