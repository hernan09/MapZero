import { Component, ViewChild } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


/**
 * Generated class for the GoogleMapsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-maps',
  templateUrl: 'google-maps.html'
})
export class GoogleMapsComponent {
  

  @ViewChild('map') mapElement;
  map:any
  zona:any
  lat:number
  lng:number
  constructor(public toastCtrl: ToastController,public http:HttpClient) {
    
      
    
  }
   
  ngOnInit(){
    this.initMap();
    this.generateMarker();
    this.zonasArg()
  }
  
  generateMarker(){
    let cooords=new google.maps.LatLng(-33.233333,-61);
    let marker2:google.maps.Marker=new google.maps.Marker({
      map:this.map,
      icon:'../assets/imgs/origin2.png',
      title:'dea de urg',
      position:cooords ,
      draggable: true
    })
    
    google.maps.event.addListener(marker2, 'dragend', function() {

      this.lat=marker2.getPosition().lat();
      this.lng=marker2.getPosition().lng();
      alert('Latitud = '+marker2.getPosition().lat()+ ', Longitud = '+marker2.getPosition().lng());
      //const toast = this.toastCtrl.create({
        //message: 'Latitud:'+marker2.getPosition().lat+'longitud:'+marker2.getPosition().lng(),
        //duration: 3000
      //});
      //toast.present();
      
    });
    
  }
   

  initMap(){
    
    let coords=new google.maps.LatLng(-33,-60.53456);
    let mapsOptions:google.maps.MapOptions={
      center:coords,
      mapTypeControl: true,
      zoom:7,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    }
    this.map=new google.maps.Map(this.mapElement.nativeElement,mapsOptions)

    let marker: google.maps.Marker=new google.maps.Marker({
      map:this.map,
      position:coords,
      draggable: false,
      title:'usted se encuentra en '+ coords
      
    })

    
  }

  zonasArg(){
    //como hacer la bsuqueda dinamica 
    this.http.get(`https://apis.datos.gob.ar/georef/api/ubicacion?lat=${this.lat}&lon=${this.lng}`).subscribe(res=>{
    this.zona=res
    console.log(this.zona)
    })
  }

}
