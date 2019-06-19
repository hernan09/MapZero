import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';
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
  
  peperoni:boolean=false

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
    
  }

  GoToMap(){
    this.navCtrl.push(HomePage)
  }
  change(e){
   console.log(e.value)
   
  }

}
