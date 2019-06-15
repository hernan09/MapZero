import { Component, ViewChild } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


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
  dataMarker:any
  contador:number
  constructor(public toastCtrl: ToastController,public http:HttpClient) {
    

  }
   
  ngOnInit(){

     this.initMap();
     this.generateMarker();
     this.getmarker();
    
  }

   //borrar marcador

   borrarMarker(marker2){

    google.maps.event.addListener(marker2, 'click', ()=>{

      console.log("borrar")

      marker2.setMap(null)
    })
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
    
    google.maps.event.addListener(marker2, 'dragend', ()=>{

      this.lat=marker2.getPosition().lat();
      this.lng=marker2.getPosition().lng();
      
      this.zonasArg()
      
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

    this.http.get(`https://apis.datos.gob.ar/georef/api/ubicacion?lat=${this.lat}&lon=${this.lng}`).subscribe(res=>{

    this.zona=res

    alert('departamento de :'+JSON.stringify(this.zona.ubicacion.departamento.nombre +' provincia de :'+JSON.stringify(this.zona.ubicacion.provincia.nombre)))
    })
    
  }
//generar marcadores

  getmarker(){

    this.http.get(' https://apis.datos.gob.ar/georef/api/provincias').subscribe((data)=>{
      
       this.dataMarker=data
      
       let provincias=this.dataMarker.provincias
      for(let i = 0;i<=provincias.length-1;i++){
         this.contador++;
        let cooords=new google.maps.LatLng(provincias[i].centroide.lat,provincias[i].centroide.lon);
        let marker2:google.maps.Marker=new google.maps.Marker({
          map:this.map,
          title:'dea de urg',
          position:cooords ,
          draggable: false
        })
        this.borrarMarker(marker2);
      }
      
       
    })
  }
   
   
  
}
