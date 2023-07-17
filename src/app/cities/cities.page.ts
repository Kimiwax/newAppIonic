import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {

  cities:any = [];

  constructor(private router:Router, private httpCliente: HttpClient, public toastController:ToastController, public alertController: AlertController) { }

  ngOnInit() {
    this.getCities().subscribe(res=>{
      console.log("res",res);
      this.cities = res;
    });
  }

  getCities(){
    return this.httpCliente.get("assets/files/cities.json").pipe(
      map((res:any)=>{
        return res.data;
      })
    )
  }

  async presentToast(){
    const toast = await this.toastController.create({
      message:'Ciudad Seleccionada',
      duration: 2000,
      position: "bottom"
    });
    toast.present()
  }

  async presentAlert1(){
    const alert = await this.alertController.create({
      header:"Borrar ciudad",
      message: "Se elimino la ciudad correctamente",
      buttons:["OK"]
    });
    await alert.present()
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  async presentAlert2(){
    const alert = await this.alertController.create({
      header:"Borrar ciudad",
      message: "Estás Seguro",
      buttons:[
        {
          text: 'No',
          handler: () => {
            console.log("No cancel");
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log("Ciudad Eliminada");
            
          }
        }
      ]
    });
    await alert.present()
    let result = await alert.onDidDismiss();
    console.log(result);
  }
}
