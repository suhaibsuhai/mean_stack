import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';  // Import Item model

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'https://meanstack-backend.azurewebsites.net/api/items';  // Backend URL

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${item._id}`, item);  // Use _id instead of id
  }

  deleteItem(id: string): Observable<void> {  // id should be a string
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
