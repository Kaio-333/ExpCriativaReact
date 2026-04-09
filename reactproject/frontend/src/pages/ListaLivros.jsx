import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function ListaLivros() {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => { carregarLivros(); }, []);

  function carregarLivros() {
    api.get('/livros')
      .then(res => setLivros(res.data))
      .catch(() => setErro('Erro ao carregar livros.'));
  }

  function excluir(id) {
    if (window.confirm('Deseja excluir este livro?')) {
      api.delete(`/livros/${id}`)
        .then(() => carregarLivros())
        .catch(() => setErro('Erro ao excluir.'));
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.bgBlur1} />
      <div style={styles.bgBlur2} />

      <header style={styles.header}>
        <div>
          <h1 style={styles.logo}>📚 Biblioteca</h1>
          <p style={styles.subtitle}>Sistema de Gerenciamento de Acervo</p>
        </div>
        <p style={styles.autor}>Desenvolvido por: Kaio Teles</p>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Acervo</h2>
            <button style={styles.btnPrimary} onClick={() => navigate('/novoLivro')}>+ Novo Livro</button>
          </div>

          {erro && <p style={styles.erro}>{erro}</p>}

          <table style={styles.table}>
            <thead>
              <tr>
                {['Título', 'Autor', 'Gênero', 'Ano', 'Ações'].map(h => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {livros.map((livro, i) => (
                <tr key={livro.id} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                  <td style={styles.td}>{livro.titulo}</td>
                  <td style={{...styles.td, color: '#aaa'}}>{livro.autor}</td>
                  <td style={{...styles.td, color: '#aaa'}}>{livro.genero}</td>
                  <td style={{...styles.td, color: '#aaa'}}>{livro.ano_publicacao}</td>
                  <td style={styles.td}>
                    <button style={styles.btnVer} onClick={() => navigate(`/livro/${livro.id}`)}>Ver</button>
                    <button style={styles.btnEditar} onClick={() => navigate(`/editar/${livro.id}`)}>Editar</button>
                    <button style={styles.btnExcluir} onClick={() => excluir(livro.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {livros.length === 0 && !erro && (
            <p style={styles.empty}>Nenhum livro cadastrado ainda.</p>
          )}
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
  subtitle: { margin: '4px 0 0', fontSize: 12, color: '#666' },
  autor: { fontSize: 12, color: '#555', margin: 0 },
  main: { maxWidth: 960, margin: '40px auto', padding: '0 24px', position: 'relative', zIndex: 1 },
  card: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 28, backdropFilter: 'blur(20px)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  cardTitle: { margin: 0, fontSize: 16, fontWeight: 600, color: '#fff' },
  btnPrimary: { background: '#fff', color: '#000', border: 'none', padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '10px 14px', fontSize: 11, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: 1, borderBottom: '1px solid rgba(255,255,255,0.07)' },
  td: { padding: '12px 14px', fontSize: 14, color: '#ddd', borderBottom: '1px solid rgba(255,255,255,0.04)' },
  trEven: { background: 'transparent' },
  trOdd: { background: 'rgba(255,255,255,0.02)' },
  btnVer: { background: 'rgba(99,179,237,0.15)', color: '#63b3ed', border: '1px solid rgba(99,179,237,0.2)', padding: '4px 10px', borderRadius: 6, fontSize: 12, cursor: 'pointer', marginRight: 6 },
  btnEditar: { background: 'rgba(236,201,75,0.15)', color: '#ecc94b', border: '1px solid rgba(236,201,75,0.2)', padding: '4px 10px', borderRadius: 6, fontSize: 12, cursor: 'pointer', marginRight: 6 },
  btnExcluir: { background: 'rgba(252,129,129,0.15)', color: '#fc8181', border: '1px solid rgba(252,129,129,0.2)', padding: '4px 10px', borderRadius: 6, fontSize: 12, cursor: 'pointer' },
  erro: { color: '#fc8181', fontSize: 13, marginBottom: 16 },
  empty: { textAlign: 'center', color: '#555', padding: '40px 0', fontSize: 14 }
};

export default ListaLivros;