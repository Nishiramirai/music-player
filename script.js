const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// Music
const songs = [
{
    {
        name: 'Fail Emotions - 148',
        displayName: '148',
        artist: 'Fail Emotions',
        image: 'FailEm.jpeg'
    },

    {
        name: 'Fail Emotions - Reborn',
        displayName: 'Reborn',
        artist: 'Fail Emotions',
        image: 'FailEm.jpeg'
    },

    
    {
        name: 'Our Last Night - Same Old War',
        displayName: 'Same Old War',
        artist: 'Our Last Night',
        image: 'OLN.jpeg'
    },
     {
        name: 'ONLAP - Losing My Mind',
        displayName: 'Losing My Mind',
        artist: 'Onlap',
        image: 'onlap.jpg'
    }
]

// Check if playing
let isPlaying = false

// Play
function playSong() {
    music.play()
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    isPlaying = true
}

// Pause
function pauseSong() {
    music.pause()
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', "Play")
    isPlaying = false
}

// Play of pause event listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()))

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.image}`
    
}

// Current song
let songIndex = 0


// Previous song
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

// Next song
function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}


// On Load - Select First Song
loadSong(songs[songIndex])

//Update Progress Bar and Time
function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement

        //Update progress bar width
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`

        // Calculate display for duration
        const duratiionMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }

        //Delay switcing duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${duratiionMinutes}:${durationSeconds}`
        }

        // Calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        
        //Delay switcing currentTime Element to avoid NaN
        if (currentSeconds) {
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
        }
        
    }
}

//Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const {duration} = music
    music.currentTime = (clickX / width) * duration
}

// Event Listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)
