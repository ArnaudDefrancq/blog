export interface Comment {
    id_comment?: number,
    content: string,
    created_at: number,
    id_post: number,
    id_user: number
}

export interface CommentWithUser {
    id_comment?: number,
    content: string,
    created_at: number,
    id_post: number,
    id_user: number,
    pseudo: string
}