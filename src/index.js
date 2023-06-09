const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/', async (req, res) => {
  try {
    // Hacer la solicitud HTTP a la página web
    const response = await axios.get('https://www.rosario3.com/');

    // Analizar el HTML de la página web
    const $ = cheerio.load(response.data);

    // Extraer los datos necesarios
    const datos = $('.left-content .title').text();

    // Enviar los datos en la respuesta
    res.json({ datos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos.' });
  }
});

// Iniciar el servidor
// const port = 3000;
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
  console.log(`Servidor en funcionamiento en el puerto ${app.get('port')}`);
});

// Export the Express API
module.exports = app;