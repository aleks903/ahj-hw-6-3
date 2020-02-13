// ****************************
const clickLoadForm = document.querySelector('.load-form');
const totalDownload = document.querySelector('.total');

function urlToFile(url) {
  const itemUrl = url.replace(/^.*[\\\/]/, ''); //eslint-disable-line
  return itemUrl;
}

function urlToName(url) {
  let itemUrl = urlToFile(url);
  itemUrl = itemUrl.replace(/.[^.]+$/, '');
  return itemUrl;
}

function sizeString(size) {
  let i = 0;
  let itemSize = size;
  const type = ['б', 'Кб', 'Мб', 'Гб', 'Тб', 'Пб'];
  while ((itemSize / 1000 | 0) && i < type.length - 1) { //eslint-disable-line
    itemSize /= 1024;
    i += 1;
  }
  return `${itemSize.toFixed(2)} ${type[i]}`;
}

clickLoadForm.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.classList.contains('link')) {
    totalDownload.dataset.total = Number(totalDownload.dataset.total)
    + Number(event.target.href.length);
    totalDownload.textContent = sizeString(totalDownload.dataset.total);
    event.target.dispatchEvent(new MouseEvent('click'));
  }
});

function toDataUrl(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    callback(xhr.response);
  };
  xhr.send();
}

function addItemFile(parentEl, name, size, link) {
  const itemDiv = document.createElement('div');
  itemDiv.className = 'item-file';
  itemDiv.innerHTML = `
    <span class="name">${urlToName(name)}</span>
    <span class="size">${sizeString(size)}</span>
    <span class="link"><a class="link" download="${urlToFile(name)}" href="${link}">Download</a></span>
  `;
  parentEl.appendChild(itemDiv);
}

function start() {
  const parentEl = document.querySelector('.load-form');
  const listFiles = [
    './files/Storage Standard.pdf',
    './files/XMLHttpRequest Standard.pdf',
    './files/Streams Standard.pdf',
  ];

  for (let i = 0; i < listFiles.length; i += 1) {
    toDataUrl(listFiles[i], (resp) => {
      const { size } = resp;
      const fr = new FileReader();

      fr.onload = function () {
        const dataURL = this.result;
        const localName = listFiles[i];
        console.log(localName);
        addItemFile(parentEl, listFiles[i], size, dataURL);
      };

      fr.readAsDataURL(resp);
    });
  }
}

start();
