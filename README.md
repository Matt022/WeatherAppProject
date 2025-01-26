# London WeatherApp project

The London Weather app project is composed of three parts divided by tabs using [Angular Material](https://material.angular.io/components). This application is built on the latest version of Angular 19. The design framework was also used for the result, namely Angular Material as mentioned and [PrimeNg](https://primeng.org/).

We will introduce each part of this page and start with the first weather called Weather

## Weather tab

When the application is launched, a table containing an hourly weather forecast appears on the screen. The data included in the API include time, temperature in degrees Celsius, relative humidity in percent, weather status, pressure and visibility.

The data is obtained from the [open-meteo](https://open-meteo.com/en/docs) site, which offers a wide range of data within the REST API, from which I have chosen the ones that suit the user the most and that will interest him/her the most. I focused on the weather in London, which corresponds to the web application itself.

On the left side of the page, we can notice the days where today is highlighted. The range of days is 5 days before today and 6 days from today. After clicking on a day, the user goes to a specific day to see the data about it. The given day is highlighted in the menu and the same happens when the user will browse with help of paginator.

Hours and temperatures from the highlighted day are used in a chart on second tab.

## Chart tab
We are on a screen that shows a chart whose template is used from PrimeNg. This chart contains an x-axis and a y-axis, where the x-axis represents hours and the y-axis represents temperatures. There is also a date above the chart so that the user knows which day it is and to which day data belongs. 

Since tabs are used in the application instead of routing, the data are not lost when clicking between tabs and may not be reloaded.

## Heat Index calculator tab
The last third part of this application contains a heat index calculator. This calculator is composed of three input elements, where the user enters the temperature, the temperature unit either degrees Celsius or Fahrenheit and relative humidity. Validations are added to the individual inputs and Select, and for this reason the reactive form is also used.

After clicking the button submit, the temperature index is calculated based on data inserted from the user and by the heat index formula from [weather.gov](https://www.weather.gov/media/epz/wxcalc/heatIndex.pdf).

The last 5 results from these calculations are stored in localstorage so that the user has a history of the results. After the fifth result, the sixth calculation is inserted and then the first one is deleted and so on.

## License

[MIT](https://choosealicense.com/licenses/mit/)