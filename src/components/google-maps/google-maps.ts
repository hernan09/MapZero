import { Component, ViewChild } from '@angular/core';

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

  constructor() {
   
  }

  ngOnInit(){
    this.initMap();
  }

  initMap(){
    let coords=new google.maps.LatLng(-33,-60.53456);
    let mapsOptions:google.maps.MapOptions={
      center:coords,
      zoom:7,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    }
    this.map=new google.maps.Map(this.mapElement.nativeElement,mapsOptions)

    let marker: google.maps.Marker=new google.maps.Marker({
      map:this.map,
      position:coords

    })
  }

}
