import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  code:any;
  constructor(private barcodeScanner: BarcodeScanner) {}

  ngOnInit() {}

  scan() {
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.code = barcodeData.text;
        console.log('Barcode data', this.code);

      })
      .catch((err) => {
        console.log('Error', err);
      });
  }



}
