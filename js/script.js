import { utils } from './utils.js';

utils.init();

const brand = 'Project Name';

if (utils.get.terms) utils.loadPage('pages/terms.html','content', (pageContent) => {
	return pageContent.split('[brand]').join(brand);
});
if (utils.get.privacy) utils.loadPage('pages/privacy.html','content', (pageContent) => {
	return pageContent.split('[brand]').join(brand);
});

if (utils.get.start) {
	utils.loadPage('pages/start.html','content');
	document.title = 'How To Get Started With Deno';
}
if (utils.get.examples) {
	utils.loadPage('pages/examples.html','content');
	document.title = 'Deno Example Code';
}
if (utils.get.snippets) {
	utils.loadPage('pages/snippets.html','content');
	document.title = 'Deno Code Snippets';
}
if (utils.get.community) {
	utils.loadPage('pages/community.html','content');
	document.title = 'Deno Community Websites';
}
if (utils.get.errors) {
	utils.loadPage('pages/errors.html','content');
	document.title = 'Deno Error Codes &amp; Solutions';
}


const switchLanguage = (lang) => {
	let alt = 'js';
	if (lang === 'js') alt = 'ts';
	document.querySelectorAll(`.button-${lang}`).forEach((el) => {
		el.style.background = '#7fb069';
	});
	document.querySelectorAll(`.button-${alt}`).forEach((el) => {
		el.style.background = '#fea82f';
	});
		document.querySelectorAll(`.${lang}`).forEach((el) => {
		el.classList.remove('hidden');
	});
	document.querySelectorAll(`.${alt}`).forEach((el) => {
		el.classList.add('hidden');
	});

	localStorage.setItem('lang', lang);
};
	hljs.configure({tabReplace: '  '})
	document.addEventListener('DOMContentLoaded', (event) => {
		document.querySelectorAll('pre code').forEach((block) => {
			hljs.highlightBlock(block);
		});
	});

const start = () => {
	document.querySelectorAll('pre code').forEach((block) => {
		hljs.highlightBlock(block);
	});

	document.querySelectorAll('.button-js').forEach((el) => {
		el.onclick = () => {
			switchLanguage('js');
		}
	});

	document.querySelectorAll('.button-ts').forEach((el) => {
		el.onclick = () => {
			switchLanguage('ts');
		}
	});

	document.querySelectorAll('.button-code-copy').forEach((el) => {
		el.onclick = () => {
			const elID = el.dataset.selection;
			utils.copyToClipboard(elID);
		}
	});

	if (localStorage.lang) {
		switchLanguage(localStorage.lang);
	} else {
		switchLanguage('js');
	}
};
start();