import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
/**
 * Generated class for the IntraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intra',
  templateUrl: 'intra.html',
})
export class IntraPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  GoToMap(){
    this.navCtrl.push(HomePage)
  }

}
