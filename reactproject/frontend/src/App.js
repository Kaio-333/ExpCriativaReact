import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListaLivros from './pages/ListaLivros';
import FormLivro from './pages/FormLivro';
import DetalheLivro from './pages/DetalheLivro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaLivros />} />
        <Route path="/novoLivro" element={<FormLivro />} />
        <Route path="/editar/:id" element={<FormLivro />} />
        <Route path="/livro/:id" element={<DetalheLivro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;