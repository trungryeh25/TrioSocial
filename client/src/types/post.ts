import { User } from "./user";
import { Comment } from "./comment";

export type Post = {
    id: string;
    title: string;
    content: string;
    author: User;
    comments: Comment[];
    createdAt: string;
}