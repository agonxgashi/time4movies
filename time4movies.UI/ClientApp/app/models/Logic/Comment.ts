export class Comment {
    id        : number;
    parentId  : number;
    movieId   : number;
    movieTitle: string;
    userId    : number;
    authorName: string;
    content   : string;
    createDate: Date;
}