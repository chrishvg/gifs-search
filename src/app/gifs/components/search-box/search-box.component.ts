import { GifsService } from './../../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs"
      (keyup.enter)="searchTag()"
      #txtTagInput
    >`
})



export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  txtTagInput!: ElementRef<HTMLInputElement>;

  constructor(private GifsService:GifsService) {}

  searchTag(){
    const newTag = this.txtTagInput.nativeElement.value

    this.GifsService.searchTag(newTag)
    this.txtTagInput.nativeElement.value=''
  }
}
