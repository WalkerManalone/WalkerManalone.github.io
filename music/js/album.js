document.addEventListener("DOMContentLoaded", () => {
    // Tabs
    const songsTab = document.getElementById('songsTab');
    const bioTab = document.getElementById('bioTab');
    const songsContainer = document.getElementById('songs');
    const bioContainer = document.getElementById('bio');

    songsTab.addEventListener('click', () => {
        songsContainer.classList.add('active');
        bioContainer.classList.remove('active');
        songsTab.classList.add('active');
        bioTab.classList.remove('active');
    });

    bioTab.addEventListener('click', () => {
        songsContainer.classList.remove('active');
        bioContainer.classList.add('active');
        bioTab.classList.add('active');
        songsTab.classList.remove('active');
    });

    // Load songs from song.txt
    fetch('data/song.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const songList = document.getElementById('songList');
            const songs = data.trim().split('\n');
            songs.forEach(song => {
                const parts = song.split('|');
                const number = parts[0].split(':')[1].trim();
                const namePart = parts[1].split('「');
                const songName = namePart[0].split(':')[1].trim();
                const artistName = namePart[1].split('」')[0].trim();
                const linkMatch = namePart[1].match(/\[link:(.*?)\]/);
                const link = linkMatch ? linkMatch[1] : '#';

                const listItem = document.createElement('li');
                listItem.classList.add('song-item');
                listItem.innerHTML = `
                    <div class="song-title">
                        <a href="${link}">
                            <strong>${number}. ${songName}</strong>
                            <span class="artist-name">${artistName}</span>
                        </a>
                    </div>
                `;
                songList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error loading song.txt:', error));

    // Load bio from wiki.txt
    fetch('data/wiki.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const bioContent = document.getElementById('bioContent');
            bioContent.textContent = data.trim();
        })
        .catch(error => console.error('Error loading wiki.txt:', error));
});
