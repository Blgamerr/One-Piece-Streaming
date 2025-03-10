document.addEventListener("DOMContentLoaded", async () => {
  const playerElement = document.getElementById("player");
  const player = new MediaElementPlayer(playerElement);
  const episodeList = document.getElementById("episode-list");

  // ฟังก์ชันสำหรับโหลดข้อมูลจากไฟล์ TXT
  async function loadEpisodes() {
    try {
      const response = await fetch("episodes.txt");
      if (!response.ok) {
        throw new Error('Failed to load episodes file.');
      }
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
          // เปลี่ยนแหล่งข้อมูลและเล่นตอน
          player.setSrc(episode.url);
          player.play();
        });
        listItem.appendChild(button);
        episodeList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error loading episodes:", error);
      // แสดงข้อความแสดงข้อผิดพลาด
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "ไม่สามารถโหลดข้อมูลตอนได้ โปรดลองใหม่.";
      document.body.appendChild(errorMessage);
    }
  }

  // เรียกฟังก์ชันโหลดตอน
  loadEpisodes();
});
