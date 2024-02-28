// Pour une présentation de notre séléction littéraire
// nous utilisons un page web il nous faut donc la librairie http
// afin de créer notre serveur
const http = require('http');
const { title } = require('process');

//import dayjs from 'dayjs' // ES 2015
const dayjs = require('dayjs');
const { log } = require('console');

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const locale_fr = require('dayjs/locale/fr');
dayjs.locale(locale_fr);

// current date in ISO8601, without fraction seconds e.g. '2020-04-02T08:02:17-05:00'
// dayjs().format();

const advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

dayjs().format('Q Do k kk X x');

// Séléction de livres incontournables
const books = [
	{
		title: 'The Fellowship of the Ring',
		language: 'English',
		country: 'United Kingdom',
		author: 'J.R.R. Tolkien',
		date: '1954-07-29',
	},
	{
		title: 'Prelude to foundation',
		language: 'English',
		country: 'United States',
		author: 'Isaac Asimov',
		date: '1988-11-08',
	},
	{
		title: 'Voyage au centre de la terre',
		language: 'Français',
		country: 'France',
		author: 'Jules Verne',
		date: '1864-11-25',
	},
	{
		title: 'La nuit des temps',
		language: 'Français',
		country: 'France',
		author: 'René Barjavel',
		date: '1968-05-20',
	},
	{
		title: 'Carrion Comfort',
		language: 'English',
		country: 'United States',
		author: 'Dan Simmons',
		date: '1989-02-15',
	},
];

// Création de notre serveur
const server = http.createServer((req, res) => {
	// On court-circuite l'appel automatique du navigateur au favicon.ico
	if (req.url === '/favicon.ico') {
		res.writeHead(200, { 'Content-Type': 'image/x-icon' });
		res.end();
		return;
	}

	// On envoie les header de la réponse http
	// ici nous voulons une réponse de type text encodé en UTF-8
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

	// On écrit l'entête de notre page html
	res.write(`<!DOCTYPE html>
    <html lang="fr" dir"ltr">
    <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta http-equiv="X-UA-Compatible" content="ie=edge">
       <title>bookshelf</title>
    </head>
    <body>`);

	// Corps de la page
	res.write(`<h1 style="margin-left:8px"> Books' collection&nbsp;:</h1>
    <table>
    <thead>
        <tr>`);

	for (const key in books[0]) {
		res.write(`<th scope="col" style="color:blue;margin:16px;text-transform:uppercase;text-align:left;padding-inline:8px"> ${key}</th>`);
	}
	res.write(`<th scope="col" style="color:blue;margin:16px;text-transform:uppercase;text-align:left;padding-inline:8px">age</th>`);
	res.write(` </tr>
    </thead>
    <tbody>`);

	for (const book of books) {
		res.write(`<tr>`);
		for (const key in book) {
			if (key === 'title') {
				res.write(`<th scope="row" style="text-align:left; padding-inline:8px">${book.title}</th>`);
			} else if (key === 'date') {
				res.write(`<td style="padding-inline:8px">${dayjs(book[key]).format('dddd, MMMM Do YYYY')}</td>`);
			} else {
				res.write(`<td style="padding-inline:8px">${book[key]}</td>`);
			}
		}
		res.write(`<td style="padding-inline:8px">${dayjs(book.date).fromNow(true)}</td>`);
		res.write(`</tr>`);
	}
	res.write(`</tbody>
    </table>`);

	// On écrit le pied de page de notre page html
	res.write('</body></html>');

	// On a fini d'envoyer nos informations au client
	res.end();
});

// Notre serveur sera sur le port 3000
server.listen(3000);
