import { Component ,OnInit} from '@angular/core';
import { Donor } from '../models/donor.model';
import { DonorsService } from '../services/donors.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-donors-list',
  templateUrl: './donors-list.component.html',
  styleUrls: ['./donors-list.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class DonorsListComponent implements OnInit {
  constructor(public donorService: DonorsService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  donorDialog: boolean = false;

  donors: Donor[] = [];

  donor: Donor = new Donor();

  selectedDonor!: Donor[];

  submitted!: boolean;
//   this.giftService.reloadGifts$.subscribe(x => {
//     this.giftService.getGifts().subscribe(data => this.gifts = data);
// });
  ngOnInit() {
    this.donorService.reloadDonors$.subscribe(x => {
        this.donorService.getDonors().subscribe(data => this.donors = data);
   
    });
  }

  openNew() {
    this.donor = new Donor();
    this.submitted = false;
    this.donorDialog = true;
  }
  editDonor(donor: Donor) {
    this.donor = { ...donor };
    this.donorDialog = true;
  }
  deleteDonor(Donor:Donor){}
}
