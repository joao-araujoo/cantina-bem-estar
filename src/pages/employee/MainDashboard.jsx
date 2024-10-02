import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList, FaClock, FaCheckCircle, FaTruck, FaUsers } from 'react-icons/fa';
import useAuthCheck from '../../hooks/useAuthCheck';

export default function MainDashboard() {
  const [counts, setCounts] = useState({
    pendente: 0,
    atendimento: 0,
    finalizado: 0,
    entregue: 0,
    clientes: 0,
    funcionarios: 0
  });

  const navigate = useNavigate();

  useAuthCheck({ isEmployeeOnly: true });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch pedido counts
        const pedidosResponse = await fetch('http://localhost:3000/pedidos');
        const pedidosData = await pedidosResponse.json();
        if (pedidosData.status) {
          const pedidos = pedidosData.data;
          const statusCounts = pedidos.reduce((acc, pedido) => {
            switch (pedido.status) {
              case 1:
                acc.pendente++;
                break;
              case 2:
                acc.atendimento++;
                break;
              case 3:
                acc.finalizado++;
                break;
              case 4:
                acc.entregue++;
                break;
              default:
                break;
            }
            return acc;
          }, { pendente: 0, atendimento: 0, finalizado: 0, entregue: 0 });

          setCounts(prevCounts => ({ ...prevCounts, ...statusCounts }));
        } else {
          console.error(pedidosData.msg);
        }

        // Fetch client count
        const clientesResponse = await fetch('http://localhost:3000/clientes');
        const clientesData = await clientesResponse.json();
        if (clientesData.status) {
          setCounts(prevCounts => ({ ...prevCounts, clientes: clientesData.data.length }));
        } else {
          console.error(clientesData.msg);
        }

        // Fetch employee count
        const funcionariosResponse = await fetch('http://localhost:3000/funcionarios');
        const funcionariosData = await funcionariosResponse.json();
        if (funcionariosData.status) {
          setCounts(prevCounts => ({ ...prevCounts, funcionarios: funcionariosData.data.length }));
        } else {
          console.error(funcionariosData.msg);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchCounts();
  }, []);

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-12">
          <h3>Pedidos</h3>
        </div>
        <div className="col">
          <div
            className="card text-white bg-primary"
            style={{ borderRadius: '15px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', cursor: 'pointer' }}
            onClick={() => handleCardClick('/dashboard/orders')}
          >
            <FaClipboardList size={80} style={{ marginBottom: '10px' }} />
            <h5 className="card-title" style={{ marginBottom: '10px' }}>Pendente</h5>
            <p className="card-text" style={{ fontSize: '50px', fontWeight: 'bold' }}>{counts.pendente}</p>
          </div>
        </div>
        <div className="col">
          <div
            className="card text-white bg-warning"
            style={{ borderRadius: '15px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', cursor: 'pointer' }}
            onClick={() => handleCardClick('/dashboard/orders')}
          >
            <FaClock size={80} style={{ marginBottom: '10px' }} />
            <h5 className="card-title" style={{ marginBottom: '10px' }}>Em Atendimento</h5>
            <p className="card-text" style={{ fontSize: '50px', fontWeight: 'bold' }}>{counts.atendimento}</p>
          </div>
        </div>
        <div className="col">
          <div
            className="card text-white bg-success"
            style={{ borderRadius: '15px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', cursor: 'pointer' }}
            onClick={() => handleCardClick('/dashboard/orders')}
          >
            <FaCheckCircle size={80} style={{ marginBottom: '10px' }} />
            <h5 className="card-title" style={{ marginBottom: '10px' }}>Finalizado</h5>
            <p className="card-text" style={{ fontSize: '50px', fontWeight: 'bold' }}>{counts.finalizado}</p>
          </div>
        </div>
        <div className="col">
          <div
            className="card text-white bg-info"
            style={{ borderRadius: '15px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', cursor: 'pointer' }}
            onClick={() => handleCardClick('/dashboard/orders')}
          >
            <FaTruck size={80} style={{ marginBottom: '10px' }} />
            <h5 className="card-title" style={{ marginBottom: '10px' }}>Entregue</h5>
            <p className="card-text" style={{ fontSize: '50px', fontWeight: 'bold' }}>{counts.entregue}</p>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <h3>Usuários</h3>
        </div>
        <div className="col">
          <div
            className="card text-white bg-dark"
            style={{ borderRadius: '15px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', cursor: 'pointer' }}
            onClick={() => handleCardClick('/dashboard/clients')}
          >
            <FaUsers size={80} style={{ marginBottom: '10px' }} />
            <h5 className="card-title" style={{ marginBottom: '10px' }}>Clientes</h5>
            <p className="card-text" style={{ fontSize: '50px', fontWeight: 'bold' }}>{counts.clientes}</p>
          </div>
        </div>
        <div className="col">
          <div
            className="card text-white bg-secondary"
            style={{ borderRadius: '15px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', cursor: 'pointer' }}
            onClick={() => handleCardClick('/dashboard/employees')}
          >
            <FaUsers size={80} style={{ marginBottom: '10px' }} />
            <h5 className="card-title" style={{ marginBottom: '10px' }}>Funcionários</h5>
            <p className="card-text" style={{ fontSize: '50px', fontWeight: 'bold' }}>{counts.funcionarios}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
