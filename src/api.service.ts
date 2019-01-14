import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseUrl: string = 'http://localhost:8000/public';

  constructor(private http:HttpClient) { }

  signUp(json){
    return this.http.post(this.baseUrl+'/api/user', json);
  }

  addDocument(apiToken, json){
    return this.http.post(this.baseUrl+'/api/document', json, this.getOptions(apiToken));
  }

  getAuthenticatedUser(apiToken){
    return this.http.get(this.baseUrl+'/api/user', this.getOptions(apiToken));
  }

  getDocumentById(apiToken, documentId){
    return this.http.get(this.baseUrl+'/api/document/'+documentId, this.getOptions(apiToken));
  }

  getOptions(apiToken){
    let headers = new HttpHeaders({
      "apiToken": apiToken
    });
    let options = { headers: headers };  
    return options;
  }

}
