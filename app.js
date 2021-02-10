document.getElementById('searchBox').addEventListener('click',function(){
    const inputValue = document.getElementById('input').value 
    document.getElementById('input').value = '' 
    apiPart1(inputValue)
})
const apiPart1 = api=>{
fetch(` https://api.lyrics.ovh/suggest/${api}`)
.then(rel => rel.json())
.then(data=> {
    showDisplaySong(data.data)
})
.catch(() => error("Please try again.. "))
}
const showDisplaySong = showSong=>{
    // console.log(showSong)
    const songDiv = document.getElementById('songDiv')
    document.getElementById('songDiv').innerHTML=''
    showSong.forEach(element => {
        const createDivForSong = document.createElement('div')
        createDivForSong.className ="single-result row align-items-center my-3 p-3"
        createDivForSong.innerHTML=`
        <div class="col-md-9">
        <h3 class="lyrics-name">${element.title}</h3>
        <p class="author lead">Album by <span>${element.artist.name}</span></p>
        <audio controls>
            <source src="${element.preview}" type="audio/mpeg"
        </audio>    
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${element.artist.name}','${element.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
  
        `
        songDiv.appendChild(createDivForSong)
        // console.log(element)
    });
}


const error = error =>{
    const errorSection = document.getElementById('error')
    errorSection.innerText = error
}

const getLyrics = (artist,title) =>{
    const lyric = document.getElementById('lyrics')
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(rels => rels.json())
    .then(data=> lyric.innerText = data.lyrics)
    
    .catch(() => error("this lyrics arenot available"))
}