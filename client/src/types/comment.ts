import {User} from './user';

export type Comment = {
    id: string;
    content: string;
    author: User;
    postId: string;
    createdAt: string;
};