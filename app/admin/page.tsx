'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { LogOut, RefreshCw, Trash2, Users } from 'lucide-react';

type Lead = { id: string; name: string; phone: string; email: string; created_at: string };

export default function AdminPage() {
  const [logged, setLogged] = useState(false);
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setLogged(false);
        if (res.status !== 401) setError(data.error || 'Não foi possível carregar os leads.');
        return false;
      }
      setLeads(data.leads || []);
      setLogged(true);
      return true;
    } catch {
      setLogged(false);
      setError('Não foi possível conectar ao painel.');
      return false;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function login(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Senha inválida');
        return;
      }

      // O cookie é criado pela resposta do login. Fazemos uma nova requisição
      // autenticada antes de trocar a tela, garantindo que a sessão realmente
      // está válida e evitando o loop login -> painel -> login.
      const leadsRes = await fetch('/api/admin/leads', {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
      });
      const leadsData = await leadsRes.json();
      if (!leadsRes.ok) {
        setError(leadsData.error || 'A sessão não pôde ser criada.');
        setLogged(false);
        return;
      }

      setLeads(leadsData.leads || []);
      setLogged(true);
      setPassword('');
    } catch {
      setError('Não foi possível entrar no painel.');
      setLogged(false);
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm('Excluir este lead permanentemente?')) return;
    const res = await fetch('/api/admin/leads', { method:'DELETE', headers:{'Content-Type':'application/json'}, credentials:'include', body:JSON.stringify({id}) });
    if (res.ok) setLeads((current) => current.filter((lead) => lead.id !== id));
    else setError('Não foi possível excluir o lead.');
  }

  const todayCount = useMemo(() => {
    const start = new Date(); start.setHours(0,0,0,0);
    return leads.filter((l) => new Date(l.created_at) >= start).length;
  }, [leads]);

  if (!logged) return <main className="admin-page"><div className="admin-login"><span className="kicker">ÁREA RESTRITA</span><h1>Painel de Leads</h1><p>Acesse para visualizar os contatos enviados pelo formulário.</p><form onSubmit={login}><label>Senha<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} autoFocus /></label>{error && <div className="modal-error">{error}</div>}<button className="modal-submit">ENTRAR</button></form></div></main>;

  return <main className="admin-page"><div className="admin-shell"><header className="admin-header"><div><span className="kicker">PAINEL ADMIN</span><h1>Leads de atendimento</h1></div><button className="admin-refresh" onClick={load} disabled={loading}><RefreshCw size={17} className={loading?'spin':''}/> Atualizar</button></header><section className="admin-stats"><article><Users/><div><strong>{leads.length}</strong><span>Total de leads</span></div></article><article><Users/><div><strong>{todayCount}</strong><span>Leads hoje</span></div></article></section>{error && <div className="modal-error">{error}</div>}<div className="admin-table-wrap"><table><thead><tr><th>Nome</th><th>Telefone</th><th>E-mail</th><th>Data</th><th></th></tr></thead><tbody>{leads.map((lead)=><tr key={lead.id}><td>{lead.name}</td><td><a href={`https://wa.me/${lead.phone.replace(/\D/g,'')}`} target="_blank">{lead.phone}</a></td><td>{lead.email}</td><td>{new Date(lead.created_at).toLocaleString('pt-BR')}</td><td><button className="delete-btn" onClick={()=>remove(lead.id)} title="Excluir"><Trash2 size={17}/></button></td></tr>)}</tbody></table>{leads.length===0 && <div className="admin-empty">Nenhum lead registrado ainda.</div>}</div></div></main>;
}
