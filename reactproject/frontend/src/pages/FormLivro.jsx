import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function FormLivro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdicao = !!id;

  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    genero: '',
    ano_publicacao: '',
    isbn: '',
    quantidade: ''
  });
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

    if (!form.titulo || !form.autor) {
      setErro('Título e autor são obrigatórios.');
      return;
    }

    const requisicao = isEdicao
      ? api.put(`/livros/${id}`, form)
      : api.post('/livros', form);

    requisicao
      .then(() => {
        setSucesso(isEdicao ? 'Livro atualizado!' : 'Livro cadastrado!');
        setTimeout(() => navigate('/'), 1500);
      })
      .catch(() => setErro('Erro ao salvar livro.'));
  }

  return (
    <div>
      <h1>{isEdicao ? 'Editar Livro' : 'Novo Livro'}</h1>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Título *</label><br />
          <input name="titulo" value={form.titulo} onChange={handleChange} />
        </div>
        <div>
          <label>Autor *</label><br />
          <input name="autor" value={form.autor} onChange={handleChange} />
        </div>
        <div>
          <label>Gênero</label><br />
          <input name="genero" value={form.genero} onChange={handleChange} />
        </div>
        <div>
          <label>Ano de Publicação</label><br />
          <input name="ano_publicacao" type="number" value={form.ano_publicacao} onChange={handleChange} />
        </div>
        <div>
          <label>ISBN</label><br />
          <input name="isbn" value={form.isbn} onChange={handleChange} />
        </div>
        <div>
          <label>Quantidade</label><br />
          <input name="quantidade" type="number" value={form.quantidade} onChange={handleChange} />
        </div>

        <br />
        <button type="submit">{isEdicao ? 'Atualizar' : 'Cadastrar'}</button>
        <button type="button" onClick={() => navigate('/')}>Cancelar</button>
      </form>
    </div>
  );
}

export default FormLivro;