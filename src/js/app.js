import AddImg from './AddImg.js';
 
const blockImg = document.getElementsByClassName('block-img')[0];
const elementError = document.getElementById('error-url');
 
const buttonSelectFile = document.querySelector('#button-select');
const elSelectFile = document.querySelector('#drop-file');
 
const addImg = new AddImg(blockImg, elementError);
 
function loadFile(files) {
  for (const item of files) {
    const urlImg = URL.createObjectURL(item);
    addImg.createImg('nameImg', urlImg);
    buttonSelectFile.addEventListener('load', () => {
      URL.revokeObjectURL(urlImg);
    });
  }
}
 
elSelectFile.addEventListener('click', () => {
  buttonSelectFile.value = null;
  buttonSelectFile.dispatchEvent(new MouseEvent('click'));
});
 
elSelectFile.addEventListener('dragover', (event) => {
  event.preventDefault();
});
 
elSelectFile.addEventListener('drop', (event) => {
  event.preventDefault();
  const files = Array.from(event.dataTransfer.files);
  loadFile(files);
});
 
buttonSelectFile.addEventListener('change', (event) => {
  const files = Array.from(event.currentTarget.files);
  loadFile(files);
});
 
blockImg.addEventListener('click', (event) => {
  if (event.target.className === 'close') {
    const itemElemnt = event.target.closest('.item-img-div');
    blockImg.removeChild(itemElemnt);
  }
});
const elLinks = document.querySelector('.link-files');
const elLoadSize = document.querySelector('.load-size');
 
buttonSelectFile.addEventListener('change', async (evt) => {
  const urlImg = `./img/Зима.jpg`;
  const fff =  await fetch(urlImg).then(r => r.blob());;
  // console.log(fff);
  // console.log(buttonSelectFile.files = 'C:/fakepath/molot.png');
  // console.log(buttonSelectFile.files);
    console.log(ttt)

  const files = Array.from(evt.currentTarget.files);
  const file = files[0];
  
  // console.log(file);
  let sumSizeFile = Number(elLoadSize.textContent) + (file.size / (1024 * 1024));
  elLoadSize.textContent = sumSizeFile.toFixed(2);
  const a = document.createElement('a');
  a.download = file.name;
  a.href = URL.createObjectURL(file);
  a.rel = 'noopener';
  a.textContent = file.name;
  elLinks.appendChild(a);
  //setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  // setTimeout(() => a.dispatchEvent(new MouseEvent('click')));
  });
  
  elLinks.addEventListener('click', (event) => {
    event.preventDefault();
    // console.log(getFile(event.target.href));
    // URL.createObjectURL(event.target.href);

    const urlImg = `./img/Зима.jpg`;

    let blob = null
    let xhr = new XMLHttpRequest()
    xhr.open("GET", urlImg)
    xhr.responseType = "blob"
    xhr.onload = function() 
    {
      blob = xhr.response
      LoadAndDisplayFile(blob)
    }
    xhr.send();
    
  })


function LoadAndDisplayFile(blob) {
  console.log(blob);
}