import { IComment } from './IComment';

export interface IPost {
    _id: string;
    title: string;
    content: string;
    price: number;
    createdBy: string;
    createdOn: Date;
    category: string;
    images: [string];
    comments: [IComment];
}
