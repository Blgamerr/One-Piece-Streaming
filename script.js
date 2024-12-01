fetch("episodes.txt")
  .then((response) => response.text())
  .then((data) => {
    const episodes = data
      .split("\n") // แยกแต่ละบรรทัด
      .filter((line) => line.trim() !== "") // ลบบรรทัดว่าง
      .map((line) => {
        const [title, url] = line.split(","); // แยกชื่อกับ URL
        return { title: title.trim(), url: url.trim() };
      });

    // สร้างปุ่มสำหรับแต่ละตอน
    const episodeButtons = document.getElementById("episodeButtons");
    episodes.forEach((episode) => {
      const button = document.createElement("button");
      button.textContent = episode.title;
      button.classList.add("episode-btn");
      button.addEventListener("click", () => {
        loadEpisode(episode.url);
      });
      episodeButtons.appendChild(button);
    });
  })
  .catch((error) => {
    console.error("Error loading episodes:", error);
  });

// ฟังก์ชันสำหรับโหลดตอน
function loadEpisode(url) {
  const videoPlayer = document.getElementById("videoPlayer");
  const videoSource = document.getElementById("videoSource");
  videoSource.src = url;
  videoPlayer.load();
  videoPlayer.play();
}