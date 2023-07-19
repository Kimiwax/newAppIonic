import { Component, OnInit } from '@angular/core';
import {Geolocation} from '@awesome-cordova-plugins/geolocation/ngx';
import {NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions} from '@awesome-cordova-plugins/native-geocoder/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  coords:any;
  cityFounded:any;
  constructor(private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, public alertController: AlertController) { }

  ngOnInit() {
  }

  async locate(){
    const coordinates = await this.geolocation.getCurrentPosition();
    this.coords = coordinates.coords;
    console.log("Coords:", this.coords);
    this.getCity(this.coords.latitude, this.coords.longitude)
  }

  getCity(latitude:any,longitude:any){
    let options: NativeGeocoderOptions = {
      useLocale:true,
      maxResults:5
    };

    this.nativeGeocoder.reverseGeocode(latitude,longitude,options)
    .then((result:NativeGeocoderResult[])=>
    this.saveCity(result)
    )
    .catch((error:any)=>
      console.log(error))
      
  }

  saveCity(result:any){
    console.log((JSON.stringify(result[0])));
    this.cityFounded = ((JSON.stringify(result[0].locality)))
    this.presentAlert();
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: "Tu ciudad es",
      message: this.cityFounded,
      buttons:['OK']
    })
    await alert.present()
    let result = await alert.onDidDismiss();
    console.log(result);
    
  }
}
