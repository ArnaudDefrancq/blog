import { DAO } from "../DAO/DAO";
import { Comment } from "../Types/Comment";

export class CommentModel {
    private commentDao: DAO<Comment>;

    constructor() {
        this.commentDao = new DAO('comments');
    }

    public createComment(comment: Comment, callback: (error: Error | null, insertId?: number) => void) : void {
        return this.commentDao.create(comment, callback);
    }
    
    public findComment(where: string, select: string = "*", queryString?: string): Promise<Comment[]> {
        return  this.commentDao.find(where, select, queryString);
    }
    
    public findById(id: number, select: string = "*",queryString?: string): Promise<Comment[]> {
        return this.commentDao.findById(id, select, queryString);
    }
    
    public updateComment(id: number, comment: Partial<Comment>, callback: (error: Error | null, affectedRows?: number) => void): void {
        return this.commentDao.update(id, comment, callback)
    }
    
    public deleteComment(id: number,  callback: (error: Error | null, affectedRows?: number) => void) {
        return this.commentDao.delete(id, callback);
    }
}