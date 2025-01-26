import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';

import { ChartComponent } from "../tabs/chart/chart.component";
import { DayInWeekComponent } from "../components/day-in-week/day-in-week.component";
import { WeatherTableComponent } from "../tabs/weather-table/weather-table.component";
import { HeatIndexCalculatorComponent } from "../tabs/heat-index-calculator/heat-index-calculator.component";

@Component({
    selector: 'app-week',
    imports: [CommonModule, MatTabsModule, DayInWeekComponent, WeatherTableComponent, ChartComponent, HeatIndexCalculatorComponent],
    templateUrl: './week.component.html',
    styleUrl: './week.component.scss'
})
export class WeekComponent implements OnInit {
    constructor() {}

    currentDate: Date = new Date(); // Aktuálny deň
    daysHere: { day: string, date: string }[] = []; // Zoznam dní na zobrazenie
    selectedTabIndex: number = 0;
    setDay: string = "";
    chartData: {date: Date, hours: number[], temperatures: number[]} = {date: new Date(), hours: [], temperatures: []};

    highlightedDayIndex: number | null = null;

    selectedDayIndex: number | null = null; // Uchováva index vybraného dňa

    ngOnInit(): void {
        this.initializeDays(); // Inicializácia dátumov na základe aktuálneho dňa
    }

    private initializeDays(): void {
        this.daysHere = []; // Vyprázdnime zoznam dní
        const daysBefore: number = 5; // Počet dní pred aktuálnym dňom
        const daysAfter: number = 6; // Počet dní po aktuálnom dni

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

    receiveDate(date: string) {
        this.setDay = date;
    }

    highlightDay(index: number): void {
        this.highlightedDayIndex = index; // Nastaviť index zvýrazneného dňa
    }

    getChartData(chartData: {date: Date, hours: number[], temperatures: number[]}) {
        this.chartData = chartData;
    }

    switchDay(index: number) {
        this.selectedDayIndex = index; // Uloží vybraný index
    }

    getPageIndex(pageIndex: number): void {
        this.selectedDayIndex = pageIndex;
    }

    isSelected(index: number): boolean {
        return this.selectedDayIndex === index; // Skontroluje, či je daný deň vybraný
    }

    isToday(date: string | null | undefined): boolean {
        const today: Date = new Date();
        const parsedDate: Date = new Date(date!);
        return today.toDateString() === parsedDate.toDateString();
    }

    switchDate(date: { day: string, date: string; }): void {
        this.setDay = date.date;
    }
}