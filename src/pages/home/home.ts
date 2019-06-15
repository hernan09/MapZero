import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IntraPage } from '../intra/intra';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  gotoIntra(){
    this.navCtrl.push(IntraPage)
  }
}
