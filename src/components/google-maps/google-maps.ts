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

      //alert('departamento de :'+JSON.stringify(this.zona.ubicacion.departamento.nombre +' provincia de :'+JSON.stringify(this.zona.ubicacion.provincia.nombre)))

      const toast = this.toastCtrl.create({
        message: 'departamento de :'+JSON.stringify(this.zona.ubicacion.departamento.nombre)+' provincia de :'+JSON.stringify(this.zona.ubicacion.provincia.nombre),
        duration: 3000,
        position:'Middle'
      });
      toast.present();
    })
    
  }
//generar marcadores

  getmarker(){

    this.http.get(' https://apis.datos.gob.ar/georef/api/provincias').subscribe((data)=>{
      
        this.dataMarker=data
      
        let provincias=this.dataMarker.provincias
        for(let i = 0;i<=provincias.length-1;i++){
        

           let texto=`<ion-item>
           <ion-thumbnail >
             <img id="baner" src="../../assets/imgs/doctorGif.gif">
           </ion-thumbnail>
           <ion-item-divider>
              <ion-label>
                ${provincias[i].centroide.lat}
              </ion-label>
           </ion-item-divider>
           <ion-label>${provincias[i].nombre}</ion-label>
         </ion-item>`

           let cooords=new google.maps.LatLng(provincias[i].centroide.lat,provincias[i].centroide.lon);

           let marker2:google.maps.Marker=new google.maps.Marker({

            map:this.map,

            position:cooords ,

            draggable: false
           })
            
           let info= new google.maps.InfoWindow({
            content:texto
          })
          this.borrarMarker(marker2);
          this.verInfoMarker(marker2,info)
          this.sacarInfoMarker(marker2,info)
          
      }
      
       
    })
  }

  verInfoMarker(marker,info){
    marker.addListener('mouseover',()=>{

      info.open(this.map,marker)

   })
   
  }
  sacarInfoMarker(marker,info){

   marker.addListener('mouseout',()=>{

     info.close(this.map,marker)

   })

  }

}
