const dayjs = require('dayjs');
const advancedFormat = require('dayjs/plugin/advancedFormat');
const locale = require('dayjs/locale/fr');
const { books } = require('./modules/books');

dayjs.extend(advancedFormat);
dayjs.locale('fr');

let tableBody = '';

books.forEach(({ title, language, country, author, date }) => {
	const formattedDate = dayjs(date).format('dddd, Do MMMM YYYY');

	const age = dayjs().diff(dayjs(date), 'year');

	tableBody += `
  <tr> 
      <td>${title} </td>
      <td>${language} </td>
      <td>${country}</td> 
      <td>${author}</td> 
      <td>${formattedDate}</td>  
      <td>${age} years</td> 
  </tr>`;
});

const table = `
<table>
  <thead>
    <tr>
        <th>Titre</th>
        <th>Auteur</th>
        <th>Pays</th>
        <th>Langue</th>
        <th>Date de parution</th>
        <th>Âge</th>
    </tr>
  </thead>
  <tbody>
    ${tableBody}
  </tbody>
</table>
`;

module.exports = table;
