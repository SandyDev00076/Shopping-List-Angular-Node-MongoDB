import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetLists {
    constructor(private http: HttpClient) { }

    getLists(): Observable<any> {
        return this.http.get('http://localhost:3000/lists');
    }
}