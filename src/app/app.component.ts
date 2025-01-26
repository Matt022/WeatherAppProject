import { Component } from '@angular/core';
import { WeekComponent } from './week/week.component';

import {MatTabsModule} from '@angular/material/tabs';

@Component({
    selector: 'app-root',
    imports: [WeekComponent, MatTabsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'WeatherAppProject';
}
