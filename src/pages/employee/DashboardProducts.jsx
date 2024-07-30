import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function DashboardProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    calorias: "",
    categoria: "",
    descricao: "",
    valor_produto: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentProdutoId, setCurrentProdutoId] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [novaCategoria, setNovaCategoria] = useState("");
  const [mostrarCampoNovaCategoria, setMostrarCampoNovaCategoria] =
    useState(false);
  const [imagemPreview, setImagemPreview] = useState(null);
  const [imagemFile, setImagemFile] = useState(null); // Estado para o arquivo da imagem
  const [showImagemModal, setShowImagemModal] = useState(false);
  const [imagemModal, setImagemModal] = useState(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await fetch("http://localhost:3000/produtos");
      const data = await response.json();
      if (data.status) {
        setProdutos(data.data);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      nome: "",
      calorias: "",
      categoria: "",
      descricao: "",
      valor_produto: "",
    });
    setImagemPreview(null);
    setImagemFile(null); // Limpar o estado do arquivo da imagem
    setNovaCategoria("");
    setMostrarCampoNovaCategoria(false);
    setEditMode(false);
    setCurrentProdutoId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "categoria" && value === "Outra") {
      setMostrarCampoNovaCategoria(true);
    } else if (name === "categoria") {
      setMostrarCampoNovaCategoria(false);
      setNovaCategoria("");
    }
  };

  const handleFotoProdutoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagemFile(file);
      setImagemPreview(url);
    }
  };

  const handleNovaCategoriaChange = (e) => {
    setNovaCategoria(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoriaFinal = mostrarCampoNovaCategoria
      ? novaCategoria
      : formData.categoria;
    
    // Verificar se todos os campos obrigatórios estão preenchidos
    if (
      !formData.nome ||
      !formData.calorias ||
      !categoriaFinal ||
      !formData.valor_produto
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    
    const produtoData = {
      nome: formData.nome,
      calorias: formData.calorias,
      categoria: categoriaFinal,
      descricao: formData.descricao,
      valor_produto: formData.valor_produto,
    };
  
    // Cria o FormData para enviar os dados e a imagem
    const formDataSubmit = new FormData();
    formDataSubmit.append("nome", produtoData.nome);
    formDataSubmit.append("calorias", produtoData.calorias);
    formDataSubmit.append("categoria", produtoData.categoria);
    formDataSubmit.append("descricao", produtoData.descricao);
    formDataSubmit.append("valor_produto", produtoData.valor_produto);
    if (imagemFile) {
      formDataSubmit.append("fotoProduto", imagemFile);
    }
    
    try {
      const response = await fetch(
        editMode
          ? `http://localhost:3000/produtos/${currentProdutoId}`
          : "http://localhost:3000/produtos",
        {
          method: editMode ? "PUT" : "POST",
          body: formDataSubmit,
        }
      );
  
      if (!response.ok) {
        const errorMessage = await response.text(); // Tenta obter a mensagem de erro
        throw new Error(`Erro HTTP ${response.status}: ${errorMessage}`);
      }
      
      // Se a resposta for bem-sucedida, assume-se que é JSON
      const data = await response.json();
      
      if (data.status) {
        toast.success(editMode ? "Produto atualizado com sucesso!" : "Produto adicionado com sucesso!");
        setTimeout(() => {
          fetchProdutos(); // Atualiza a lista de produtos
          handleCloseModal();
        }, 2000);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      toast.error("Erro ao salvar produto. Tente novamente mais tarde.");
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
    setImagemPreview(
      `http://localhost:3000/${produto.caminho_imagem}`
    ); // Atualiza a pré-visualização
    setEditMode(true);
    setCurrentProdutoId(produto.id_produto);
    handleShowModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.status) {
        fetchProdutos();
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
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
      <div
        style={{
          backgroundColor: "#F5F5F9",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "1rem",
          borderRadius: "5px",
        }}
      >
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
                      src={`http://localhost:3000/${produto.caminho_imagem}`}
                      alt={produto.nome}
                      style={{ width: "50px", cursor: "pointer" }}
                      onClick={() =>
                        handleImageClick(
                          `http://localhost:3000/${produto.caminho_imagem}`
                        )
                      }
                    />
                  )}
                </td>
                <td>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      onClick={() => toggleMenu(produto.id_produto)}
                    >
                      ...
                    </button>
                    <div
                      className={`dropdown-menu ${
                        activeMenuId === produto.id_produto ? "show" : ""
                      }`}
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => handleEdit(produto)}
                      >
                        Editar
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => handleDelete(produto.id_produto)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal para adicionar/editar produto */}
        {showModal && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    {editMode ? "Editar Produto" : "Adicionar Novo Produto"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="nome" className="form-label">
                        Nome
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="calorias" className="form-label">
                        Calorias
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="calorias"
                        name="calorias"
                        value={formData.calorias}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="categoria" className="form-label">
                        Categoria
                      </label>
                      <select
                        id="categoria"
                        name="categoria"
                        className="form-control"
                        value={formData.categoria}
                        onChange={handleChange}
                      >
                        <option value="">Selecione</option>
                        <option value="Marmita">Marmita</option>
                        <option value="Sobremesa">Sobremesa</option>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Outra">Outra</option>
                      </select>
                      {mostrarCampoNovaCategoria && (
                        <input
                          type="text"
                          className="form-control mt-2"
                          placeholder="Nova Categoria"
                          value={novaCategoria}
                          onChange={handleNovaCategoriaChange}
                        />
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="descricao" className="form-label">
                        Descrição
                      </label>
                      <textarea
                        className="form-control"
                        id="descricao"
                        name="descricao"
                        rows="3"
                        value={formData.descricao}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="valor_produto" className="form-label">
                        Valor
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="valor_produto"
                        name="valor_produto"
                        value={formData.valor_produto}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="imagem" className="form-label">
                        Imagem
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="imagem"
                        name="imagem"
                        accept="image/*"
                        onChange={handleFotoProdutoChange}
                      />
                      {imagemPreview && (
                        <img
                          src={imagemPreview}
                          alt="Pré-visualização"
                          style={{ width: "100px", marginTop: "10px" }}
                        />
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                      {editMode ? "Salvar Alterações" : "Adicionar Produto"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal para exibir imagem */}
        {showImagemModal && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Imagem do Produto</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseImagemModal}
                  ></button>
                </div>
                <div className="modal-body">
                  {imagemModal && (
                    <img
                      src={imagemModal}
                      alt="Imagem do Produto"
                      style={{ width: "100%" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
