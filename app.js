const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');


// - 1 Endpoint GET que retorne sempre o status code 200.

app.get('/', (req, res) => {
  res.status(200).send('Status code of 200!');
})


//  - 2 Endpoint POST que receba um array JSON e retorne o número total de elementos do array recebido.

app.post("/total", (req, res, next) => {
  let apiURL = 'https://pastebin.pl/view/raw/8fced5f8';

  axios.post(apiURL)
    .then(response => {

      res.status(200).json(response.data.length);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});


//  - 3 endpoint POST que receba um array JSON com os elementos e retorne os elementos ordenados conforme as ponderações.


app.post("/ordenar", (req, res, next) => {
  let apiURL = 'https://pastebin.pl/view/raw/8fced5f8';

  axios.post(apiURL)
    .then(response => {

      let lista = response.data
      lista = lista.sort((a, b) => {
        if (a.quantidade > b.quantidade) {
          return -1;
        }
        if (lista.condicao_pagamento == "DIN" && lista.condicao_pagamento > 30 && lista.condicao_pagamento == "R60" && lista.condicao_pagamento > 90 && lista.condicao_pagamento > 120) {
          return -1;
        }
        if (lista.pais == "PORT") {
          return -1;
        }

        lista.forEach((element) => {
          element.previsao_consumo = element.quantidade * 5;
        });


      });

      res.status(200).json(lista);


    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});




app.listen(port, () => {
});