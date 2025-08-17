// 用 localStorage 替代 fs
export function loadPlayers() {
  let data = localStorage.getItem('players');
  if (data) {
    let players = JSON.parse(data);
    let nowYear = new Date().getFullYear();
    return players.map(p => {
      let regYear = new Date(p.regDate).getFullYear();
      let age = Number(p.age) + (nowYear - regYear);
      return { ...p, age };
    });
  }
  return [];
}

export function savePlayers(players) {
  localStorage.setItem('players', JSON.stringify(players));
}