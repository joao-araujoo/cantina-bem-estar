import { useState, useEffect } from 'react';
import useAuthCheck from '../../hooks/useAuthCheck';

export default function DashboardPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useAuthCheck({ isEmployeeOnly: true });

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

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('pedidoId', id);
    e.currentTarget.style.cursor = 'grabbing'; // Muda o cursor ao arrastar
  };

  const handleDrop = async (e, status) => {
    const pedidoId = e.dataTransfer.getData('pedidoId');
    const updatedPedidos = pedidos.map(pedido => 
      pedido.id_pedido.toString() === pedidoId ? { ...pedido, status } : pedido
    );

    setPedidos(updatedPedidos);

    // Atualiza o status do pedido no servidor
    try {
      await fetch(`http://localhost:3000/pedidos/${pedidoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
    }
  };

  const statusLabels = ['Pendente', 'Em andamento', 'Finalizado', 'Entregue'];
  const statusColors = ['#007bff', '#ffcc00', '#28a745', '#6c757d'];

  return (
    <div className="container mt-5">
      <div style={{ display: 'flex', height: '100%', justifyContent: 'space-between' }}>
        {statusLabels.map((statusLabel, index) => (
          <div
            key={index}
            onDrop={(e) => handleDrop(e, index + 1)}
            onDragOver={(e) => e.preventDefault()}
            style={{
              backgroundColor: statusColors[index],
              color: '#fff',
              border: '1px solid #ddd',
              borderRadius: '5px',
              padding: '1rem',
              margin: '0 1rem',
              minHeight: '200px', // Aumenta a altura mínima
              flex: 1, // Faz os containers ocuparem o espaço disponível
              marginRight: index < statusLabels.length - 1 ? '1rem' : '0', // Margem entre containers
            }}
          >
            <h4 style={{ color: '#fff' }}>{statusLabel}</h4>
            {pedidos
              .filter(pedido => pedido.status === index + 1) // Filtra os pedidos pelo status
              .map((pedido) => (
                <div
                  key={pedido.id_pedido}
                  draggable
                  onDragStart={(e) => handleDragStart(e, pedido.id_pedido)}
                  style={{
                    userSelect: 'none',
                    padding: '0.5rem',
                    margin: '0.5rem 0',
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    color: '#000', // Texto dos pedidos em preto
                    cursor: 'grab', // Muda o cursor para 'grab' ao passar sobre o item
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.cursor = 'grab')} // Muda o cursor ao passar o mouse
                  onMouseOut={(e) => (e.currentTarget.style.cursor = 'default')} // Restaura o cursor ao sair
                >
                  <div>
                    <strong>ID:</strong> {pedido.id_pedido}
                  </div>
                  <div>
                    <strong>Cliente:</strong> {pedido.id_cliente}
                  </div>
                  <div>
                    <strong>Descrição:</strong> {pedido.descricao}
                  </div>
                  <div>
                    <strong>Status:</strong> {statusLabels[pedido.status - 1]}
                  </div>
                  <button 
                    onClick={() => handleDelete(pedido.id_pedido)} 
                    style={{
                      backgroundColor: 'red',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                    }}
                  >
                    Excluir
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
