import React from 'react';
import i18n from '../i18n';

export default function RankingPanel({ filter, ranking }) {
  // ranking: [{name,score,time,age,sex,area}]
  return (
    <div style={{maxHeight: '450px', overflowY: 'auto'}}>
      <h3>{i18n("rank")} / Ranking</h3>
      <div>
        {ranking.slice(0,50).map((p,i)=>(
          <div key={p.name} style={{padding:'.5em', borderBottom:'1px solid #333'}}>
            <span>{i+1}. {p.name} / {p.score}分 / {p.time}s</span>
            <span>({p.age}岁 / {i18n(p.sex)} / {p.area})</span>
          </div>
        ))}
      </div>
    </div>
  );
}