import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup  } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  private data: any;
  private addDocumentForm: FormGroup;
  private processing: boolean = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private toastCtrl: ToastController){
    this.data = JSON.parse(atob(document.cookie.replace('data=','')));
    this.addDocumentForm = this.formBuilder.group({
      document_title : ['', Validators.compose([
        Validators.required
      ])],
      document_type : ['', Validators.compose([
        Validators.required
      ])],
      document_id_number : ['', Validators.compose([

      ])],
      document : ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  addDocument(){
    this.processing = true;
    let document_title = this.addDocumentForm.value.document_title;
    let document_type = this.addDocumentForm.value.document_type;
    let document_id_number = this.addDocumentForm.value.document_id_number;
    let document_info: any;
    
    let json: any = {
      "user_id": this.data.id
    }

    document_info.document_title = document_title;
    document_info.document_type = document_type;

    if(document_id_number != '')
      document_info.document_id_number = document_id_number

    json.document_info = document_info;
    
    this.apiService.signUp(json).subscribe((data) => {
      let encrptedData = btoa(JSON.stringify(data));
      document.cookie = "data="+encrptedData;
      this.processing = false;
    }, (error) => {
      this.presentToastWithOptions("Some error occured. Please try after some time.");
      this.processing = false;
    });
  }

  async presentToastWithOptions(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Dismiss'
    });
    toast.present();
  }
}
