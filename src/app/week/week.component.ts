import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
export class WeekComponent {
    constructor() {}

    currentDate: Date = new Date(); // Aktuálny deň
    daysHere: { day: string, date: string }[] = []; // Zoznam dní na zobrazenie
    selectedTabIndex: number = 0;
    setDay: string = "";
    chartData: {date: Date, hours: number[], temperatures: number[]} = {date: new Date(), hours: [], temperatures: []};

    highlightedDayIndex: number | null = null;

    selectedDayIndex: number | null = null; // Uchováva index vybraného dňa

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

    getInitializedDays(initializedDays: { day: string, date: string }[]): void {
        this.daysHere = [...initializedDays];
    }
}