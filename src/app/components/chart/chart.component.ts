import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
    selector: 'app-chart',
    imports: [ChartModule],
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnChanges{
    chartData: any;
    @Input() data: {hours: number[], temperatures: number[]} = {hours: [], temperatures: []};

    constructor() {
        // Generovanie hodín od 0 do 23
        const hours: string[] = Array.from({ length: 24 }, (_, i) => i.toString());

        // Generovanie náhodných teplôt medzi 0 a 40 stupňov
        const temperatures: number[] = Array.from({ length: 24 }, () => Math.floor(Math.random() * 41));

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
                        data: this.data.temperatures,  // Náhodné teploty pre každú hodinu
                        borderColor: '#42A5F5',  // Farba čiary
                        backgroundColor: 'rgba(66, 165, 245, 0.2)',  // Polopriehľadná farba pre pozadie grafu
                        fill: true,  // Vyplniť oblasť pod čiarou
                    }
                ]
            };
        }
    }
}
