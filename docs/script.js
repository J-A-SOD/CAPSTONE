const contentEl = document.getElementById("content");
const navLinks = document.querySelectorAll(".nav-link");

async function loadPage(pageName) {
  try {
    const response = await fetch(`docs/${pageName}.md`);
    if (!response.ok) throw new Error("Page not found");
    const markdown = await response.text();
    contentEl.innerHTML = marked.parse(markdown);
  } catch (err) {
    contentEl.innerHTML = `<p>Could not load this page.</p>`;
  }
}

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    loadPage(link.dataset.page);
  });
});

// load first page on start
loadPage("introduction");