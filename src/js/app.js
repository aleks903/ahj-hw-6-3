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
 
// buttonSelectFile.addEventListener('change', (event) => {
//   const files = Array.from(event.currentTarget.files);
//   loadFile(files);
// });
 
blockImg.addEventListener('click', (event) => {
  if (event.target.className === 'close') {
    const itemElemnt = event.target.closest('.item-img-div');
    blockImg.removeChild(itemElemnt);
  }
});
const elLinks = document.querySelector('.link-files');
const elLoadSize = document.querySelector('.load-size');
 
buttonSelectFile.addEventListener('change', async (evt) => {
  const urlImg = `./img/Storage Standard.pdf`;
  const fff =  await fetch(urlImg).then((r) => r.blob());
  
  console.log(URL.createObjectURL(fff));

  // console.log(URL.size(fff));
  const file = fff;
  // const file = new FileReader().readAsDataURL(fff);
  // console.log(file);
  // console.log(buttonSelectFile.files = 'C:/fakepath/molot.png');
  // console.log(buttonSelectFile.files);
    //console.log(ttt)

  // const files = Array.from(evt.currentTarget.files);
  //const file = files[0];
  
  // console.log(file);
  let sumSizeFile = Number(elLoadSize.textContent) + (file.size / (1024 * 1024));
  elLoadSize.textContent = sumSizeFile.toFixed(2);
  const a = document.createElement('a');
  a.download = file;
  a.href = URL.createObjectURL(file);
  a.rel = 'noopener';
  a.textContent = file.name;
  elLinks.appendChild(a);
  //setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  // setTimeout(() => a.dispatchEvent(new MouseEvent('click')));
  });
  
const elWinter = document.querySelector('#winter');
elWinter.addEventListener('load', (event) => {
  event.preventDefault();
  console.log(event);
});

document.querySelector('.temp').addEventListener('click', (event) => {
  event.preventDefault();
  console.log(new File([event.target.href],'name.pdf').size);
  ;
});
let dataUrlFile = null;
  elLinks.addEventListener('click', (event) => {
    event.preventDefault();
    // console.log(getFile(event.target.href));
    // URL.createObjectURL(event.target.href);

    const urlImg = `./img/Storage Standard.pdf`;
    // let dataUrlFile = null;
    toDataUrl(urlImg, (dataURL) => {
      dataUrlFile = new File([dataURL],'name.pdf');
      
      console.log(dataUrlFile.size);
      const file = URL.createObjectURL(dataUrlFile); 

      const a = document.createElement('a');
      a.class = 'links';
      a.download = dataUrlFile;
      a.href = dataURL;
      a.rel = 'noopener';
      a.setAttribute("download", 'name.pdf');
      a.textContent = dataUrlFile.name;
      document.querySelector('.temp').appendChild(a);
    });
    // let xhr = new XMLHttpRequest()
    // xhr.open("GET", urlImg)
    // xhr.responseType = "blob"
    // xhr.onload = function() 
    // {
    //   let fr = new FileReader();
    //   fr.onload = function() {
    //     // console.log('results');
    //     // console.log(this.result);
    //     dataUrlFile = this.result;
    //   }
    //   fr.readAsDataURL(xhr.response)
      
    //   // LoadAndDisplayFile(blob)
    // }
    // xhr.send();
    
    console.log(dataUrlFile);
  })

  function toDataUrl(url, callback) {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", url)
    xhr.responseType = "blob"
    xhr.onload = function() 
    {
      let fr = new FileReader();
      fr.onload = function() {
        // console.log('results');
        // console.log(this.result);
        callback(this.result);
      }
      fr.readAsDataURL(xhr.response);
      // LoadAndDisplayFile(blob)
    }
    xhr.send();
  }

function LoadAndDisplayFile(blob) {
  const dataUrl = new File([blob], 'file');
  console.log(dataUrl);
}
