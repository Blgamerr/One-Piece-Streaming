document.addEventListener("DOMContentLoaded", async () => {
  const player = new MediaElementPlayer('player', {
    features: ['playpause', 'progress', 'volume', 'fullscreen']
  });

  const slider = document.getElementById('episode-slider');
  
  async function loadEpisodes() {
    try {
      const response = await fetch('episodes.txt');
      const text = await response.text();
      const episodes = text.split('\n').map(line => {
        const [title, url] = line.split(',');
        return { title: title.trim(), url: url.trim() };
      });

      slider.max = episodes.length - 1;  // Set max value based on number of episodes

      slider.addEventListener('input', () => {
        const selectedEpisode = episodes[slider.value];
        player.media.src = selectedEpisode.url;
        player.load();
        player.play();
      });

    } catch (error) {
      console.error('Error loading episodes:', error);
    }
  }

  loadEpisodes();
});
