class Card {
    constructor(data) {
        this.card = null;
        this.init(data);
    }

    init(data) {
        this.card = document.createElement('div');
        this.card.className = 'col-sm-3';

        if (data.dt_txt) {
            return this.card.innerHTML = this.cartTemplate(
                `<h6 class="card-title"><i class="fa fa-calendar"></i> Погода на:</h6><p>${data.dt_txt}</p>` +
                `<p>${data.weather[0].description}</p>`, `<ul class="list-group list-group-flush">` +
                `<li class="list-group-item"><i class="fa fa-thermometer-full"></i> Температура: ${Card.convert(data.main.temp)}</li>` +
                `<li class="list-group-item"><i class="fa fa-thermometer-full"></i> Мин. температура: ${Card.convert(data.main.temp_min)}</li>` +
                `<li class="list-group-item"><i class="fa fa-thermometer-full"></i> Мак. температура: ${Card.convert(data.main.temp_max)}</li>` +
                `<li class="list-group-item">Давление:  ${data.main.pressure}</li>` +
                `<li class="list-group-item">Влажность: ${data.main.humidity}</li>` +
                `</div>`);
        }


        return this.card.innerHTML = this.cartTemplate(
            `<h3 class="card-title"><i class="fa fa-calendar"></i> Текущая погода:</h3>` +
            `<p>${data.weather[0].description}</p>`, `<ul class="list-group list-group-flush">` +
            `<li class="list-group-item"><i class="fa fa-thermometer-full"></i>Температура: ${Card.convert(data.main.temp)}</li>` +
            `<li class="list-group-item">Давление:  ${data.main.pressure}</li>` +
            `<li class="list-group-item">Влажность: ${data.main.humidity}</li>` +
            `</div>`);
    }

    cartTemplate(header, body) {
        return `<div class="card">` +
            `<header class="card-header">${header}</header>${body}` +
            `</div>`;
    }

    static convert(value) {
        return parseInt(value - 274.15);
    }

    render() {
        return this.card;
    }
}

export default Card;