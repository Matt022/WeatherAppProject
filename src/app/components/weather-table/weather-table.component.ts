import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { weatherCodes } from '../../datamodels/weather-code-data.model';

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
    @Output() chartData: EventEmitter<{hours: number[], temperatures: number[]}> = new EventEmitter<{hours: number[], temperatures: number[]}>;

    hourlyWeatherData: {
        hour: number;
        dateTimes: Date;
        temperatures: number;
        humidity: number;
        weatherCode: string;
        pressure: number;
        visibility: number;
    }[] = [];
    pagedWeatherData: {
        hour: number;
        dateTimes: Date;
        temperatures: number;
        humidity: number;
        weatherCode: string;
        pressure: number;
        visibility: number;
    }[] = [];
    currentPage = 0;
    pageSize = 24;

    daysBefore = 5;
    daysAfter = 7;

    //-------------------------------------------------------------------------------------------

    dateTimes: string[] = [];
    temperatures: number[] = [];
    relative_humidity: number[] = [];
    weather_status: number[] = [];
    pressure: number[] = [];
    visibility: number[] = [];

    ngOnInit(): void {
        this.apiService.getData().subscribe({
            next: data => {
                this.hourlyWeatherData = this.mapApiDataToTableData(data);
                this.updatePagedWeatherData();
                this.currentDayIndex();
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

    mapApiDataToTableData(apiData: any): any[] {
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
    // Stránkovanie - aktualizácia dát na základe aktuálnej strany
    updatePagedWeatherData(): void {
        const startIndex: number = this.currentPage * this.pageSize;
        const endIndex: number = startIndex + this.pageSize;
        this.pagedWeatherData = this.hourlyWeatherData.slice(startIndex, endIndex);

        const currentPageTemperatures: number[] = this.pagedWeatherData.map(data => data.temperatures);
        const hoursPerDay: number[] = this.pagedWeatherData.map(data => data.hour);
        this.chartData.emit({hours: hoursPerDay, temperatures: currentPageTemperatures});
    }

    // Reakcia na zmenu strany tabuľky
    onPageChange(event: PageEvent): void {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.updatePagedWeatherData();
    }

    currentDayIndex(): void {
        const currentDayString: string = new Date().toDateString(); // Získať dátum ako string pre porovnanie

        // Hľadať index aktuálneho dňa v hourlyWeatherData
        for (let index: number = 0; index < this.hourlyWeatherData.length; index++) {
            const dataDate: Date = new Date(this.hourlyWeatherData[index].dateTimes);
            if (dataDate.toDateString() === currentDayString) {
                this.currentPage = Math.floor(index / this.pageSize);
                this.updatePagedWeatherData();

                // Aktualizuj paginator manuálne
                if (this.paginator) {
                    this.paginator.pageIndex = this.currentPage;
                }
                break; // Akonáhle nájdeme aktuálny deň, skončíme hľadanie
            }
        }
    }

    setDayIndex(dateString: string): void {
        // Hľadať index aktuálneho dňa v hourlyWeatherData
        for (let index: number = 0; index < this.hourlyWeatherData.length; index++) {
            const dataDate: Date = new Date(this.hourlyWeatherData[index].dateTimes);
            if (dataDate.toDateString() === dateString) {
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

    private getWeatherCodeDescription(code: number): string | undefined {
        for (let i: number = 0; i < weatherCodes.length; i++) {
            if (weatherCodes[i].code == code) {
                return weatherCodes[i].description;
            }
        }

        return undefined;
    }

    formatHour(hour: number): string {
        return `${hour.toString().padStart(2, '0')}:00`
    }
}
