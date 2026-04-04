import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function FormLivro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdicao = !!id;

  const [form, setForm] = useState({ titulo: '', autor: '', genero: '', ano_publicacao: '', isbn: '', quantidade: '' });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  useEffect(() => {
    if (isEdicao) {
      api.get(`/livros/${id}`)
        .then(res => setForm(res.data))
        .catch(() => setErro('Erro ao carregar dados do livro.'));
    }
  }, [id, isEdicao]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    if (!form.titulo || !form.autor) { setErro('Título e autor são obrigatórios.'); return; }
    const req = isEdicao ? api.put(`/livros/${id}`, form) : api.post('/livros', form);
    req.then(() => { setSucesso(isEdicao ? 'Livro atualizado!' : 'Livro cadastrado!'); setTimeout(() => navigate('/'), 1500); })
       .catch(() => setErro('Erro ao salvar livro.'));
  }

  const campos = [
    { label: 'Título *', name: 'titulo', type: 'text' },
    { label: 'Autor *', name: 'autor', type: 'text' },
    { label: 'Gênero', name: 'genero', type: 'text' },
    { label: 'Ano de Publicação', name: 'ano_publicacao', type: 'number' },
    { label: 'ISBN', name: 'isbn', type: 'text' },
    { label: 'Quantidade', name: 'quantidade', type: 'number' },
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
          <h2 style={styles.cardTitle}>{isEdicao ? 'Editar Livro' : 'Novo Livro'}</h2>

          {erro && <p style={styles.erro}>{erro}</p>}
          {sucesso && <p style={styles.sucesso}>{sucesso}</p>}

          <form onSubmit={handleSubmit}>
            <div style={styles.grid}>
              {campos.map(c => (
                <div key={c.name} style={styles.field}>
                  <label style={styles.label}>{c.label}</label>
                  <input
                    name={c.name}
                    type={c.type}
                    value={form[c.name]}
                    onChange={handleChange}
                    style={styles.input}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>
              ))}
            </div>

            <div style={styles.actions}>
              <button type="button" onClick={() => navigate('/')} style={styles.btnSecondary}>Cancelar</button>
              <button type="submit" style={styles.btnPrimary}>{isEdicao ? 'Atualizar' : 'Cadastrar'}</button>
            </div>
          </form>
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
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 12, color: '#666', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none', transition: 'border 0.2s' },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 28 },
  btnPrimary: { background: '#fff', color: '#000', border: 'none', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  btnSecondary: { background: 'transparent', color: '#888', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 24px', borderRadius: 8, fontSize: 14, cursor: 'pointer' },
  erro: { color: '#fc8181', fontSize: 13, marginBottom: 16 },
  sucesso: { color: '#68d391', fontSize: 13, marginBottom: 16 },
};

export default FormLivro;