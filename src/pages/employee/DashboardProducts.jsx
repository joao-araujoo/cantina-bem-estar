import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAuthCheck from "../../hooks/useAuthCheck";

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

  useAuthCheck({ isEmployeeOnly: true });

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
    } else {
      setImagemFile(null);
      setImagemPreview(null);
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
      const url = editMode
        ? `http://localhost:3000/produtos/${currentProdutoId}`
        : "http://localhost:3000/produtos";

      const response = await fetch(url, {
        method: editMode ? "PUT" : "POST",
        body: formDataSubmit,
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Tenta obter a mensagem de erro
        throw new Error(`Erro HTTP ${response.status}: ${errorMessage}`);
      }

      // Se a resposta for bem-sucedida, assume-se que é JSON
      const data = await response.json();

      if (data.status) {
        toast.success(
          editMode
            ? "Produto atualizado com sucesso!"
            : "Produto adicionado com sucesso!"
        );
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
      produto.caminho_imagem
        ? `http://localhost:3000/${produto.caminho_imagem}`
        : null
    ); // Atualiza a pré-visualização
    setImagemFile(null); // Limpa o arquivo de imagem para garantir que uma nova seleção seja tratada
    setEditMode(true);
    setCurrentProdutoId(produto.id_produto); // Define a ID do produto atual
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
                      Ações
                    </button>
                    <ul
                      className={`dropdown-menu ${
                        activeMenuId === produto.id_produto ? "show" : ""
                      }`}
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleEdit(produto)}
                        >
                          Editar
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() =>
                            window.confirm(
                              "Tem certeza de que deseja excluir este produto?"
                            ) && handleDelete(produto.id_produto)
                          }
                        >
                          Excluir
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editMode ? "Editar Produto" : "Adicionar Produto"}
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
                      type="number"
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
                      className="form-select"
                      id="categoria"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="Marmitas">Marmitas</option>
                      <option value="Bebidas">Bebidas</option>
                      <option value="Sobremesas">Sobremesas</option>
                      <option value="Outra">Outra</option>
                    </select>
                    {mostrarCampoNovaCategoria && (
                      <div className="mt-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nova categoria"
                          value={novaCategoria}
                          onChange={handleNovaCategoriaChange}
                        />
                      </div>
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
                      type="number"
                      className="form-control"
                      id="valor_produto"
                      name="valor_produto"
                      value={formData.valor_produto}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fotoProduto" className="form-label">
                      Imagem
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="fotoProduto"
                      onChange={handleFotoProdutoChange}
                    />
                    {imagemPreview && (
                      <div className="mt-2">
                        <img
                          src={imagemPreview}
                          alt="Pré-visualização"
                          style={{ width: "100px", height: "auto" }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      {editMode ? "Atualizar Produto" : "Adicionar Produto"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showImagemModal && (
        <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
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
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
