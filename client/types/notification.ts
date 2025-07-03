export type Notification = {
    id: string;
    type: 'COMMENT' | 'VOTE' | 'FOLLOW';
    message: string;
    link: string;
    read: boolean;
    createdAt: string;
};