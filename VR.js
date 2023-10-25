document.addEventListener('DOMContentLoaded', function () {
    const videoContainer = document.querySelector('.video_container');
    const videospheres = document.querySelectorAll('a-videosphere');
    const playPauseBtn = document.getElementById('playPause');
    const volumeSlider = document.getElementById('volume');
    const fullscreenBtn = document.getElementById('fullscreen');
    const closeButton = document.getElementById('close');
    const progress = document.getElementById('progress');
    const currentTimeElem = document.getElementById('currentTime');
    const totalTimeElem = document.getElementById('totalTime');
    const ap2btn = document.getElementById('ap2btn');
    const ap2container = document.querySelector('.ap2container');
    const ap2close = document.getElementById('ap2close');
    const ap2video = document.querySelector('.ap2container video');

    let activeVideo = null;

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${String(secs).padStart(2, '0')}`;
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function () {
            const videosphereId = this.dataset.videosphereId;
            videospheres.forEach(vs => {
                if (vs.id === videosphereId) {
                    vs.setAttribute('visible', 'true');
                    activeVideo = vs.components.material.material.map.image;
                    activeVideo.addEventListener('timeupdate', function () {
                        currentTimeElem.textContent = formatTime(activeVideo.currentTime);
                        progress.value = (activeVideo.currentTime / activeVideo.duration) * 100;
                    });
                } else {
                    vs.setAttribute('visible', 'false');
                }
            });
            videoContainer.style.visibility = 'visible';
            activeVideo.currentTime = 0;
            currentTimeElem.textContent = formatTime(0);
            totalTimeElem.textContent = formatTime(activeVideo.duration);
            progress.value = 0;
        });
    });

    playPauseBtn.addEventListener('click', function () {
        if (activeVideo.paused) {
            activeVideo.play();
            this.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
        } else {
            activeVideo.pause();
            this.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
        }
    });

    volumeSlider.addEventListener('input', function () {
        if (activeVideo) {
            activeVideo.volume = this.value;
        }
    });

    fullscreenBtn.addEventListener('click', function () {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            videoContainer.requestFullscreen();
        }
    });

    closeButton.addEventListener('click', function () {
        if (!activeVideo.paused) {
            activeVideo.pause();
            playPauseBtn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
        }
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        videoContainer.style.visibility = 'hidden';
    });

    progress.addEventListener('input', function () {
        const seekTime = (this.value / 100) * activeVideo.duration;
        activeVideo.currentTime = seekTime;
    });

    ap2btn.addEventListener("click", function() {
        console.log("ap2btn clicked"); 
        ap2container.style.visibility = "visible";
        ap2video.pause();
    });

    ap2close.addEventListener("click", function() {
        ap2container.style.visibility = "hidden";
        ap2video.currentTime = 0;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    });

});



   

