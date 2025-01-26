import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }
    private apiUrl: string = 'https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&hourly=temperature_2m,relative_humidity_2m,weather_code,pressure_msl,visibility&past_days=5';

    getData(): Observable<any> {
        return this.http.get(`${this.apiUrl}`);
    }
}
