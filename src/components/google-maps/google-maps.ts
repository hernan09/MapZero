import { Component, ViewChild } from '@angular/core';
import { ToastController, NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Vibration } from '@ionic-native/vibration';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { Title } from '@angular/platform-browser';
import { _ParseAST } from '@angular/compiler';
import { HomePage } from '../../pages/home/home';


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
  desde:string
  hacia:string
  polilyne:any
  poliOption:any
  directionDisplay:any
  directionService:any
  constructor(public toastCtrl: ToastController,public http:HttpClient,private vibration: Vibration,private launchNavigator: LaunchNavigator,public navctrl:NavController) {
    

  }
   
  ngOnInit(){

     this.initMap();

     this.generateMarker();
     
     //this.getmarker();
     
    
  }

   //borrar marcador

   borrarMarker(marker2){

    google.maps.event.addListener(marker2, 'click', ()=>{
       console.log("estoy borrando")
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

      //this.navctrl.push(HomePage)
      
    });
  
  }
  initMap(){
    
    let coords=new google.maps.LatLng(-42,-66.53456);

    let coords2=new google.maps.LatLng(-45,-67.53456); 

    let mapsOptions:google.maps.MapOptions={
      center:coords,
      mapTypeControl: true,
      zoom:3,
      fullscreenControl:false,
      
      mapTypeId:google.maps.MapTypeId.HYBRID
    }

    this.map=new google.maps.Map(this.mapElement.nativeElement,mapsOptions)
    
   

    let objconfigDS = {
       origin:coords,
       destination:coords2,
       travelMode:google.maps.TravelMode.DRIVING
    }

    this.directionService = new google.maps.DirectionsService();

    this.directionDisplay = new google.maps.DirectionsRenderer({
      map:this.map
    });

    this.directionService.route(objconfigDS, (response, status) => {
      console.log("callback route")
      if (status === 'OK') {
        this.directionDisplay.setDirections(response)
      }
    })
  
    

    let marker: google.maps.Marker=new google.maps.Marker({
      map:this.map,
      position:coords,
      draggable: false,
      title:'usted se encuentra en '+ coords
      
    })

  }

  trazarRuta(){

    const coords2 = new google.maps.LatLng(-46,-67.53456);

    this.map.addListener('click',()=>{

    console.log('coords',coords2)

      this.polilyne=new google.maps.Polyline({
        strokeColor:'#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        visible:true
      })

      this.polilyne.setMap(this.map)
       
      let path = this.polilyne.getPath(); 
      
      path.push(coords2)

      console.log(path)

      let marker3 = new google.maps.Marker({
        position:coords2,
        title:'hasta aca sigue la ruta',
        map:this.map
        
      })
    })
   
  }


  zonasArg(){

    this.http.get(`https://apis.datos.gob.ar/georef/api/ubicacion?lat=${this.lat}&lon=${this.lng}`).subscribe(res=>{

      this.zona=res

      //alert('departamento de :'+JSON.stringify(this.zona.ubicacion.departamento.nombre +' provincia de :'+JSON.stringify(this.zona.ubicacion.provincia.nombre)))
       if(this.zona.ubicacion.departamento.nombre==null){
        this.vibration.vibrate(1000);
        const toast = this.toastCtrl.create({
          message: 'la App no funciona fuera de Argentina',
          duration: 3000,
          position:'Middle',
          cssClass:'poapfalse'
          
        });
        toast.present();
       }else{
        const toast = this.toastCtrl.create({

          message: 'departamento de :'+JSON.stringify(this.zona.ubicacion.departamento.nombre)+' provincia de :'+JSON.stringify(this.zona.ubicacion.provincia.nombre),
          duration: 3000,
          position:'Middle'
        });
        toast.present();
       }


     

    })
    
  }
//generar marcadores

  getmarker(){

    this.http.get(' https://apis.datos.gob.ar/georef/api/provincias').subscribe((data)=>{
      
        this.dataMarker=data

        let cantidad = this.dataMarker.cantidad
        
      
        let provincias=this.dataMarker.provincias

        for(let i = 0;i<=provincias.length-1;i++){
          

           let texto=`<ion-item>
           <ion-avatar item-start>
             <ion-icon name="map"></ion-icon>
           </ion-avatar>
           <h2>Provincias</h2>
           <p>vista de provincias</p>
           
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
  borrarTodosMarker(){
      this.borrarMarker(this.dataMarker)
  }
  
 

}
