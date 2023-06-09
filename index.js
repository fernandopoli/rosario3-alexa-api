const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

// const fetchTitle = async () => {
//   try{
//     const response = await axios.get('https://www.rosario3.com/');
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const titles = [];

//     $('.left-content .title').each((index, el) =>{
//         const title = el;
//         titles.push($(title).text())
//       });

//     return titles;
//   }
//   catch (err){
//     console.log(err);
//   }
// }

// fetchTitle().then(titles => console.log(titles));

app.get('/', async (req, res) => {
  try {
    // Hacer la solicitud HTTP a la página web
    const response = await axios.get('https://www.rosario3.com/');

    // Analizar el HTML de la página web
    const html = response.data;
    const $ = cheerio.load(html);
    const noticias = [];
    
    $('.left-content .title').each((index, dato) =>{      
      noticias.push($(dato).text())
    });
    
    // Enviar los noticias en la respuesta
    res.json({ noticias });
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