export interface Post {
    id_post?: number,
    title: string,
    content: string,
    media?: string,
    created_at: number,
    updated_at: number,
    id_user?: number
}