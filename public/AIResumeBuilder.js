function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.getElementById("resumeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const fullName = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const education = document.getElementById("education").value;
  const workExperience = document.getElementById("workExperience").value;
  const skills = document.getElementById("skills").value;

  // Build resume HTML
  const resumeContent = `
    <h1>${escapeHTML(fullName)}</h1>
    <p><strong>Email: </strong>${escapeHTML(email)}</p>
    <p><strong>Education: </strong>${escapeHTML(education)}</p>
    <p><strong>Work Experience: </strong>${escapeHTML(workExperience)}</p>
    <p><strong>Skills: </strong>${escapeHTML(skills)}</p>
  `;

  const designClass = document.getElementById("design").value;

  const newWindow = window.open("", "_blank");

  newWindow.document.write(`
    <html>
      <head>
        <title>Resume - ${fullName}</title>
        <link rel="stylesheet" href="AIResumeBuilder.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"><\/script>
      </head>
      <body>
        <div id="resume" class="${designClass}">
          ${resumeContent}
        </div>
        <button id="aiImproveBtn">AI Improve</button>
        <button id="downloadBtn">Download as PDF</button>

      </body>
    </html>
  `);

  newWindow.document.close(); // Finish writing

  newWindow.onload = function () {
    newWindow.document
      .getElementById("aiImproveBtn")
      .addEventListener("click", async function () {
        try {
          const response = await fetch("/api/ai-improve", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fullName: fullName,
              email: email,
              education: education,
              workExperience: workExperience,
              skills: skills,
            }),
          });

          const data = await response.json();

          if (data.improvedResume) {
            newWindow.document.getElementById("resume").innerHTML =
              data.improvedResume;
          } else {
            alert("AI improvement failed.");
          }
        } catch (err) {
          console.error("Error:", err);
          alert("Failed to contact AI service.");
        }
      });

    newWindow.document
      .getElementById("downloadBtn")
      .addEventListener("click", function () {
        const resume = newWindow.document.getElementById("resume");
        const options = {
          margin: 0.5,
          filename: "resume.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        newWindow.html2pdf().set(options).from(resume).save();
      });
  };
});
