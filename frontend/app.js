const API = "http://localhost:5000";

function addOption() {
  const div = document.createElement("div");
  div.className = "option-input";

  div.innerHTML = `
    <input placeholder="Option" />
    <button onclick="removeOption(this)">❌</button>
  `;

  document.getElementById("options").appendChild(div);
}
function removeOption(btn) {
  btn.parentElement.remove();
}
async function createPoll() {
  
   const question = document.getElementById("question").value.trim();
  if (!question) { alert("Please enter a question!"); return; }

  const options = [...document.querySelectorAll("#options input")]
    .map(i => i.value.trim())
    .filter(v => v !== "");

  if (options.length < 2) { alert("Please add at least 2 options!"); return; }


  await fetch(`${API}/polls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, options })
  });
document.getElementById("question").value = "";
document.getElementById("options").innerHTML = "";
  loadPolls();
}

async function loadPolls() {
    
  const res = await fetch(`${API}/polls`);
  const polls = await res.json();
const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "{}");

  const container = document.getElementById("polls");
  container.innerHTML = "";

  polls.forEach(poll => {
    const div = document.createElement("div");
    div.className = "poll";

    div.innerHTML = `
      <h3>${poll.question}</h3>
   ${poll.options.map((opt, i) => `
  <button class="vote-btn"
    onclick="vote('${poll.id}', ${i})"
    ${votedPolls[poll.id] ?"disabled" : "" }
  >
    ${opt.text}
  </button><br>
`).join("")}
    
      <br>
      <button onclick="showResults('${poll.id}')">Show Results</button>
      <button class="delete-btn" onclick="deletePoll('${poll.id}')">Delete</button>
      
      <div id="results-${poll.id}"></div>
    `;

    container.appendChild(div);
  });
}

async function vote(id, optionIndex) {
  const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "{}");

  if (votedPolls[id]) {
    alert("You already voted!");
    return;
  }

  const res = await fetch(`${API}/polls/${id}/vote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ optionIndex })
  });

  const data = await res.json();
alert("Vote submitted successfully!");
  if (res.status === 403) {
    alert(data.error);
    return;
  }
  else{
    alert("Vote submitted successfully!");
  }

  votedPolls[id] = true;
  localStorage.setItem("votedPolls", JSON.stringify(votedPolls));

  showResults(id);
}

async function showResults(id) {
  const res = await fetch(`${API}/polls/${id}/results`);
  const data = await res.json();

  const div = document.getElementById(`results-${id}`);

  div.innerHTML = `
    <div style="margin-top: 16px;">
      ${data.results.map((r, index) => `
        <div class="result-item">
          <div class="result-header">
            <span class="option-name">${r.text}</span>
            <span class="vote-count">${r.votes} votes</span>
          </div>
          <div class="bar-container">
            <div class="bar" id="bar-${id}-${index}">
              ${r.percentage}%
            </div>
          </div>
        </div>
      `).join("")}
      <p class="total">Total Votes: ${data.totalVotes}</p>
    </div>
  `;

  setTimeout(() => {
    data.results.forEach((r, index) => {
      const bar = document.getElementById(`bar-${id}-${index}`);
      if (bar) bar.style.width = r.percentage + "%";
    });
  }, 100);
}

async function deletePoll(id) {
  await fetch(`${API}/polls/${id}`, { method: "DELETE" });
  loadPolls();
}

loadPolls();

