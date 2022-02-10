chrome.browserAction.onClicked.addListener((tab) => {
chrome.tabs.executeScript({
  code: 'window.getSelection().toString();'
},
selection => {
  if (selection)
   search(selection[0]);
  else
  alert('no word selected')
}
);
});
function search(word){
  
  const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.title === "No Definitions Found") {
        alert('No definition was found for the word')
      } 
      else if (data.title === 'Something Went Wrong.' || data.title === 'API Rate Limit Exceeded') {
        alert('Internal Server error- Please try again in sometime');

      } else {
        let searchresult='Here\'s what we found for '+word+"\n";

        for (var k = 0; k < data.length; k++) {
          for (var i = 0; i < data[k].meanings.length; i++) {
            for (var j = 0; j < data[k].meanings[i].definitions.length; j++) {
              searchresult+='- '+data[k].meanings[i].definitions[j].definition+" "+"("+data[k].meanings[i].partOfSpeech+")"+"\n";
            }
          }
        }
        alert(searchresult)
      }
    })
    .catch(err => {
      console.log(err)
    })
}
