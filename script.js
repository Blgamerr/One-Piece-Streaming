document.addEventListener("DOMContentLoaded", async () => {
  const player = new MediaElementPlayer("player");
  const episodeList = document.getElementById("episode-list");

  // ฟังก์ชันสำหรับโหลดข้อมูลจากไฟล์ TXT
  async function loadEpisodes() {
    try {
      const response = await fetch("episodes.txt");
      const text = await response.text();
      const episodes = text.split("\n").map(line => {
        const [title, url] = line.split(",");
        return { title: title.trim(), url: url.trim() };
      });

      // สร้างแถบเลือกตอน
      episodes.forEach(episode => {
        const listItem = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = episode.title;
        button.addEventListener("click", () => {
          player.setSrc(episode.url);
          player.play();
        });
        listItem.appendChild(button);
        episodeList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error loading episodes:", error);
    }
  }

  // เรียกฟังก์ชันโหลดตอน
  loadEpisodes();
});

