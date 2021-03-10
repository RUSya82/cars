document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    function outputData(data){
        data = JSON.parse(data);
        data.cars.forEach(item => {
            if (item.brand === select.value) {
                const {brand, model, price} = item;
                output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
            }
        });
    }
    function getData(){
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', './cars.json');
            request.setRequestHeader('Content-type', 'application/json');
            request.send();
            request.addEventListener('readystatechange', () => {
                if(request.readyState !== 4 ){
                    return;
                }
                if (request.status === 200) {
                    resolve(request.responseText);
                } else {
                    // output.innerHTML = 'Произошла ошибка';
                    reject(request.statusText);
                }
            });
        });
    }
    select.addEventListener('change', () => {
        getData()
            .then(outputData)
            .catch((error) => {
                console.warn(error);
                output.innerHTML = 'Произошла ошибка';
            });

    });

});