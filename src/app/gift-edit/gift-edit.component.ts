import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GiftsService } from '../services/gifts.service';
import { Gift } from '../models/gift.model';

@Component({
  selector: 'app-gift-edit',
  templateUrl: './gift-edit.component.html',
  styleUrls: ['./gift-edit.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class GiftEditComponent implements OnChanges {
  @Input()
  giftId: number = 0;

  constructor(private giftService: GiftsService, private messageService: MessageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.giftService.getGiftById(this.giftId).subscribe(gift => this.gift = gift);
  }

  gift: Gift = new Gift();
  
  submitted: boolean = false;
  @Input()
  giftDialog: boolean = true;
  @Output()
  giftDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  hideDialog() {
    this.giftDialog = false;
    this.giftDialogChange.emit(this.giftDialog);
    this.submitted = false;
  }
  saveGift() {
    this.submitted = true;
    if (this.gift.name.trim()) {
      if (this.gift.id) {//אם יש לו אי די אז שולחים אותו לעדכון
        this.giftService.saveGift(this.gift).subscribe(b => {
          this.giftService.setReloadGift();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bank Updated', life: 3000 });
          
        });
      }
      else {//אחרת שולחים להוספה
        this.giftService.addGift(this.gift).subscribe(a => {
          this.giftService.setReloadGift();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bank Created', life: 3000 });
        });
      this.giftService.getGifts();
      }

      this.giftDialogChange.emit(this.giftDialog);
      this.gift = new Gift();
    }  this.hideDialog();
  }


}
