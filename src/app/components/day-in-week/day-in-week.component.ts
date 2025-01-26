import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-day-in-week',
    imports: [CommonModule],
    templateUrl: './day-in-week.component.html',
    styleUrls: ['./day-in-week.component.scss']
})
export class DayInWeekComponent {
    constructor() {}

    @Input() theDay: { day: string, date: string; } = { day: "", date: "" };
    @Output() receivedDate: EventEmitter<string> = new EventEmitter<string>();

    isToday(date: string | null | undefined): boolean {
        const today: Date = new Date();
        const parsedDate: Date = new Date(date!);
        return today.toDateString() === parsedDate.toDateString();
    }

    switchDay(date: { day: string, date: string; }): void {
        const formattedDate: Date = this.formatDateString(date.date);
        this.receivedDate.emit(formattedDate.toDateString());
    }

    formatDateString(dateString: string): Date {
        const dateParts = dateString.split(' '); // Rozdelenie reťazca na časti
        const month = new Date(Date.parse(dateParts[0] + " 1")).getMonth(); // Získanie indexu mesiaca
        const day = parseInt(dateParts[1], 10);
        const year = parseInt(dateParts[2], 10);
        return new Date(year, month, day); // Vytvorenie nového dátumu
    }
}
