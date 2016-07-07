import { Component,OnInit,AfterViewChecked } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { NameListService } from '../shared/index';
import { Musique } from './musique';
import { Observable } from 'rxjs/Observable';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES]
})

export class HomeComponent implements OnInit {

  newName: string;
  datas: Musique[];


  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public nameListService: NameListService) {
    //this.datasObservable$ = this.nameListService.load();
  }

  ngOnInit() {



  }



  /**
   * Calls the add method of the NameListService with the current newName value of the form.
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    this.nameListService.add(this.newName);
    this.newName = '';
    return false;
  }

}
