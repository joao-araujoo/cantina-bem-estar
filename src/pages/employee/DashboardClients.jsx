// DashboardClients.js
import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';

export default function DashboardClients() {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '', telefone: '', fotoPerfil: null });
  const [editMode, setEditMode] = useState(false);
  const [currentClientId, setCurrentClientId] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [imageModal, setImageModal] = useState({ show: false, src: '' });

  const telefoneRef = useRef(null);

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (showModal && telefoneRef.current) {
      $(telefoneRef.current).mask('(00) 00000-0000');
    }
  }, [showModal]);

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:3000/clientes');
      const data = await response.json();
      if (data.status) {
        setClients(data.data);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ nome: '', email: '', senha: '', telefone: '', fotoPerfil: null });
    setEditMode(false);
    setCurrentClientId(null);
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
    const formDataObj = new FormData();
    for (let key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      const response = await fetch(editMode ? `http://localhost:3000/clientes/${currentClientId}` : 'http://localhost:3000/clientes', {
        method: editMode ? 'PUT' : 'POST',
        body: formDataObj,
      });
      const data = await response.json();
      if (data.status) {
        fetchClients();
        handleCloseModal();
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const handleEdit = (client) => {
    setFormData({
      nome: client.nome,
      email: client.email,
      senha: '',
      telefone: client.telefone,
      fotoPerfil: null,
    });
    setEditMode(true);
    setCurrentClientId(client.id_cliente);
    handleShowModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/clientes/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.status) {
        fetchClients();
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  const toggleMenu = (id) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleImageClick = (src) => {
    setImageModal({ show: true, src });
  };

  const handleImageModalClose = () => {
    setImageModal({ show: false, src: '' });
  };

  return (
    <div className="container mt-5">
      <div style={{ backgroundColor: '#F5F5F9', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '1rem', borderRadius: '5px' }}>
        <h1>Clientes</h1>
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-danger" onClick={handleShowModal}>
            Adicionar Novo Cliente
          </button>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Foto de Perfil</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id_cliente}>
                <td>{client.id_cliente}</td>
                <td>{client.nome}</td>
                <td>{client.email}</td>
                <td>{client.telefone}</td>
                <td>
                  {client.caminho_imagem ? (
                    <img
                      src={`http://localhost:3000/${client.caminho_imagem}`}
                      alt={client.nome}
                      style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                      onClick={() => handleImageClick(`http://localhost:3000/${client.caminho_imagem}`)}
                    />
                  ) : (
                    'Sem Imagem'
                  )}
                </td>
                <td>
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" onClick={() => toggleMenu(client.id_cliente)}>
                      ...
                    </button>
                    <div className={`dropdown-menu ${activeMenuId === client.id_cliente ? 'show' : ''}`}>
                      <button className="dropdown-item" onClick={() => handleEdit(client)}>
                        Editar
                      </button>
                      <button className="dropdown-item" onClick={() => handleDelete(client.id_cliente)}>
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
              <h5 className="modal-title">{editMode ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}</h5>
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
                  <label>Foto de Perfil</label>
                  <input type="file" className="form-control" name="fotoPerfil" onChange={handleChange} />
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

      <div className={`modal ${imageModal.show ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Imagem do Cliente</h5>
              <button
                type="button"
                className="close"
                style={{ marginLeft: 'auto' }}
                aria-label="Close"
                onClick={handleImageModalClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <img src={imageModal.src} alt="Imagem do Cliente" className="img-fluid" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleImageModalClose}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
