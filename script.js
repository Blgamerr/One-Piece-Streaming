document.addEventListener("DOMContentLoaded", async () => {
  const player = new MediaElementPlayer('player', {
    features: ['playpause', 'progress', 'volume', 'fullscreen']
  });

  const episodeButton = document.getElementById('episode-button');
  const episodeButtonsContainer = document.getElementById('episode-buttons');

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
          episodeButtonsContainer.style.display = 'none'; // Hide after selecting
        };
        episodeButtonsContainer.appendChild(button);
      });
    } catch (error) {
      console.error('Error loading episodes:', error);
    }
  }

  // Toggle visibility of episode buttons when clicked
  episodeButton.addEventListener('click', () => {
    episodeButtonsContainer.style.display = episodeButtonsContainer.style.display === 'none' ? 'flex' : 'none';
  });

  loadEpisodes();
});
