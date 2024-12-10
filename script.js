document.addEventListener("DOMContentLoaded", async () => {
  const player = new MediaElementPlayer("player", {
    autoplay: false,
    features: ['playpause', 'progress', 'volume', 'fullscreen'],
  });

  const episodeSelect = document.getElementById("episode-select");

  // ฟังก์ชันโหลดข้อมูลจากไฟล์ TXT (หรือ index.m3u8)
  async function loadEpisodes() {
    try {
      const response = await fetch("episodes.txt");
      const text = await response.text();
      const episodes = text.split("\n").map(line => {
        const [title, url] = line.split(",");
        return { title: title.trim(), url: url.trim() };
      });

      // เพิ่มรายการตอนลงใน select dropdown
      episodes.forEach(episode => {
        const option = document.createElement("option");
        option.value = episode.url;
        option.textContent = episode.title;
        episodeSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error loading episodes:", error);
    }
  }

  loadEpisodes();

  // เมื่อเลือกตอนใหม่ให้เล่น
  episodeSelect.addEventListener("change", () => {
    const selectedUrl = episodeSelect.value;
    player.setSrc(selectedUrl);
    player.load();
    player.play();  // เริ่มเล่น
  });
});
