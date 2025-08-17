import React, { useState } from "react";
import LoginRegister from "./components/LoginRegister";
import GamePanel from "./components/GamePanel";
import RankingPanel from "./components/RankingPanel";
// import { loadPlayers, savePlayers } from "./utils/playerStore";

export default function App() {
  const [player, setPlayer] = useState(null);
  const [ranking, setRanking] = useState([]);
  const [score, setScore] = useState(null);

  const handleLogin = (form) => {
    // TODO: 查找player并填充player
    setPlayer({ ...form, name: form.account, age: 10, sex: "male", country: "中国", province: "广东", city: "广州" });
  };
  const handleRegister = (regForm) => {
    // TODO: 保存新玩家
    setPlayer({ ...regForm, regDate: new Date().toISOString() });
  };
  const handleFinish = (scoreObj) => {
    setScore(scoreObj);
    // TODO: 记录成绩并更新排名
    setRanking([
      { name: "Alice", score: 19, time: 30, age: 9, sex: "female", area: "中国-广东-广州" },
      { name: "Bob", score: 18, time: 35, age: 12, sex: "male", area: "美国-加州-洛杉矶" }
      // ...
    ]);
  };
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        {!player ? (
          <LoginRegister onLogin={handleLogin} onRegister={handleRegister} />
        ) : (
          <GamePanel player={player} onQuit={() => setPlayer(null)} onFinish={handleFinish} />
        )}
      </div>
      <div style={{ width: "350px", background: "#142c4a" }}>
        <RankingPanel ranking={ranking} />
      </div>
    </div>
  );
}