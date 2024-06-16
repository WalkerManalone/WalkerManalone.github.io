const videoPlayer = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const seekBar = document.getElementById('seekBar');
const muteBtn = document.getElementById('muteBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const timeDisplay = document.getElementById('timeDisplay');

// 播放/暂停按钮功能
playPauseBtn.addEventListener('click', () => {
    if (videoPlayer.paused) {
        videoPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// 更新进度条和时间显示
videoPlayer.addEventListener('timeupdate', () => {
    const value = (100 / videoPlayer.duration) * videoPlayer.currentTime;
    seekBar.value = value;
    updateTimeDisplay();
});

// 进度条功能
seekBar.addEventListener('input', () => {
    const time = videoPlayer.duration * (seekBar.value / 100);
    videoPlayer.currentTime = time;
});

// 静音按钮功能
muteBtn.addEventListener('click', () => {
    videoPlayer.muted = !videoPlayer.muted;
    muteBtn.innerHTML = videoPlayer.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
});

// 全屏按钮功能
fullscreenBtn.addEventListener('click', () => {
    if (videoPlayer.requestFullscreen) {
        videoPlayer.requestFullscreen();
    } else if (videoPlayer.mozRequestFullScreen) {
        videoPlayer.mozRequestFullScreen();
    } else if (videoPlayer.webkitRequestFullscreen) {
        videoPlayer.webkitRequestFullscreen();
    } else if (videoPlayer.msRequestFullscreen) {
        videoPlayer.msRequestFullscreen();
    }
});

// 更新时间显示功能
function updateTimeDisplay() {
    const currentMinutes = Math.floor(videoPlayer.currentTime / 60);
    const currentSeconds = Math.floor(videoPlayer.currentTime % 60);
    const durationMinutes = Math.floor(videoPlayer.duration / 60);
    const durationSeconds = Math.floor(videoPlayer.duration % 60);

    timeDisplay.textContent = 
        `${formatTime(currentMinutes)}:${formatTime(currentSeconds)} / ${formatTime(durationMinutes)}:${formatTime(durationSeconds)}`;
}

// 格式化时间函数
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
