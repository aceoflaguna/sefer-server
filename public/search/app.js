const bookSelect = document.getElementById("book");
const results = document.getElementById("results");

loadBooks();

async function loadBooks() {
  const books = await fetch("/api/books").then((r) => r.json());

  books.forEach((b) => {
    const op = document.createElement("option");

    op.value = b.id;
    op.textContent = b.name;

    bookSelect.appendChild(op);
  });
}

document.getElementById("btnSearch").onclick = search;

document.getElementById("search").addEventListener("keypress", (e) => {
  if (e.key === "Enter") search();
});

async function search() {
  const keyword = document.getElementById("search").value;

  const book = bookSelect.value;

  const rows = await fetch(
    `/api/search?keyword=${encodeURIComponent(keyword)}&book=${book}`,
  ).then((r) => r.json());

  results.innerHTML = "";

  rows.forEach((r) => {
    const div = document.createElement("div");

    div.className = "card";

    const highlighted = highlight(r.text, keyword);

    div.innerHTML = `
    <div class="card-body">

        <h5>${r.book} ${r.chapter}:${r.verse}</h5>
        <p>${highlighted}</p>

    </div>
    `;

    results.appendChild(div);
  });
}

function highlight(text, word) {
  if (!word) return text;

  const regex = new RegExp(`(${escapeRegex(word)})`, "gi");

  return text.replace(regex, "<span class='highlight'>$1</span>");
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
