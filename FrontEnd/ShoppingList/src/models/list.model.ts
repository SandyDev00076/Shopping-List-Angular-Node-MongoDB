import { Item } from './item.model';

export class List {
    listId: number;
    createdOn: string;
    listName: string;
    listItems: Item[];
    listCategory: string;
}