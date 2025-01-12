"use client";

interface UserProps {
    params: {
        username: string;
    };
}

export default function UserOthers({ params }: UserProps) {
    const { username } = params;

    return <>{username}</>;
}
