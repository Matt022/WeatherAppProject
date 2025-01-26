export interface WeatherCodeDataModel {
    code: number;
    description: string;
    severity: 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined;
}

export const weatherCodes: WeatherCodeDataModel[] = [
    { code: 0, description: 'Clear Sky', severity: "success" },
    { code: 1, description: 'Mainly clear', severity: "success" },
    { code: 2, description: 'Partly cloudy', severity: "info" },
    { code: 3, description: 'Overcast', severity: "info" },
    { code: 45, description: 'Fog', severity: "warn" },
    { code: 48, description: 'Depositing rime fog', severity: "warn" },
    { code: 51, description: 'Light drizzle', severity: "info" },
    { code: 53, description: 'Moderate drizzle', severity: "info" },
    { code: 55, description: 'Dense drizzle', severity: "warn" },
    { code: 56, description: 'Light freezing drizzle', severity: "warn" },
    { code: 57, description: 'Dense freezing drizzle', severity: "danger" },
    { code: 61, description: 'Slight rain', severity: "info" },
    { code: 63, description: 'Moderate rain', severity: "warn" },
    { code: 65, description: 'Heavy rain', severity: "danger" },
    { code: 66, description: 'Light freezing rain', severity: "warn" },
    { code: 67, description: 'Heavy freezing rain', severity: "danger" },
    { code: 71, description: 'Slight snow fall', severity: "info" },
    { code: 73, description: 'Moderate snow fall', severity: "warn" },
    { code: 75, description: 'Heavy snow fall', severity: "danger" },
    { code: 77, description: 'Snow grains', severity: "info" },
    { code: 80, description: 'Slight rain showers', severity: "info" },
    { code: 81, description: 'Moderate rain showers', severity: "warn" },
    { code: 82, description: 'Violent rain showers', severity: "danger" },
    { code: 85, description: 'Slight snow showers', severity: "info" },
    { code: 86, description: 'Heavy snow showers', severity: "danger" }
]