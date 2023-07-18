import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {

  users:any = [];
  searchedUser:any;
  permission?:boolean;

  constructor(private router:Router, private httpCliente: HttpClient) { }

  ngOnInit() {
    this.permission = true;
    this.getUsers().subscribe(res=>{
      console.log("res",res);
      this.users = res;
      this.searchedUser = this.users;
    });
    
  }

  goToHome(){
    this.router.navigate(['/home'])
  }

  getUsers(){
    return this.httpCliente.get("assets/files/customers.json").pipe(
      map((res:any)=>{
        return res.data;
      })
    )
  }

  searchCustomer(event:any){
    const text = event.target.value;
    this.searchedUser = this.users;
    if(text && text.trim() != ""){
      this.searchedUser = this.searchedUser.filter((user:any)=>{
        return (user.name.toLowerCase().indexOf(text.toLowerCase()) > -1)
      })
    }
  }

  handleRefresh(event:any) {
    this.getUsers();
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

}
