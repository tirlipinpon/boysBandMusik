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
  datasObservable$: Observable<Musique[]>;

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
    this.load();
  }

  load(){
    const osevableObject$ = this.nameListService.load();
    osevableObject$.subscribe(
      (data:Musique[]) => {
        this.datas = data
      , console.log(this.datas) },
      err => console.error("Error occuried:", err),
      () => console.log("completed")
    );
  }

  delete(id:number){
    this.nameListService.delete(id);
    this.load();
  }

// saveMusique(musique:string){
//   this.nameListService.createMusique(musique)
//   .subscribe(
//     () => {
//       this.nameListService.load();
//       console.log('musique saved successfuly');
//     },
//     err => console.error(err)
//   );
// }


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
