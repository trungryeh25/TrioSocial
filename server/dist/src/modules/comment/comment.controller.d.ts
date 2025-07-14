import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Request } from "express";
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(req: Request, dto: CreateCommentDto): Promise<{
        author: {
            id: string;
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
    }>;
    findAll(): Promise<({
        post: {
            id: string;
            title: string;
        };
        author: {
            id: string;
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
    })[]>;
    findByPost(postId: string): Promise<({
        author: {
            id: string;
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
    })[]>;
    findOne(id: string): Promise<{
        post: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            content: string;
            authorId: string;
        };
        author: {
            id: string;
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
    }>;
    update(req: Request, id: string, dto: UpdateCommentDto): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
    }>;
    remove(req: Request, id: string): Promise<{
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
    }>;
}
