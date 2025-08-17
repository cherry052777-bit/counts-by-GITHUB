import React, { useState } from 'react';
import i18n from '../i18n';
import '../styles/theme.css';

export default function LoginRegister({ onLogin, onRegister }) {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ account:'', password:'', remember:false });
  const [regForm, setRegForm] = useState({
    account:'', password:'', name:'', age:'', sex:'male', country:'中国', province:'广东', city:'广州'
  });

  const countryList = ["中国", "美国", "日本"];
  const provinceList = { "中国": ["广东", "江苏"], "美国": ["加州"], "日本": ["东京"] };
  const cityList = { "广东": ["广州", "深圳"], "江苏": ["南京"], "加州": ["洛杉矶"], "东京": ["涉谷"] };

  return (
    <div style={{maxWidth:400,margin:"auto",padding:"2rem",background:"rgba(9,36,73,0.95)",borderRadius:"1rem"}}>
      <h2>{i18n("app_name")}</h2>
      <div style={{marginBottom:"1rem"}}>
        <button onClick={()=>setTab('login')}>{i18n("login")}</button>
        <button onClick={()=>setTab('register')}>{i18n("register")}</button>
      </div>
      {tab==='login' ? (
        <form>
          <label>{i18n("account")} / Account</label>
          <input value={form.account} onChange={e=>setForm({...form,account:e.target.value})} />
          <label>{i18n("password")} / Password</label>
          <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
          <label>
            <input type="checkbox" checked={form.remember} onChange={e=>setForm({...form,remember:e.target.checked})} />
            {i18n("remember_password")} / Remember Me
          </label>
          <button type="button" onClick={()=>onLogin(form)}>{i18n("login")}</button>
        </form>
      ) : (
        <form>
          <label>{i18n("account")} / Account</label>
          <input value={regForm.account} onChange={e=>setRegForm({...regForm,account:e.target.value})} />
          <label>{i18n("password")} / Password</label>
          <input type="password" value={regForm.password} onChange={e=>setRegForm({...regForm,password:e.target.value})} />
          <label>{i18n("player_name")} / Name</label>
          <input value={regForm.name} onChange={e=>setRegForm({...regForm,name:e.target.value})} />
          <label>{i18n("age")} / Age</label>
          <input type="number" value={regForm.age} onChange={e=>setRegForm({...regForm,age:e.target.value})} />
          <label>{i18n("sex")} / Gender</label>
          <select value={regForm.sex} onChange={e=>setRegForm({...regForm,sex:e.target.value})}>
            <option value="male">{i18n("male")}</option>
            <option value="female">{i18n("female")}</option>
          </select>
          <label>{i18n("country")} / Country</label>
          <select value={regForm.country} onChange={e=>setRegForm({...regForm,country:e.target.value,province:'',city:''})}>
            {countryList.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
          <label>{i18n("province")} / Province</label>
          <select value={regForm.province} onChange={e=>setRegForm({...regForm,province:e.target.value,city:''})}>
            {(provinceList[regForm.country]||[]).map(p=><option key={p} value={p}>{p}</option>)}
          </select>
          <label>{i18n("city")} / City</label>
          <select value={regForm.city} onChange={e=>setRegForm({...regForm,city:e.target.value})}>
            {(cityList[regForm.province]||[]).map(c=><option key={c} value={c}>{c}</option>)}
          </select>
          <button type="button" onClick={()=>onRegister(regForm)}>{i18n("register")}</button>
        </form>
      )}
    </div>
  );
}