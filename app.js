// Pour une présentation de notre séléction littéraire
// nous utilisons un page web il nous faut donc la librairie http
// afin de créer notre serveur
const http = require('http');
const { title } = require('process');

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

	// On envoi les header de la réponse http
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
	res.write(` </tr>
    </thead>
    <tbody>`);

	for (const book of books) {
		res.write(`<tr>`);
		for (const key in book) {
			if (key === 'title') {
				res.write(`<th scope="row" style="text-align:left; padding-inline:8px">${book.title}</th>`);
			} else {
				res.write(`<td style="padding-inline:8px">${book[key]}</td>`);
			}
		}
		res.write(`</tr>`);
	}
	res.write(`</tbody>
    </table>`);

	// On écrit le pied de page de notre page html
	res.write('</body></html>');

	// On à fini d'envoyer nos informations au client
	res.end();
});

// Notre serveur sera sur le port 3000
server.listen(3000);
