import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-heat-index-calculator',
    imports: [CommonModule,FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatError, MatSelectModule, MatButtonModule, MatIconModule],
    templateUrl: './heat-index-calculator.component.html',
    styleUrl: './heat-index-calculator.component.scss'
})
export class HeatIndexCalculatorComponent implements OnInit {
    form: FormGroup;
    temperatureUnits: string[] = ['°C', '°F'];

    constructor() {
        this.form = new FormGroup({
            temperature: new FormControl(null, [Validators.required]),
            temperatureUnit: new FormControl('', [Validators.required]),
            relativeHumidity: new FormControl(null, [Validators.required])
        });
    }

    ngOnInit() {
        this.form.get('temperatureUnit')?.valueChanges.subscribe(() => {
            this.form.get('temperature')?.updateValueAndValidity();
        });

        this.form.get('temperature')?.setValidators([
            Validators.required,
            this.lessThan80Validator.bind(this)
        ]);
    }

    onSubmit(): void {
        const temperature: number = this.form.get('temperature')?.value;
        const temperatureUnit: string = this.form.get('temperatureUnit')?.value;
        const relativeHumidity: number = this.form.get('relativeHumidity')?.value;

        // Konverzia teploty na Fahrenheit, ak je v Celziách
        let temperatureF: number = temperature;
        if (temperatureUnit === '°C') {
            temperatureF = (temperature * 9 / 5) + 32;
        }

        // Výpočet heat indexu
        const heatIndex: number = -42.379 +
            (2.04901523 * temperatureF) +
            (10.14333127 * relativeHumidity) -
            (0.22475541 * temperatureF * relativeHumidity) -
            (6.83783 * 10 ** -3 * temperatureF ** 2) -
            (5.481717 * 10 ** -2 * relativeHumidity ** 2) +
            (1.22874 * 10 ** -3 * temperatureF ** 2 * relativeHumidity) +
            (8.5282 * 10 ** -4 * temperatureF * relativeHumidity ** 2) -
            (1.99 * 10 ** -6 * temperatureF ** 2 * relativeHumidity ** 2);

        // Konverzia výsledku späť na Celzius, ak pôvodná teplota bola v Celziách
        let result: number = heatIndex;
        if (temperatureUnit === '°C') {
            result = (heatIndex - 32) * 5 / 9;
        }

        console.log('Heat Index:', result.toFixed(2), temperatureUnit);
    }

    lessThan80Validator(control: AbstractControl): ValidationErrors | null {
        const temperature: number = control.value;
        const temperatureUnit: string = this.form.get('temperatureUnit')?.value;

        if (temperatureUnit === '°F' && temperature < 80) {
            return { 'lessThan80': true };
        }
        return null;
    }
}
