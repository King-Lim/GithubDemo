const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const progressHandle = player.querySelector('.progressHandle');
const toggle = player.querySelector('.toggle');
const fullscreenBtn = player.querySelector('.fullscreen');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const videoList = document.getElementById('videolist');

// 播放暂停
function togglePlay() {
    video[video.paused ? 'play' : 'pause']();
}

// 更新按钮图标
function updateButton() {
    toggle.textContent = video.paused ? '►' : '❚ ❚';
    if (video.paused) {
        player.classList.add('paused');
    } else {
        player.classList.remove('paused');
    }
}

// 快进快退
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// 音量 & 倍速
function handleRange() {
    video[this.name] = this.value;
}

// 进度条更新
function handleProgress() {
    if (!video.duration) return;
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = percent + '%';

    if (progressHandle) {
        progressHandle.style.left = percent + '%';
    }
}

// 进度条点击跳转
function scrub(e) {
    const percent = (e.offsetX / progress.offsetWidth) * 100;
    const time = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = time;

    progressBar.style.width = percent + '%';
    progressHandle.style.left = percent + '%';
}

// 全屏
function fullScreen() {
    if (!document.fullscreenElement) {
        player.requestFullscreen().catch(console.log);
    } else {
        document.exitFullscreen();
    }
}

// 自动加载视频列表
function getVideoList() {
    return new Promise(resolve => {
        const list = [];
        let idx = 1;
        function check() {
            const name = `demo-11-${idx}.mp4`;
            const v = document.createElement('video');
            v.onloadedmetadata = () => {
                list.push(name);
                idx++;
                check();
            };
            v.onerror = () => resolve(list);
            v.src = `./video/${name}`;
        }
        check();
    });
}

// 渲染列表
async function renderList() {
    const videos = await getVideoList();
    if (videos.length === 0) {
        videoList.innerHTML = '<li>暂无视频</li>';
        return;
    }

    videos.forEach((file, i) => {
        const li = document.createElement('li');
        li.textContent = file;
        li.dataset.src = `./video/${file}`;
        li.addEventListener('click', () => {
            video.src = li.dataset.src;
            video.play();
            document.querySelectorAll('#videolist li').forEach(l => l.classList.remove('active'));
            li.classList.add('active');
        });
        if (i === 0) li.classList.add('active');
        videoList.appendChild(li);
    });
}

// 事件绑定
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
fullscreenBtn.addEventListener('click', fullScreen);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('loadedmetadata', handleProgress);

skipButtons.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(r => r.addEventListener('input', handleRange));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
progress.addEventListener('mouseleave', () => mouseDown = false);

renderList();