import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
    selector: 'app-chart',
    imports: [ChartModule],
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnChanges {
    chartData: any;
    @Input() data: {
        hours: number[],
        temperatures: number[],
        date: Date
    } = {
        hours: [],
        temperatures: [],
        date: new Date() // nastaví aktuálny dátum ako predvolenú hodnotu
    };

    currentDate: string = "";

    constructor() {
        this.chartData = {
            labels: this.data.hours,  // Hodiny (0 - 23)
            datasets: [
                {
                    label: 'Teplota (°C)',  // Názov grafu
                    data: this.data.temperatures,  // Náhodné teploty pre každú hodinu
                    borderColor: '#42A5F5',  // Farba čiary
                    backgroundColor: 'rgba(66, 165, 245, 0.2)',  // Polopriehľadná farba pre pozadie grafu
                    fill: true,  // Vyplniť oblasť pod čiarou
                }
            ]
        };
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] && this.data) {
            this.chartData = {
                labels: this.data.hours,  // Hodiny (0 - 23)
                datasets: [
                    {
                        label: 'Teplota (°C)',  // Názov grafu
                        data: this.data.temperatures.map(temperature => `${temperature}`),  // Náhodné teploty pre každú hodinu
                        borderColor: '#42A5F5',  // Farba čiary
                        backgroundColor: 'rgba(66, 165, 245, 0.2)',  // Polopriehľadná farba pre pozadie grafu
                        fill: true,  // Vyplniť oblasť pod čiarou
                    }
                ],
            };

            this.currentDate = this.data.date.toLocaleDateString();
        }
    }
}
