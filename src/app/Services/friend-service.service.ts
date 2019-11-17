import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Friend } from '../models/friend';
import { FriendResult } from '../models/friendDistance';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FriendServiceService {

  private readonly apiUrl = environment.apiUrl + '/friends';

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MSwiY29kZSI6IjEyMyIsIm5hbWUiOiIxMjMiLCJlbmFibGVkICI6dHJ1ZSwiZW1haWwiOiJmZWxpcGVkbW9yaUBnbWFpbC5jb20iLCJsb2dpbiI6ImZlbGlwZWRtb3JpIn19.Clu4woC_NvS5VSpkEYAalxb_v1RfRvEZQZJ0GuBbf9w';

  constructor(private http: HttpClient) {}

  retrieveFriends(): Observable<Friend[]> {   

    return this.http.get<Friend[]>(this.apiUrl, { headers: new HttpHeaders({'User-Token':  this.token}) });

  }
  
  retrieveFriend(id: number): Observable<FriendResult[]> {
   
    return this.http.get<FriendResult[]>(`${this.apiUrl}/${id}`, { headers: new HttpHeaders({'User-Token':  this.token}) });

  }

}
