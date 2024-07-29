import React, { useState, useEffect } from 'react';

export default function DashboardProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nome: '', calorias: '', categoria: '', descricao: '', valor_produto: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentProdutoId, setCurrentProdutoId] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [mostrarCampoNovaCategoria, setMostrarCampoNovaCategoria] = useState(false);
  const [imagemModal, setImagemModal] = useState(null);
  const [showImagemModal, setShowImagemModal] = useState(false);
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await fetch('http://localhost:3000/produtos');
      const data = await response.json();
      if (data.status) {
        setProdutos(data.data);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ nome: '', calorias: '', categoria: '', descricao: '', valor_produto: '' });
    setNovaCategoria('');
    setMostrarCampoNovaCategoria(false);
    setEditMode(false);
    setCurrentProdutoId(null);
    setImagem(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'caminho_imagem') {
      setImagem(files ? files[0] : null);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      if (name === 'categoria' && value === 'Outra') {
        setMostrarCampoNovaCategoria(true);
      } else if (name === 'categoria') {
        setMostrarCampoNovaCategoria(false);
        setNovaCategoria('');
      }
    }
  };

  const handleNovaCategoriaChange = (e) => {
    setNovaCategoria(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoriaFinal = mostrarCampoNovaCategoria ? novaCategoria : formData.categoria;

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!formData.nome || !formData.calorias || !categoriaFinal || !formData.valor_produto) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      // Primeiro, envie os dados do produto
      const produtoResponse = await fetch(editMode ? `http://localhost:3000/produtos/${currentProdutoId}` : 'http://localhost:3000/produtos', {
        method: editMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, categoria: categoriaFinal }),
      });
      const produtoData = await produtoResponse.json();
      
      if (produtoData.status) {
        // Se o produto for salvo com sucesso, envie a imagem, se houver
        if (imagem) {
          const formDataImagem = new FormData();
          formDataImagem.append('imagem', imagem);
          
          await fetch(`http://localhost:3000/produtos/${produtoData.data.id_produto}/imagem`, {
            method: 'POST',
            body: formDataImagem,
          });
        }
        fetchProdutos();
        handleCloseModal();
      } else {
        alert(produtoData.msg);
      }
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleEdit = (produto) => {
    setFormData({
      nome: produto.nome,
      calorias: produto.calorias,
      categoria: produto.categoria,
      descricao: produto.descricao,
      valor_produto: produto.valor_produto,
    });
    setEditMode(true);
    setCurrentProdutoId(produto.id_produto);
    handleShowModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.status) {
        fetchProdutos();
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const toggleMenu = (id) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleImageClick = (imagemUrl) => {
    setImagemModal(imagemUrl);
    setShowImagemModal(true);
  };

  const handleCloseImagemModal = () => {
    setShowImagemModal(false);
    setImagemModal(null);
  };

  return (
    <div className="container mt-5">
      <div style={{ backgroundColor: '#F5F5F9', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '1rem', borderRadius: '5px' }}>
        <h1>Produtos</h1>
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-danger" onClick={handleShowModal}>
            Adicionar Novo Produto
          </button>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Calorias</th>
              <th>Categoria</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Imagem</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id_produto}>
                <td>{produto.id_produto}</td>
                <td>{produto.nome}</td>
                <td>{produto.calorias}</td>
                <td>{produto.categoria}</td>
                <td>{produto.descricao}</td>
                <td>{produto.valor_produto}</td>
                <td>
                  {produto.caminho_imagem && (
                    <img
                      src={`http://localhost:3000/uploads/${produto.caminho_imagem}`}
                      alt={produto.nome}
                      style={{ width: '50px', cursor: 'pointer' }}
                      onClick={() => handleImageClick(`http://localhost:3000/uploads/${produto.caminho_imagem}`)}
                    />
                  )}
                </td>
                <td>
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" onClick={() => toggleMenu(produto.id_produto)}>
                      ...
                    </button>
                    <div className={`dropdown-menu ${activeMenuId === produto.id_produto ? 'show' : ''}`}>
                      <button className="dropdown-item" onClick={() => handleEdit(produto)}>
                        Editar
                      </button>
                      <button className="dropdown-item" onClick={() => handleDelete(produto.id_produto)}>
                        Excluir
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`modal ${showModal ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{editMode ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h5>
              <button
                type="button"
                className="close"
                style={{ marginLeft: 'auto' }}
                aria-label="Close"
                onClick={handleCloseModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nome</label>
                  <input type="text" className="form-control" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" required />
                </div>
                <div className="form-group">
                  <label>Calorias</label>
                  <input type="number" className="form-control" name="calorias" value={formData.calorias} onChange={handleChange} placeholder="Calorias" required />
                </div>
                <div className="form-group">
                  <label>Categoria</label>
                  <select className="form-control" name="categoria" value={formData.categoria} onChange={handleChange} required>
                    <option value="" disabled>Selecione a Categoria</option>
                    <option value="Marmita">Marmita</option>
                    <option value="Bebida">Bebida</option>
                    <option value="Sobremesas">Sobremesas</option>
                    <option value="Outra">Outra</option>
                  </select>
                </div>
                {mostrarCampoNovaCategoria && (
                  <div className="form-group">
                    <label>Nova Categoria</label>
                    <input type="text" className="form-control" value={novaCategoria} onChange={handleNovaCategoriaChange} placeholder="Nova Categoria" required />
                  </div>
                )}
                <div className="form-group">
                  <label>Descrição</label>
                  <textarea className="form-control" name="descricao" value={formData.descricao} onChange={handleChange} placeholder="Descrição" />
                </div>
                <div className="form-group">
                  <label>Valor</label>
                  <input type="text" className="form-control" name="valor_produto" value={formData.valor_produto} onChange={handleChange} placeholder="Valor" required />
                </div>
                <div className="form-group">
                  <label>Imagem</label>
                  <input type="file" className="form-control" name="caminho_imagem" onChange={handleChange} />
                </div>
                <button
                  type="submit"
                  className="btn btn-danger"
                  style={{ marginTop: '20px' }}
                >
                  Salvar
                </button>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>

      {showImagemModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Imagem do Produto</h5>
                <button
                  type="button"
                  className="close"
                  style={{ marginLeft: 'auto' }}
                  aria-label="Close"
                  onClick={handleCloseImagemModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img src={imagemModal} alt="Produto" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
