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
      .catch(() => setErro('Erro ao carregar detalhes do livro.'));
  }, [id]);

  if (erro) return <p style={{ color: 'red' }}>{erro}</p>;
  if (!livro) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Detalhes do Livro</h1>

      <p><strong>Título:</strong> {livro.titulo}</p>
      <p><strong>Autor:</strong> {livro.autor}</p>
      <p><strong>Gênero:</strong> {livro.genero}</p>
      <p><strong>Ano de Publicação:</strong> {livro.ano_publicacao}</p>
      <p><strong>ISBN:</strong> {livro.isbn}</p>
      <p><strong>Quantidade disponível:</strong> {livro.quantidade}</p>

      <br />
      <button onClick={() => navigate(`/editar/${livro.id}`)}>Editar</button>
      <button onClick={() => navigate('/')}>Voltar</button>
    </div>
  );
}

export default DetalheLivro;