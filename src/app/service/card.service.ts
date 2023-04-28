import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CardModel } from '../model/card-model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient) { 

  }

  getCards(): Observable<CardModel[]>{
      return this.httpClient.get<CardModel[]>('http://localhost:9000/api/v1/card' + '/list').pipe(map(res => res));
  }

  saveCards(request: any): Observable<any>{
    return this.httpClient.post<any>('http://localhost:9000/api/v1/card' + '/save', request).pipe(map(res => res));
}

updateCards(request: any): Observable<any>{
  return this.httpClient.post<any>('http://localhost:9000/api/v1/card' + '/update', request).pipe(map(res => res));
}

deleteCards(id: number): Observable<any>{
  return this.httpClient.get<any>('http://localhost:9000/api/v1/card' + '/delete/' + id).pipe(map(res => res));
}

}
