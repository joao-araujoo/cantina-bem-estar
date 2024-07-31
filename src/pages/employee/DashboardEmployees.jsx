import { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import useAuthCheck from '../../hooks/useAuthCheck';

export default function DashboardFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '', telefone: '', permissao: '', fotoPerfil: null });
  const [editMode, setEditMode] = useState(false);
  const [currentFuncionarioId, setCurrentFuncionarioId] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null); // Estado para controlar o menu de ações

  const telefoneRef = useRef(null);

  useAuthCheck({ isEmployeeOnly: true, isAdminOnly: true });

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  useEffect(() => {
    // Aplicar a máscara ao campo de telefone quando o modal estiver aberto
    if (showModal && telefoneRef.current) {
      $(telefoneRef.current).mask('(00) 00000-0000'); // Exemplo de máscara para telefone
    }
  }, [showModal]);

  const fetchFuncionarios = async () => {
    try {
      const response = await fetch('http://localhost:3000/funcionarios');
      const data = await response.json();
      if (data.status) {
        setFuncionarios(data.data);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ nome: '', email: '', senha: '', telefone: '', permissao: '', fotoPerfil: null });
    setEditMode(false);
    setCurrentFuncionarioId(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!formData.nome || !formData.email || (!editMode && !formData.senha) || !formData.telefone || !formData.permissao) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Log para verificar os dados que estão sendo enviados
    console.log('Dados do funcionário:', formData);

    try {
      const response = await fetch(editMode ? `http://localhost:3000/funcionarios/${currentFuncionarioId}` : 'http://localhost:3000/funcionarios', {
        method: editMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify(formData), // Converte o objeto formData em JSON
      });
      const data = await response.json();
      if (data.status) {
        fetchFuncionarios();
        handleCloseModal();
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error);
    }
  };




  const handleEdit = (funcionario) => {
    setFormData({
      nome: funcionario.nome,
      email: funcionario.email,
      senha: '',
      telefone: funcionario.telefone,
      permissao: funcionario.permissao,
      fotoPerfil: null,
    });
    setEditMode(true);
    setCurrentFuncionarioId(funcionario.id_funcionario);
    handleShowModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/funcionarios/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.status) {
        fetchFuncionarios();
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Erro ao excluir funcionário:', error);
    }
  };

  const toggleMenu = (id) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  return (
    <div className="container mt-5">
      <div style={{ backgroundColor: '#F5F5F9', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '1rem', borderRadius: '5px' }}>
        <h1>Funcionários</h1>
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-danger" onClick={handleShowModal}>
            Adicionar Novo Funcionário
          </button>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Permissão</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((funcionario) => (
              <tr key={funcionario.id_funcionario}>
                <td>{funcionario.id_funcionario}</td>
                <td>{funcionario.nome}</td>
                <td>{funcionario.email}</td>
                <td>{funcionario.telefone}</td>
                <td>{funcionario.permissao}</td>
                <td>
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" onClick={() => toggleMenu(funcionario.id_funcionario)}>
                      ...
                    </button>
                    <div className={`dropdown-menu ${activeMenuId === funcionario.id_funcionario ? 'show' : ''}`}>
                      <button className="dropdown-item" onClick={() => handleEdit(funcionario)}>
                        Editar
                      </button>
                      <button className="dropdown-item" onClick={() => handleDelete(funcionario.id_funcionario)}>
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
              <h5 className="modal-title">{editMode ? 'Editar Funcionário' : 'Cadastrar Novo Funcionário'}</h5>
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
                  <label>Email</label>
                  <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                </div>
                <div className="form-group">
                  <label>Senha</label>
                  <input type="password" className="form-control" name="senha" value={formData.senha} onChange={handleChange} placeholder="Senha" required={!editMode} />
                </div>
                <div className="form-group">
                  <label>Telefone</label>
                  <input type="text" className="form-control" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Telefone" required ref={telefoneRef} />
                </div>
                <div className="form-group">
                  <label>Permissão</label>
                  <select
                    className="form-control"
                    name="permissao"
                    value={formData.permissao}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Selecione uma permissão</option>
                    <option value="1">Administrador</option>
                    <option value="2">Funcionário</option>
                  </select>
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
    </div>
  );
}
