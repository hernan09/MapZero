import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';
import { GoogleMapsComponent } from '../../components/google-maps/google-maps';

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

  @ViewChild( GoogleMapsComponent) goglemap:GoogleMapsComponent
  
  peperoni:boolean=false

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {
    
  }
   
  GoToMap(){

    this.goglemap.getmarker()
  }
  
  change(e){
    
   console.log(e.value)
   
  }
  borrar(){
    console.log('borrar todo')
  }
 

}
