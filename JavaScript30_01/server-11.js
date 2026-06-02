// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// 静态文件托管
app.use(express.static(__dirname));

// 获取视频列表接口
app.get('/api/getVideoList', (req, res) => {
    const videoDir = path.join(__dirname, 'video');
    fs.readdir(videoDir, (err, files) => {
        if (err) return res.json([]);
        // 过滤视频文件
        const videoFiles = files.filter(file => {
            const ext = file.split('.').pop().toLowerCase();
            return ['mp4', 'webm', 'ogg'].includes(ext);
        });
        res.json(videoFiles);
    });
});

app.listen(3000, () => console.log('服务器运行在 http://localhost:3000'));