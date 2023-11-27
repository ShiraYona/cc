import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GiftsListComponent } from './gifts-list/gifts-list.component';
import { DonorsListComponent } from './donors-list/donors-list.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'manager',component:ManagerHomeComponent,children:[
   {path:'donors',component:DonorsListComponent},
   {path:'gifts',component:GiftsListComponent}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }//318900652665
////318900652665.signin.aws.amazon.com/console
