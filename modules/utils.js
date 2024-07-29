const books = require('./books');

const dayjs = require('dayjs');
// const relativeTime = require('dayjs/plugin/relativeTime');
// dayjs.extend(relativeTime);
const locale_fr = require('dayjs/locale/fr');
dayjs.locale(locale_fr);
const advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);
dayjs().format('Q Do k kk X x');

let html = `<h1 style="margin-left:8px"> Books' collection&nbsp;:</h1><table><thead><tr>`;

const utils = {
	displayTable() {
		for (const key in books[0]) {
			html += `<th scope="col" style="color:blue;margin:16px;text-transform:uppercase;text-align:left;padding-inline:8px"> ${key}</th>`;
		}

		html += `<th scope="col" style="color:blue;margin:16px;text-transform:uppercase;text-align:left;padding-inline:8px">age</th></tr></thead><tbody>`;

		for (const book of books) {
			html += `<tr>`;

			for (const key in book) {
				if (key === 'title') {
					html += `<th scope="row" style="text-align:left; padding-inline:8px">${book.title}</th>`;
				} else if (key === 'date') {
					html += `<td style="padding-inline:8px">${dayjs(book[key]).format('dddd Do MMMM YYYY')}</td>`;
				} else {
					html += `<td style="padding-inline:8px">${book[key]}</td>`;
				}
			}

			html += `<td style="padding-inline:8px">${dayjs(book.date).fromNow(true)}</td></tr>`;
		}

		return (html += `</tbody></table>`);
	},
};

module.exports = utils;
