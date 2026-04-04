import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function DetalheLivro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livro, setLivro] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.get(`/livros/${id}`)
      .then(res => setLivro(res.data))
      .catch(() => setErro('Erro ao carregar detalhes.'));
  }, [id]);

  if (erro) return <div style={{...styles.page, display:'flex', alignItems:'center', justifyContent:'center'}}><p style={styles.erro}>{erro}</p></div>;
  if (!livro) return <div style={{...styles.page, display:'flex', alignItems:'center', justifyContent:'center'}}><p style={{color:'#555'}}>Carregando...</p></div>;

  const campos = [
    { label: 'Título', value: livro.titulo },
    { label: 'Autor', value: livro.autor },
    { label: 'Gênero', value: livro.genero },
    { label: 'Ano de Publicação', value: livro.ano_publicacao },
    { label: 'ISBN', value: livro.isbn },
    { label: 'Quantidade Disponível', value: livro.quantidade },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.bgBlur1} />
      <div style={styles.bgBlur2} />

      <header style={styles.header}>
        <h1 style={styles.logo}>📚 Biblioteca</h1>
        <p style={styles.autor}>Desenvolvido por: Kaio Teles</p>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Detalhes do Livro</h2>

          <div style={styles.grid}>
            {campos.map(c => (
              <div key={c.label} style={styles.field}>
                <span style={styles.label}>{c.label}</span>
                <span style={styles.value}>{c.value || '—'}</span>
              </div>
            ))}
          </div>

          <div style={styles.actions}>
            <button onClick={() => navigate('/')} style={styles.btnSecondary}>Voltar</button>
            <button onClick={() => navigate(`/editar/${livro.id}`)} style={styles.btnPrimary}>Editar</button>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#0f0f0f', fontFamily: 'Segoe UI, sans-serif', position: 'relative', overflow: 'hidden' },
  bgBlur1: { position: 'fixed', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)', top: -100, left: -100, pointerEvents: 'none' },
  bgBlur2: { position: 'fixed', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', bottom: -150, right: -150, pointerEvents: 'none' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 40px', borderBottom: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.03)' },
  logo: { margin: 0, fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' },
  autor: { fontSize: 12, color: '#555', margin: 0 },
  main: { maxWidth: 680, margin: '40px auto', padding: '0 24px', position: 'relative', zIndex: 1 },
  card: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32, backdropFilter: 'blur(20px)' },
  cardTitle: { margin: '0 0 28px', fontSize: 18, fontWeight: 600, color: '#fff' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 },
  field: { display: 'flex', flexDirection: 'column', gap: 4, padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' },
  label: { fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600 },
  value: { fontSize: 15, color: '#e0e0e0', marginTop: 2 },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 28 },
  btnPrimary: { background: '#fff', color: '#000', border: 'none', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  btnSecondary: { background: 'transparent', color: '#888', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 24px', borderRadius: 8, fontSize: 14, cursor: 'pointer' },
  erro: { color: '#fc8181', fontSize: 14 },
};

export default DetalheLivro;