const defaultTeams = [
  { name: "GIAHX", logo: "logos/team1.jpeg", points: 0 },
  { name: "CATSEYE", logo: "logos/team2.jpg", points: 0 },
  { name: "TRIVIUM", logo: "logos/team3.jpg", points: 0 },
  { name: "AUREON", logo: "logos/team4.jpg", points: 0 },
  { name: "MANTRA", logo: "logos/team5.jpg", points: 0 },
  { name: "HEXAURA", logo: "logos/team6.jpg", points: 0 },
  { name: "AETHERON", logo: "logos/team7.jpg", points: 0 }
];

// Load from localStorage or use default
let teams = JSON.parse(localStorage.getItem("pointsTable")) || defaultTeams;

function saveData() {
  localStorage.setItem("pointsTable", JSON.stringify(teams));
}

function renderTable() {
  const body = document.getElementById("table-body");
  body.innerHTML = "";

  teams
    .sort((a, b) => b.points - a.points)
    .forEach((team, index) => {
      body.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td class="team">
            <img src="${team.logo}">
            ${team.name}
          </td>
          <td>${team.points}</td>
          <td>
            <input 
              type="number"
              id="input-${index}"
              value="1"
              min="1"
              style="width:55px; text-align:center;"
            >
            <button class="add" onclick="changePoints(${index}, 1)">+</button>
            <button class="sub" onclick="changePoints(${index}, -1)">−</button>
          </td>
        </tr>
      `;
    });
}

function changePoints(index, sign) {
  const input = document.getElementById(`input-${index}`);
  const value = parseInt(input.value);

  if (isNaN(value) || value <= 0) return;

  teams[index].points += sign * value;
  if (teams[index].points < 0) teams[index].points = 0;

  saveData();
  input.value = 1;
  renderTable();
}

renderTable();
