import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function ListaLivros() {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    carregarLivros();
  }, []);

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
    <div>
      <h1>Biblioteca — Lista de Livros</h1>
      <p>Desenvolvido por: Kaio Teles</p>

      <button onClick={() => navigate('/novo')}>+ Novo Livro</button>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Gênero</th>
            <th>Ano</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map(livro => (
            <tr key={livro.id}>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.genero}</td>
              <td>{livro.ano_publicacao}</td>
              <td>
                <button onClick={() => navigate(`/livro/${livro.id}`)}>Ver</button>
                <button onClick={() => navigate(`/editar/${livro.id}`)}>Editar</button>
                <button onClick={() => excluir(livro.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaLivros;