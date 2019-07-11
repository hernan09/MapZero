import { Component ,ViewChild, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';
import { GoogleMapsComponent } from '../../components/google-maps/google-maps';
import { HttpClient } from '@angular/common/http';

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
export class IntraPage implements OnInit{
   
   desde:any
   hacia:any
   provincias:any

  @ViewChild( GoogleMapsComponent) goglemap:GoogleMapsComponent
  
  peperoni:boolean=false

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public http:HttpClient) {
    
  }
   
  GoToMap(){

    this.goglemap.getmarker()

  }
  /*
   getdata(){
     this.http.get(`https://apis.datos.gob.ar/georef/api/provincias?nombre=${this.desde}`).subscribe(data=>{

       this.provincias=data
       console.log(this.provincias)
     })
   }
  */
 

  borrar(){
    console.log('borrar todo')
  }
 ngOnInit(){
   //this.getdata()
 }

}
