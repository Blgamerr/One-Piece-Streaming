document.addEventListener("DOMContentLoaded", async () => {
  const player = new MediaElementPlayer('player', {
    features: ['playpause', 'progress', 'volume', 'fullscreen']
  });

  const episodeSelect = document.getElementById('episode-select');

  // Load the episodes
  async function loadEpisodes() {
    try {
      const response = await fetch('episodes.txt');
      
      if (!response.ok) {
        console.error('Failed to fetch episodes.txt');
        return;
      }

      const text = await response.text();
      console.log("Episodes data:", text);  // Log the content of episodes.txt

      const episodes = text.split('\n').map(line => {
        const [title, url] = line.split(',');
        return { title: title.trim(), url: url.trim() };
      });

      // Add episodes to the dropdown
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

  // Event listener for dropdown change
  episodeSelect.addEventListener('change', () => {
    const selectedUrl = episodeSelect.value;
    if (selectedUrl) {
      const playerElement = document.getElementById('player');
      playerElement.src = selectedUrl;
      player.load();
      player.play();
    }
  });

  loadEpisodes();
});
