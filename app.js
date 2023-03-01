// Get Our Elemenets
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')

const toggle =  player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

// Build Our FUnctions

/* first we are going to build play button function*/
function togglePlay(){
    if(video.paused){
        video.play()
    }else{
        video.pause()
    }
}
/* Update Play Pause Button*/
function updateButton(){
    const icon = this.paused ? '►' : '||'
    toggle.textContent = icon
}

/* skip button */
function skip(){
    video.currentTime += parseFloat(this.dataset.skip)
}

/* volume and playback speed*/
function handleRangeUpdate(){
    video[this.name] = this.value
}

// Progress bar
function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

// Scrub
function scrub(e){
     const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
     video.currentTime = scrubTime
}


// Hook up event listners

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)
toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))


let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', ()=> mousedown && scrub(e))
progress.addEventListener('mousedown', () => {mousedown = true})
progress.addEventListener('mouseup', () => {mousedown = false})