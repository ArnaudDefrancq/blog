import { DAO } from "../DAO/DAO";
import { Like_post } from "../Types/Like_post";


export class Like_postModel {
    private like_postDao: DAO<Like_post>;

    constructor() {
        this.like_postDao = new DAO('like_posts');
    }

    public createLike_post(like_posts: Like_post, callback: (error: Error | null, insertId?: number) => void) : void {
      return this.like_postDao.create(like_posts, callback);
    }
  
    public findLike_post(where: string, select: string = "*", queryString?: string): Promise<Like_post[]> {
      return  this.like_postDao.find(where, select, queryString);
    }
  
    public findById(id: number, select: string = "*",queryString?: string): Promise<Like_post[]> {
      return this.like_postDao.findById(id, select, queryString);
    }
    
    public deleteLike_post(id: number,  callback: (error: Error | null, affectedRows?: number) => void) {
      return this.like_postDao.delete(id, callback);
    }
}