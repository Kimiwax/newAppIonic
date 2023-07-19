import { Component, getPlatform } from '@angular/core';
import { Share } from '@capacitor/share';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Customers', url: '/customers', icon: 'people' },
    { title: 'Cities', url: '/cities', icon: 'location' },
    {title: 'Location', url:'/location', icon: 'navigate'}
  ];

  constructor() {}


ngOnInit(){
  console.log("Plataforma:", getPlatform());
}

  shareApp(){
      Share.share({
      title: 'Has visto la nueva App X',
      text: 'Descarga ya!',
      url: 'http://ionicframework.com/',
    });
  }
}
