import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { Housinglocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
selector: 'app-home',
standalone: true,
imports: [HousingLocationComponent , CommonModule],
template: `
<section>
<form>
<div class="form-group">
<input type="text" class= "form-control" placeholder="Filter by city" #filter>
</div>
<div class="form-group">
<button class="primary" type="button" (click) = "filterResults(filter.value)">Search</button>
</div>
</form>
</section>
<section class="results">
<app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"> </app-housing-location>
</section>

`,
styleUrl: './home.component.css'
})
export class HomeComponent {

readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';


housingLocationList: Housinglocation[] = [];

filteredLocationList:Housinglocation[] = [];

housingService:HousingService = inject(HousingService);

constructor() {

  this.housingLocationList = this.housingService.getAllHousingLocations();

  this.filteredLocationList = this.housingLocationList;

  console.log(this.housingLocationList);
  
}

filterResults(text:string) {

  if(!text) {
    this.filteredLocationList= this.housingLocationList;
    return;
  }

  this.filteredLocationList = this.housingLocationList.
                                                  filter(hl => hl?.city.toLowerCase().
                                                                        includes(text.toLowerCase()));

    
}

}
