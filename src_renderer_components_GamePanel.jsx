import React, { useState, useEffect } from 'react';
import i18n from '../i18n';
import '../styles/theme.css';

function genQuestion() {
  let a, b, op;
  do {
    a = Math.floor(Math.random() * 101);
    b = Math.floor(Math.random() * 101);
    op = Math.random() > 0.5 ? '+' : '-';
  } while (a + b > 100 || a + b < 0 || a - b < 0);
  return { a, b, op };
}

export default function GamePanel({ player, onQuit, onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [timer, setTimer] = useState(10);
  const [score, setScore] = useState({ correct: 0, wrong: 0, wrongList: [] });
  const [result, setResult] = useState(null);

  useEffect(() => {
    setQuestions(Array.from({ length: 20 }, () => genQuestion()));
    setIdx(0);
    setScore({ correct: 0, wrong: 0, wrongList: [] });
    setTimer(10);
  }, [player]);

  useEffect(() => {
    if (result !== null) return;
    if (timer <= 0) checkAnswer();
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, result, idx]);

  function checkAnswer() {
    const q = questions[idx];
    if (!q) return; // 防止未加载完成时报错
    let ans = q.op === '+' ? q.a + q.b : q.a - q.b;
    let isCorrect = Number(input) === ans;
    if (isCorrect) setScore(s => ({ ...s, correct: s.correct + 1 }));
    else setScore(s => ({ ...s, wrong: s.wrong + 1, wrongList: [...s.wrongList, q] }));
    setResult(isCorrect);
    setTimeout(() => {
      setResult(null);
      setIdx(i => i + 1);
      setInput('');
      setTimer(10);
    }, 1200);
  }

  if (idx >= 20) {
    // 统计成绩与排名
    onFinish && onFinish(score);
    return (
      <div className="panel card">
        <h2>{i18n("score")} / Score: {score.correct} / 20</h2>
        <div className="score-block">
          <span>{i18n("correct")}: {score.correct}</span>
          <span>{i18n("wrong")}: {score.wrong}</span>
        </div>
        <button className="btn" onClick={() => window.location.reload()}>{i18n("next_group")}</button>
        <button className="btn btn-secondary" onClick={onQuit}>{i18n("quit")}</button>
      </div>
    );
  }

  const q = questions[idx];
  // 若题目未生成好，显示 loading，避免报错
  if (!q) {
    return <div className="panel card"><h2>Loading...</h2></div>;
  }

  return (
    <div className="panel card">
      <div className="question-block">
        <div className="question-header">
          <span className="question-index">{i18n("question")} {idx + 1} / 20</span>
          <span className="timer">{i18n("timer") || "倒计时"}: <b>{timer} s</b></span>
        </div>
        <div className="question-main">
          <span className="math">{q.a} {q.op} {q.b} = ?</span>
        </div>
      </div>
      <div className="input-block">
        <input
          className="answer-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          type="number"
          placeholder={i18n("your_answer") || "你的答案"}
          autoFocus
          onKeyDown={e => {
            if (e.key === 'Enter') checkAnswer();
          }}
        />
        <button className="btn" onClick={checkAnswer}>{i18n("submit") || "提交 / Submit"}</button>
      </div>
      <div className="result-block">
        {result !== null && (
          <div>
            {result
              ? <span className="result-correct">😊 {i18n("correct") || "正确"}</span>
              : <span className="result-wrong">😢 {i18n("wrong") || "错误"}</span>
            }
          </div>
        )}
      </div>
      <div className="actions">
        <button className="btn btn-secondary" onClick={onQuit}>{i18n("quit") || "退出"}</button>
      </div>
    </div>
  );
}