export const utils = {

	init: () => {
		document.querySelectorAll('.toggle-menu').forEach((el) => {
			el.onclick = () => { utils.toggleMenu(); };
		});

		utils.get = utils.getQueryParams();
	},

	toggleMenu: () => {
		const el = document.getElementById('menu');
		if (el.classList.contains('hidden') || el.classList.contains('mobile-hidden')) {
			el.classList.remove('hidden');
			el.classList.remove('mobile-hidden');
		} else {
			el.classList.add('hidden');
			el.classList.add('mobile-hidden');
		}
	},
	
	toggleFullScreen: () => {
		var doc = window.document;
		var docEl = doc.documentElement;
		var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
		var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
		if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
			requestFullScreen.call(docEl);
		} else {
			cancelFullScreen.call(doc);
		}
	},

	copyToClipboard: (containerid) => {
		if (document.selection) { 
			var range = document.body.createTextRange();
			range.moveToElementText(document.getElementById(containerid));
			range.select().createTextRange();
			document.execCommand("Copy"); 
		} else if (window.getSelection) {
			var range = document.createRange();
			range.selectNode(document.getElementById(containerid));
			window.getSelection().removeAllRanges();
			window.getSelection().addRange(range);
			document.execCommand("Copy");
		}
	},

	randID: () => {
		return (Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7));
	},

	loadPage: async (url, elementID, modifierFunc=false) => {
		await fetch(url)
		.then(response => response.text())
		.then((responseText) => {
			if (modifierFunc) {
				responseText = modifierFunc(responseText);
			}
			document.getElementById(elementID).innerHTML = responseText; 
		});
	},

	loadJSON: async (url) => {
		return new Promise(resolve => {
			fetch(url)
  		.then(response => response.json())
  		.then(json => resolve(json));
		});
	},

	placeCaretAtEnd: (el) => {
		el.focus();
		if (typeof window.getSelection != "undefined"
				&& typeof document.createRange != "undefined") {
			const range = document.createRange();
			range.selectNodeContents(el);
			range.collapse(false);
			const sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
		} else if (typeof document.body.createTextRange != "undefined") {
			const textRange = document.body.createTextRange();
			textRange.moveToElementText(el);
			textRange.collapse(false);
			textRange.select();
		}
	},

	getQueryParams: () => {
		const qs = document.location.search.split("+").join(" ");
		const params = {};
		let tokens;
		const regex = /[?&]?([^=]+)=([^&]*)/g;
		while (tokens = regex.exec(qs)) {
			params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
		}
		return params;
	},

	detectEnterKey: (event,enterCB=false) => {
		if (!event) event = window.event;
		const keyCode = event.keyCode || event.which;
		if (keyCode == '13') {
			if (event.shiftKey !== true) {
				enterCB();
			}
		}
	},

	errorHandling: (error) => {
		console.log(`Error: ${error}`);
		const errorReport = document.getElementById('error-report');
		errorReport.classList.remove('hidden');
		errorReport.innerHTML = `⚠️ ${error}`;
		setTimeout(() => { errorReport.classList.add('hidden'); }, 10000);
	},

	launchModal: (htmlContent) => {
		document.getElementById('modal-content').innerHTML = htmlContent;
		document.getElementById('modal').classList.remove('hidden');
		document.getElementById('modal-close').onclick = () => {
			document.getElementById('modal').classList.add('hidden');
		};
	},

	camelize: (str) => {
		return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
			return index === 0 ? word.toLowerCase() : word.toUpperCase();
		}).replace(/\s+/g, '');
	},

};
