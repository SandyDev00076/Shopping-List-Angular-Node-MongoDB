import { Component } from '@angular/core';
import { List } from '../../models/list.model';
import { Item } from '../../models/item.model';
import { GetLists } from '../../services/getLists.service';
import { ToastController } from 'ionic-angular';

@Component({
    selector: 'list-page',
    templateUrl: './listPage.html'
})
export class ListPage {
    lists:List[] = [];

    constructor(private getListService: GetLists,
                private toastCtrl: ToastController) { }

    ionViewDidLoad() {
        this.lists = [];
        this.getListService.getLists().subscribe((data) => {
            console.log(data);
            data.forEach(element => {
                let itemarray = Array<Item>();
                element.listItems.forEach(ele => {
                    let item = new Item();
                    item.itemName = ele.itemName;
                    item.itemQuantity = ele.itemQuantity;
                    item.itemUnit = ele.itemUnit;

                    itemarray.push(item);
                });

                let list = new List();
                list.createdOn = element.createdOn;
                list.listCategory = element.listCategory;
                list.listId = element.listId;
                list.listItems = itemarray;
                list.listName = element.listName;

                this.lists.push(list);
            });
        }, (error) => {
            this.toastCtrl.create({
                message: 'Problem occurred while fetching lists',
                showCloseButton: true,
                closeButtonText: 'OK'
            }).present();
        });
    }

    addList() {
        console.log('Add Item button clicked!');
    }
}