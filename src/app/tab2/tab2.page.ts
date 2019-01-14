import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup  } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{
  private data: any;
  private apiToken: any;
  private addDocumentForm: FormGroup;
  private processing: boolean = false;
  private formData: FormData = new FormData();
  private fileChosen: boolean = false;
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private toastCtrl: ToastController, private storage: Storage){
    this.storage.get('data').then((data) => {
      this.data = JSON.parse(atob(data));
    });
    this.storage.get('apiToken').then((data) => {
      this.apiToken = data;
    });
    this.addDocumentForm = this.formBuilder.group({
      document_title : ['', Validators.compose([
        Validators.required
      ])],
      document_type : ['', Validators.compose([
        Validators.required
      ])],
      document_id_number : ['', Validators.compose([

      ])]
    });
  }

  addDocument(){
    this.processing = true;
    let document_title = this.addDocumentForm.value.document_title;
    let document_type = this.addDocumentForm.value.document_type;
    let document_id_number = this.addDocumentForm.value.document_id_number;
    let document_info: any = {};
    
    this.formData.append("user_id", this.data.id);
    document_info.document_title = document_title;
    document_info.document_type = document_type;

    if(document_id_number != '')
      document_info.document_id_number = document_id_number

    this.formData.append("document_info", JSON.stringify(document_info));

    this.apiService.addDocument(this.apiToken, this.formData).subscribe((data) => {
      this.presentToastWithOptions("Document added.");
      this.data.documents.push(data);
      let encryptedData = btoa(JSON.stringify(this.data));
      this.storage.set('data', encryptedData);
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
      duration: 5000,
      closeButtonText: 'Dismiss'
    });
    toast.present();
  }

  changeListener($event) {
    this.fileChosen = true;
    this.formData.append("document", $event.target.files[0]);
  }

  doRefresh($event){
    this.storage.get('data').then((data) => {
      this.data = JSON.parse(atob(data));
    });
    this.storage.get('apiToken').then((data) => {
      this.apiToken = data;
    });
    this.addDocumentForm.reset()
    setTimeout(() => {
      $event.target.complete();
    }, 2000);
  }
}
