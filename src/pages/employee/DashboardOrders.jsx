import { useState, useEffect } from 'react';
import $ from 'jquery';

export default function DashboardPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [status, setStatus] = useState(1); // Default status to "Pendente"
  const [activeMenuId, setActiveMenuId] = useState(null);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await fetch('http://localhost:3000/pedidos');
      const data = await response.json();
      if (data.status) {
        setPedidos(data.data);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  const handleShowModal = (pedido) => {
    setSelectedPedido(pedido);
    setStatus(pedido.status); // Set the status for the selected pedido
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPedido(null);
  };

  const handleStatusChange = (e) => {
    setStatus(parseInt(e.target.value, 10));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPedido) {
      alert('Selecione um pedido para atualizar.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/pedidos/${selectedPedido.id_pedido}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.status) {
        fetchPedidos();
        handleCloseModal();
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/pedidos/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.status) {
        fetchPedidos();
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
    }
  };

  const toggleMenu = (id) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  return (
    <div className="container mt-5">
      <div style={{ backgroundColor: '#F5F5F9', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '1rem', borderRadius: '5px' }}>
        <h1>Pedidos</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id_pedido}>
                <td>{pedido.id_pedido}</td>
                <td>{pedido.id_cliente}</td>
                <td>{pedido.descricao}</td>
                <td>{['Pendente', 'Em andamento', 'Finalizado', 'Entregue'][pedido.status - 1]}</td>
                <td>
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" onClick={() => toggleMenu(pedido.id_pedido)}>
                      ...
                    </button>
                    <div className={`dropdown-menu ${activeMenuId === pedido.id_pedido ? 'show' : ''}`}>
                      <button className="dropdown-item" onClick={() => handleShowModal(pedido)}>
                        Alterar Status
                      </button>
                      <button className="dropdown-item" onClick={() => handleDelete(pedido.id_pedido)}>
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
              <h5 className="modal-title">Alterar Status do Pedido</h5>
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
                  <label>Status</label>
                  <select className="form-control" value={status} onChange={handleStatusChange} required>
                    <option value={1}>Pendente</option>
                    <option value={2}>Em andamento</option>
                    <option value={3}>Finalizado</option>
                    <option value={4}>Entregue</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>
                  Salvar Alterações
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
