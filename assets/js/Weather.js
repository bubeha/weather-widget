import axios from 'axios';
import Card from './Card';
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
                this.resultContainer.appendChild(new Card(response.data).render());

                axios.get(config.forecast + inputValue + config.apiData)
                    .then((response) => {
                        response.data.list.forEach((item, i, arr) => {
                            this.resultContainer.append(new Card(item).render());
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

    render() {
        this.init();
    }
}

export default Weather;