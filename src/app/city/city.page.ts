import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {

  id:any;
  finalId: number = 0;
  cities:any = [];
  name?:string;
  image?:string;
  description?:string

  constructor(private activatedRoute:ActivatedRoute, private httpCliente: HttpClient) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.finalId = this.id - 1;
    console.log("id", this.id);

    this.getCities().subscribe(res=>{
      console.log("res",res);
      this.cities = res;
      this.name = this.cities[this.finalId].name
      this.image = this.cities[this.finalId].image
      this.description = this.cities[this.finalId].description
      console.log("Name", this.name);
      
    });
    
  }

  getCities(){
    return this.httpCliente.get("assets/files/cities.json").pipe(
      map((res:any)=>{
        return res.data;
      })
    )
  }

}
