import { Tag } from './tag';

export interface Ad {
    id: number;
    title: string;
    description: string;
    imagePath: string;
    tags: Tag[];
}