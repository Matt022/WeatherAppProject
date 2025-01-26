import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { ApiService } from '../../services/api.service';
import { WeatherCodeDataModel, weatherCodes } from '../../datamodels/weather-code-data.model';

@Component({
    selector: 'app-weather-table',
    templateUrl: './weather-table.component.html',
    styleUrls: ['./weather-table.component.scss'],
    imports: [CommonModule, MatTableModule, MatPaginatorModule]
})
export class WeatherTableComponent implements OnInit, OnChanges {
    constructor(private apiService: ApiService) { }

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    displayedColumns: string[] = ['hour', 'dateTimes', 'temperatures', 'humidity', 'weatherCode', 'pressure', 'visibility'];
    @Input() setDate: string = "";
    @Output() chartData: EventEmitter<{ date: Date, hours: number[], temperatures: number[]; }> = new EventEmitter<{ date: Date, hours: number[], temperatures: number[]; }>;
    @Output() pageIndex: EventEmitter<number> = new EventEmitter<number>();
    @Output() daysInitialize: EventEmitter<{ day: string, date: string }[]> = new EventEmitter<{ day: string, date: string }[]>();


    hourlyWeatherData: {
        hour: number;
        dateTimes: Date;
        temperatures: number;
        humidity: number;
        weatherCode: WeatherCodeDataModel;
        pressure: number;
        visibility: number;
    }[] = [];

    pagedWeatherData: {
        hour: number;
        dateTimes: Date;
        temperatures: number;
        humidity: number;
        weatherCode: WeatherCodeDataModel;
        pressure: number;
        visibility: number;
    }[] = [];

    currentPage: number = 0;
    pageSize: number = 24;

    ngOnInit(): void {
        this.apiService.getData().subscribe({
            next: data => {
                this.hourlyWeatherData = this.mapApiDataToTableData(data);
                const dateTimes = this.hourlyWeatherData.map(data => data.dateTimes);
                const days: {
                    day: string;
                    date: string;
                }[] = dateTimes.map(dateTime => {
                    const day: string = this.getDayName(dateTime);
                    const date: string = this.formatDate(dateTime);
                    return {day, date}; // Získaj deň
                });

                // Odstránenie duplikátov podľa hodnoty
                const arraySet: {
                    day: string;
                    date: string;
                }[] = days.filter((value, index, self) =>
                    index === self.findIndex((t) => t.day === value.day && t.date === value.date)
                );

                this.daysInitialize.emit(arraySet);
                this.updatePagedWeatherData();
                this.setCurrentDayIndex();
            },
            error: err => {
                console.error('Chyba pri načítavaní dát:', err);
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['setDate'] && this.setDate) {
            this.setDayIndex(this.setDate);
        }
    }

    private formatDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString("en-EN", options); // Formátujeme dátum
    }

    private getDayName(date: Date): string {
        const daysOfWeek: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return daysOfWeek[date.getDay()]; // Vrátime názov dňa podľa indexu
    }

    private mapApiDataToTableData(apiData: any): any[] {
        const tableData: any[] = [];
        for (let i: number = 0; i < apiData.hourly.time.length; i++) {
            const dateTime: Date = new Date(apiData.hourly.time[i]); // Prevod ISO stringu na Date objekt

            tableData.push({
                hour: dateTime.getHours(), // Hodina vo formáte hh:00
                dateTimes: dateTime, // Len dátum vo formáte DD MM YYYY
                temperatures: apiData.hourly.temperature_2m[i], // Teplota
                humidity: apiData.hourly.relative_humidity_2m[i], // Vlhkosť
                weatherCode: this.getWeatherCodeDescription(apiData.hourly.weather_code[i]), // Popis počasia
                pressure: apiData.hourly.pressure_msl[i], // Tlak
                visibility: apiData.hourly.visibility[i], // Viditeľnosť
            });
        }
        return tableData;
    }

    private updatePagedWeatherData(): void {
        const startIndex: number = this.currentPage * this.pageSize;
        const endIndex: number = startIndex + this.pageSize;
        this.pageIndex.emit(this.currentPage);
        this.pagedWeatherData = this.hourlyWeatherData.slice(startIndex, endIndex);

        const currentPageTemperatures: number[] = this.pagedWeatherData.map(data => data.temperatures);
        const hoursPerDay: number[] = this.pagedWeatherData.map(data => data.hour);
        const date: Date = this.pagedWeatherData[0].dateTimes;

        this.chartData.emit({ date: date, hours: hoursPerDay, temperatures: currentPageTemperatures });
    }

    // Reakcia na zmenu strany tabuľky
    onPageChange(event: PageEvent): void {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.updatePagedWeatherData();
    }

    private updateCurrentPage(dateString: string): void {
        const currentDayDate: Date = new Date(dateString); // Prevod reťazca na Date objekt

        // Hľadať index aktuálneho dňa v hourlyWeatherData
        for (let index: number = 0; index < this.hourlyWeatherData.length; index++) {
            const dataDate: Date = new Date(this.hourlyWeatherData[index].dateTimes);
            if (dataDate.toDateString() === currentDayDate.toDateString()) {
                this.currentPage = Math.floor(index / this.pageSize);
                this.updatePagedWeatherData();

                // Aktualizuj paginator
                if (this.paginator) {
                    this.paginator.pageIndex = this.currentPage;
                }
                break; // Akonáhle nájdeme aktuálny deň, skončíme hľadanie
            }
        }
    }

    private setCurrentDayIndex(): void {
        this.updateCurrentPage(new Date().toDateString()); // Zavoláme pomocnú metódu s aktuálnym dňom
    }

    private setDayIndex(dateString: string): void {
        this.updateCurrentPage(dateString); // Zavoláme pomocnú metódu s daným dňom
    }

    private getWeatherCodeDescription(code: number): WeatherCodeDataModel | undefined {
        for (let i: number = 0; i < weatherCodes.length; i++) {
            if (weatherCodes[i].code == code) {
                return weatherCodes[i];
            }
        }

        return undefined;
    }

    formatHour(hour: number): string {
        return `${hour.toString().padStart(2, '0')}:00`;
    }
}
