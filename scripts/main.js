
window.addEventListener('load', function (params) {
  const result = fetchClassroomPlaylist();
  if(result){
    setPlaylistItems(result.items);
  }else{
    alert('Please, connect to the internet & start learning')
  }
}, false)

function fetchClassroomPlaylist(playlistID = '') {
  const API_KEY = 'AIzaSyApUGgHtgkFvndnjlxz5Vf9UVYIqQua5o0';
  const playlistId = playlistID || document.querySelector('.category').value;
 
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&key=${API_KEY}&playlistId=${playlistId}`
  
  fetch(url)
    .then(r => {
      if (!r.ok) {
        alert('Error');
        return false;
      }
      return r.json();
    })
    .then(data => {
      console.log('classroom playlist', data.items[0]);
      const items = data.items;
      setActiveVideo(items[0]);
      setPlaylistItems(items);
      return data;
    })
    .catch(error => {
      console.log('fetching ::error', error);
      return false;
    })
  
}

function setCurrentPlayerByVideoId(currentVideo) {
  const currentPlayer = document.querySelector('.video-player');
  const videoId = currentVideo.getAttribute('data-playlistitem-id');
  const srcUrl = `https://www.youtube.com/embed/${videoId}`;
  console.log('srcUr', srcUrl)
  currentPlayer.src = srcUrl;
}

function setActiveVideo(video) {
  const currentPlayer = document.querySelector('.video-player');
  const videoId = video.snippet.resourceId.videoId;
  // https://www.youtube.com/embed/SA36e80Qcbo
  const srcUrl = `https://www.youtube.com/embed/${videoId}`;
  console.log('srcUr', srcUrl)
  currentPlayer.src = srcUrl;
}

function setPlaylistItems(playlistData) {
  
  const playlists = playlistData.map( videoItem => {
    const videoId = videoItem.snippet.resourceId.videoId;
    const description = videoItem.snippet.description;
    const title = videoItem.snippet.title;
    const thumbImage = videoItem.snippet.thumbnails.medium.url;
    const playlistItem = `

      <div class="playlist-item" data-playlistitem-id=${videoId} onclick="setCurrentPlayerByVideoId(this)">
        <div class="img-thumb-wrapper">
          <img class="img-thumb" src=${thumbImage} alt="" />
        </div>
        <div class="playlist-content">
          <h2 class="playlist-item-title">${title} </h2>
          <article class="playlist-item-description">
            ${description}
          </article>
        </div>
      </div>

    `;

    return playlistItem;
  })

  const playlistDOM = document.querySelector('.playlist');
  playlistDOM.innerHTML = playlists;
  console.log('setting playlist items in DOM')
}

function onSelectPlaylist(playlistID) {
  console.log('selected category', playlistID)
  fetchClassroomPlaylist(playlistID)
}
