import { Component, OnInit } from '@angular/core';
import { Gift } from '../models/gift.model';
import { GiftsService } from '../services/gifts.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-gifts-list',
  templateUrl: './gifts-list.component.html',
  styleUrls: ['./gifts-list.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class GiftsListComponent implements OnInit {

  giftDialog: boolean = false;

  gifts: Gift[] = [];

  gift: Gift = new Gift();

  selectedGifts!: Gift[];

  submitted!: boolean;


  constructor(public giftService: GiftsService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.giftService.reloadGifts$.subscribe(x => {
        this.giftService.getGifts().subscribe(data => this.gifts = data);
    });
  }

  openNew() {
    this.gift = new Gift();
    this.submitted = false;
    this.giftDialog = true;
  }
  deleteSelectedGifts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Gifts?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.gifts = this.gifts.filter(val => !this.selectedGifts.includes(val));
        this.selectedGifts = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gifts Deleted', life: 3000 });
      }
    });
  }

  editGift(gift: Gift) {
    this.gift = { ...gift };
    this.giftDialog = true;
  }

  //למה לפונקציה הזאת אין קריאה מהסרויס?
  deleteGift(gift: Gift) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + gift.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.gifts = this.gifts.filter(val => val.id !== gift.id);
        this.gift = new Gift();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Gift Deleted', life: 3000 });
      }
    });
    // this.giftService.delete(gift.id);????????????
  }
}
