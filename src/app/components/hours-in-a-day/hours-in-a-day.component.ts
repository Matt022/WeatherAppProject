import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-hours-in-a-day',
    imports: [CommonModule],
    templateUrl: './hours-in-a-day.component.html',
    styleUrl: './hours-in-a-day.component.scss'
})
export class HoursInADayComponent {
    numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
}
