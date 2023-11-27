import { Component,EventEmitter ,OnChanges,Output, SimpleChanges,Input} from '@angular/core';
import { DonorsService } from '../services/donors.service';
import { Donor } from '../models/donor.model';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-donor-edit',
  templateUrl: './donor-edit.component.html',
  styleUrls: ['./donor-edit.component.css']
})
export class DonorEditComponent implements OnChanges{
  @Input()
  donorId: number = 0;

  constructor(private donorService: DonorsService, private messageService: MessageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.donorService.getDonorById(this.donorId).subscribe(donor => this.donor = donor);
  }

  donor: Donor = new Donor();
  
  submitted: boolean = false;
  @Input()
  donorDialog: boolean = true;
  @Output()
  donorDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  hideDialog() {
    this.donorDialog = false;
    this.donorDialogChange.emit(this.donorDialog);
    this.submitted = false;
  }
  saveDonor() {
    this.submitted = true;
    if (this.donor.name.trim()) {
      if (this.donor.id) {//אם יש לו אי די אז שולחים אותו לעדכון
        this.donorService.saveDonor(this.donor).subscribe(b => {
          this.donorService.setReloadDonor();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bank Updated', life: 3000 });
          
        });
      }
      else {//אחרת שולחים להוספה
        this.donorService.addDonor(this.donor).subscribe(a => {
          this.donorService.setReloadDonor();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Bank Created', life: 3000 });
        });
      this.donorService.getDonors();
      }

      this.donorDialogChange.emit(this.donorDialog);
      this.donor = new Donor();
    }  this.hideDialog();
  }
}
