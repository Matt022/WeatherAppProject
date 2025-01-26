import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DayInWeekComponent } from "../components/day-in-week/day-in-week.component";
import { WeatherTableComponent } from "../components/weather-table/weather-table.component";
import { ChartComponent } from "../components/chart/chart.component";

@Component({
    selector: 'app-week',
    imports: [CommonModule, MatTabsModule, DayInWeekComponent, WeatherTableComponent, ChartComponent],
    templateUrl: './week.component.html',
    styleUrl: './week.component.scss'
})
export class WeekComponent implements OnInit {
    constructor() {}

    currentDate: Date = new Date(); // Aktuálny deň
    daysHere: { day: string, date: string }[] = []; // Zoznam dní na zobrazenie
    selectedTabIndex: number = 0;
    setDay: string = "";
    chartData: {hours: number[], temperatures: number[]} = {hours: [], temperatures: []};

    highlightedDayIndex: number | null = null;

    ngOnInit(): void {
        this.initializeDays(); // Inicializácia dátumov na základe aktuálneho dňa
    }

    initializeDays(): void {
        this.daysHere = []; // Vyprázdnime zoznam dní
        const daysBefore: number = 5; // Počet dní pred aktuálnym dňom
        const daysAfter: number = 5; // Počet dní po aktuálnom dni

        // Iterujeme od -5 do +7 (5 dní pred a 7 dní po aktuálnom dni)
        for (let i: number = -daysBefore; i <= daysAfter; i++) {
            const currentDate: Date = new Date(this.currentDate); // Vytvoríme kópiu aktuálneho dátumu
            currentDate.setDate(this.currentDate.getDate() + i); // Posunieme dátum o i dní
            const day: string = this.getDayName(currentDate); // Názov dňa
            const date: string = this.formatDate(currentDate); // Formátovaný dátum
            this.daysHere.push({ day, date }); // Pridáme deň do zoznamu
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

    onTabChange(event: any): void {
        console.log('Aktuálny index karty:', event.index);
    }

    receiveDate(date: string) {
        this.setDay = date;
    }

    highlightDay(index: number): void {
        this.highlightedDayIndex = index; // Nastaviť index zvýrazneného dňa
    }

    getChartData(chartData: {hours: number[], temperatures: number[]}) {
        this.chartData = chartData;
    }
}

