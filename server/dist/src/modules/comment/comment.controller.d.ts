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
        content: string;
        postId: string;
        authorId: string;
        createdAt: Date;
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
        content: string;
        postId: string;
        authorId: string;
        createdAt: Date;
    })[]>;
    findByPost(postId: string): Promise<({
        author: {
            id: string;
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        content: string;
        postId: string;
        authorId: string;
        createdAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        post: {
            id: string;
            content: string;
            authorId: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
        };
        author: {
            id: string;
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        content: string;
        postId: string;
        authorId: string;
        createdAt: Date;
    }>;
    update(req: Request, id: string, dto: UpdateCommentDto): Promise<{
        id: string;
        content: string;
        postId: string;
        authorId: string;
        createdAt: Date;
    }>;
    remove(req: Request, id: string): Promise<{
        id: string;
        content: string;
        postId: string;
        authorId: string;
        createdAt: Date;
    }>;
}
