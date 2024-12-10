document.addEventListener("DOMContentLoaded", async () => {
  const player = new MediaElementPlayer("player", {
    autoplay: false,
    features: ['playpause', 'progress', 'volume', 'fullscreen'],
  });

  const episodeList = document.getElementById("episode-list");

  // ฟังก์ชันโหลดข้อมูลจากไฟล์ TXT (หรือ index.m3u8)
  async function loadEpisodes() {
    try {
      const response = await fetch("episodes.txt");
      const text = await response.text();
      const episodes = text.split("\n").map(line => {
        const [title, url] = line.split(",");
        return { title: title.trim(), url: url.trim() };
      });

      // สร้างปุ่มเลือกตอน
      episodes.forEach(episode => {
        const button = document.createElement("button");
        button.textContent = episode.title;
        button.addEventListener("click", () => {
          player.setSrc(episode.url);
          player.load();
          player.play();  // เล่นตอนใหม่
        });
        episodeList.appendChild(button);
      });
    } catch (error) {
      console.error("Error loading episodes:", error);
    }
  }

  loadEpisodes();
});
