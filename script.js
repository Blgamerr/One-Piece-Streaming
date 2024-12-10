document.addEventListener("DOMContentLoaded", async () => {
  const player = new MediaElementPlayer('player', {
    features: ['playpause', 'progress', 'volume', 'fullscreen']
  });

  const episodeButtons = document.getElementById('episode-buttons');

  async function loadEpisodes() {
    try {
      const response = await fetch('episodes.txt');
      const text = await response.text();
      const episodes = text.split('\n').map(line => {
        const [title, url] = line.split(',');
        return { title: title.trim(), url: url.trim() };
      });

      episodes.forEach(episode => {
        const button = document.createElement('button');
        button.textContent = episode.title;
        button.onclick = () => {
          player.media.src = episode.url;
          player.load();
          player.play();
        };
        episodeButtons.appendChild(button);
      });
    } catch (error) {
      console.error('Error loading episodes:', error);
    }
  }

  loadEpisodes();
});
