document.addEventListener("DOMContentLoaded", async () => {
  const player = new MediaElementPlayer('player', {
    features: ['playpause', 'progress', 'volume', 'fullscreen']
  });

  const episodeSelect = document.getElementById('episode-select');

  async function loadEpisodes() {
    try {
      const response = await fetch('episodes.txt');
      const text = await response.text();
      const episodes = text.split('\n').map(line => {
        const [title, url] = line.split(',');
        return { title: title.trim(), url: url.trim() };
      });

      episodes.forEach(episode => {
        const option = document.createElement('option');
        option.value = episode.url;
        option.textContent = episode.title;
        episodeSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error loading episodes:', error);
    }
  }

  loadEpisodes();

  episodeSelect.addEventListener('change', () => {
    const selectedUrl = episodeSelect.value;
    player.media.src = selectedUrl;
    player.load();
    player.play();
  });
});
