import axios from "axios";
import { BoardData } from "@/types/board";
import {
    SingleBoardThreadData,
    BoardThreadListData,
} from "@/types/boardthread";
import { ReplyData } from "@/types/reply";
import { ThreadData } from "@/types/thread";
import { UserBoardThreadData } from "@/types/userboardthread";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/",
});

api.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// All of these must be aunthenticated to access
export const getBoards = () => api.get<BoardData[]>("/b/");
export const getBoard = (board_id: string) =>
    api.get<BoardData>(`/b/${board_id}/details`);
export const getFeed = () => api.get<ThreadData[]>("/f/");
export const getThreads = (board_id: string) =>
    api.get<BoardThreadListData>(`/b/${board_id}/`);
export const getThread = (board_id: string, thread_id: number) =>
    api.get<SingleBoardThreadData>(`/b/${board_id}/${thread_id}/`);
export const getReplies = (board_id: string, thread_id: number) =>
    api.get<ReplyData[]>(`/b/${board_id}/${thread_id}/replies/`);
export const getSelfUserData = () => api.get<UserBoardThreadData>("/u/");
export const getUserData = (username: string) =>
    api.get<UserBoardThreadData>(`/u/${username}/`);
export const createThread = (board_id: string, data: FormData) =>
    api.post(`/b/${board_id}/create/`, data);
export const createReply = (
    board_id: string,
    thread_id: number,
    data: FormData
) => api.post(`/b/${board_id}/${thread_id}/reply/`, data);
export const editThread = (
    board_id: string,
    thread_id: number,
    data: FormData
) => api.put(`/b/${board_id}/${thread_id}/edit/`, data);
export const deleteThread = (board_id: string, thread_id: number) =>
    api.delete(`/b/${board_id}/${thread_id}/delete/`);
export const deleteReply = (id: number) => api.delete(`/replies/${id}/delete/`);
export const banUser = (username: string) => api.post(`/u/${username}/ban/`);
export const uploadProfilePicture = (data: FormData) =>
    api.post("/s/upload-profile-picture/", data);
export const uploadProfileBanner = (data: FormData) =>
    api.post("/s/upload-banner/", data);
export const deleteAccount = () => api.delete("/s/delete-account/");

// These are public endpoints
export const loginUser = async (username: string, password: string) => {
    const response = await api.post("/auth/login/", { username, password });
    const { token } = response.data;

    Cookies.set("token", token, { expires: 7 });

    return response;
};
export const signUpUser = async (
    username: string,
    password: string,
    email: string,
    university: string
) => {
    const response = await api.post("/auth/signup/", {
        username,
        password,
        email,
        university,
    });
    const { token } = response.data;

    Cookies.set("token", token, { expires: 7 });

    return response;
};
export const getUniversities = () => api.get("/universities/");
export const verifyToken = () => api.get("/auth/verify/");
