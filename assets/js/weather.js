import axios from 'axios';
import config from './config.json';

class Weather {
    constructor(elementClass) {
        this.container = document.querySelector(elementClass);
        this.input = null;
        this.resultContainer = null;
    }

    init() {
        const form = document.createElement('form');
        const wrapperInput = document.createElement('div');
        wrapperInput.className = 'input-group';

        this.input = document.createElement('input');
        this.input.className = 'form-control';
        this.input.id = 'city';
        this.input.type = 'text';
        this.input.placeholder = 'Введите город...';

        const buttonWrapper = document.createElement('span');
        buttonWrapper.className = 'input-group-btn';

        const button = document.createElement('button');
        button.innerText = 'Получить';
        button.className = 'btn btn-primary';

        form.addEventListener('submit', this.formSubmit.bind(this));

        this.resultContainer = document.createElement('div');
        this.resultContainer.className = 'result row';

        buttonWrapper
            .appendChild(button);

        wrapperInput
            .appendChild(this.input);
        wrapperInput
            .appendChild(buttonWrapper);

        this.container
            .appendChild(form)
            .appendChild(wrapperInput);

        this.container
            .appendChild(this.resultContainer);
    }

    formSubmit(event) {
        event.preventDefault();
        const inputValue = this.input.value.trim();

        if (inputValue === '') {
            alert('City is empty');

            return false;
        }

        this.resultContainer.innerHTML = '';

        axios.get(config.currentWeatherUrl + inputValue + config.apiData)
            .then((response) => {
                this.createCard(
                    `<header class="card-header">` +
                    `<h4 class="card-title">Текущая погода: </h4>` +
                    `${response.data.weather[0].description}` +
                    `</header>` +
                    `<ul class="list-group list-group-flush">` +
                    `<li class="list-group-item"><i class="fa fa-thermometer-full"></i>Температура: ${Weather.convert(response.data.main.temp)}</li>` +
                    `<li class="list-group-item">Давление:  ${response.data.main.pressure}</li>` +
                    `<li class="list-group-item">Влажность: ${response.data.main.humidity}</li>` +
                    `</ul>`
                );

                axios.get(config.forecast + inputValue + config.apiData)
                    .then((response) => {

                        response.data.list.forEach((item, i, arr) => {

                            this.createCard(
                                `<header class="card-header">` +
                                `<h6 class="card-title"><i class="fa fa-calendar"></i> Погода на:</h6><p>${item.dt_txt}</p>` +
                                `<p>${item.weather[0].description}</p>` +
                                `</header>` +
                                `<ul class="list-group list-group-flush">` +
                                `<li class="list-group-item"><i class="fa fa-thermometer-full"></i>Температура: ${Weather.convert(item.main.temp)}</li>` +
                                `<li class="list-group-item"><i class="fa fa-thermometer-full"></i>Мин. температура: ${Weather.convert(item.main.temp_min)}</li>` +
                                `<li class="list-group-item"><i class="fa fa-thermometer-full"></i>Мак. температура: ${Weather.convert(item.main.temp_max)}</li>` +
                                `<li class="list-group-item">Давление:  ${item.main.pressure}</li>` +
                                `<li class="list-group-item">Влажность: ${item.main.humidity}</li>` +
                                `</ul>`
                            );
                        })
                    })
                    .catch((error) => {
                        console.log(`Error: ${error}`);
                    });

            })
            .catch((error) => {
                console.log(`Error: ${error}`);
            });
        return false;
    }

    static convert(value) {
        return parseInt(value - 274.15);
    }

    createCard(data) {
        const cart = document.createElement('div');
        cart.className = 'col-sm-3';
        cart.innerHTML = `<div class="card">${data}</div>`;

        this.resultContainer.appendChild(cart);
    }

    render() {
        this.init();
    }
}

export default Weather;