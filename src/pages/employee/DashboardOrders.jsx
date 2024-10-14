import { useState, useEffect } from "react";
import useAuthCheck from "../../hooks/useAuthCheck";
import emailjs from "emailjs-com";

export default function DashboardPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useAuthCheck({ isEmployeeOnly: true });

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await fetch("http://localhost:3000/pedidos");
      const pedidosData = await response.json();

      if (pedidosData.status) {
        // Para cada pedido, buscar os dados do cliente
        const pedidosComCodigo = await Promise.all(
          pedidosData.data.map(async (pedido) => {
            const clienteResponse = await fetch(
              `http://localhost:3000/clientes/${pedido.id_cliente}`
            );
            const clienteData = await clienteResponse.json();

            if (clienteData.status) {
              // Adiciona os 4 últimos dígitos do telefone como código de verificação
              return {
                ...pedido,
                codigoVerificacao: clienteData.data.telefone.slice(-4),
              };
            } else {
              console.error(`Erro ao buscar cliente: ${clienteData.msg}`);
              return { ...pedido, codigoVerificacao: "N/A" }; // Se falhar, retorna "N/A"
            }
          })
        );

        setPedidos(pedidosComCodigo);
      } else {
        alert(pedidosData.msg);
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este pedido?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/pedidos/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.status) {
        fetchPedidos();
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Erro ao excluir pedido:", error);
    }
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("pedidoId", id);
    e.currentTarget.style.cursor = "grabbing"; // Muda o cursor ao arrastar
  };

  const handleDrop = async (e, status) => {
    const pedidoId = e.dataTransfer.getData("pedidoId");
    const updatedPedidos = pedidos.map((pedido) =>
      pedido.id_pedido.toString() === pedidoId ? { ...pedido, status } : pedido
    );

    setPedidos(updatedPedidos);

    // Atualiza o status do pedido no servidor
    try {
      await fetch(`http://localhost:3000/pedidos/${pedidoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      // Se o status for "Entregue", adicionar 1 ao qtd_pedidos do cliente
      if (status === 4) {
        const pedidoEntregue = updatedPedidos.find(
          (p) => p.id_pedido.toString() === pedidoId
        );

        if (pedidoEntregue) {
          const clienteResponse = await fetch(
            `http://localhost:3000/clientes/${pedidoEntregue.id_cliente}`
          );
          const clienteData = await clienteResponse.json();

          if (clienteData.status) {
            const qtdPedidosAtualizada = clienteData.data.qtd_pedidos + 1;

            // Atualiza o campo qtd_pedidos do cliente
            await fetch(
              `http://localhost:3000/clientes/${pedidoEntregue.id_cliente}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ qtd_pedidos: qtdPedidosAtualizada }),
              }
            );

            // Enviar e-mail ao cliente sobre a atualização do status
            await emailjs.send(
              "service_tih0e8j",
              "template_ybyav67",
              {
                to_name: clienteData.data.nome,
                to_email: clienteData.data.email,
                order_id: pedidoId,
                status: statusLabels[status - 1],
              },
              "UD22PjRWUnZWXhcSS"
            );
          }
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error);
    }
  };

  const statusLabels = ["Pendente", "Em andamento", "Finalizado", "Entregue"];
  const statusColors = ["#007bff", "#ffcc00", "#28a745", "#6c757d"];

  // Ordena os pedidos pelo horário de retirada
  const sortedPedidos = pedidos.sort(
    (a, b) => new Date(a.horario_retirada) - new Date(b.horario_retirada)
  );

  return (
    <div className="container mt-5">
      <div
        style={{
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        {statusLabels.map((statusLabel, index) => {
          const filteredPedidos = sortedPedidos.filter(
            (pedido) => pedido.status === index + 1
          );
          const count = filteredPedidos.length;

          return (
            <div
              key={index}
              onDrop={(e) => handleDrop(e, index + 1)}
              onDragOver={(e) => e.preventDefault()}
              style={{
                backgroundColor: statusColors[index],
                color: "#fff",
                border: "1px solid #ddd",
                borderRadius: "5px",
                padding: "1rem",
                margin: "0 1rem",
                minHeight: "200px", // Aumenta a altura mínima
                flex: 1, // Faz os containers ocuparem o espaço disponível
                marginRight: index < statusLabels.length - 1 ? "1rem" : "0", // Margem entre containers
              }}
            >
              <h4 style={{ color: "#fff" }}>
                {statusLabel} <span>({count})</span>
              </h4>
              {filteredPedidos.map((pedido) => (
                <div
                  key={pedido.id_pedido}
                  draggable
                  onDragStart={(e) => handleDragStart(e, pedido.id_pedido)}
                  style={{
                    userSelect: "none",
                    padding: "0.5rem",
                    margin: "0.5rem 0",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    color: "#000", // Texto dos pedidos em preto
                    cursor: "grab", // Muda o cursor para 'grab' ao passar sobre o item
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.cursor = "grab")} // Muda o cursor ao passar o mouse
                  onMouseOut={(e) => (e.currentTarget.style.cursor = "default")} // Restaura o cursor ao sair
                >
                  <div>
                    <strong>ID:</strong> #{pedido.id_pedido}
                  </div>
                  <div>
                    <strong>Cliente:</strong> #{pedido.id_cliente}
                  </div>
                  <div>
                    <strong>Descrição:</strong> {pedido.descricao}
                  </div>
                  {pedido.obs ? (
                    <div>
                      <strong>Observação:</strong> {pedido.obs}
                    </div>
                  ) : null}

                  <div>
                    <strong>Horário de Retirada:</strong> 🕑{" "}
                    <span>
                      {new Date(pedido.horario_retirada).toLocaleString(
                        "pt-BR",
                        {
                          month: "2-digit", // Mês por extenso
                          day: "2-digit", // Dia com dois dígitos
                          hour: "2-digit", // Hora com dois dígitos
                          minute: "2-digit", // Minutos com dois dígitos
                          second: "2-digit", // Segundos com dois dígitos
                          timeZone: "UTC", // Força o uso do fuso horário UTC
                        }
                      )}
                    </span>
                  </div>

                  <div>
                    <strong>Código de Verificação:</strong>{" "}
                    <span style={{ color: "green", fontWeight: "700" }}>
                      {pedido.codigoVerificacao}
                    </span>
                  </div>

                  <div>
                    <strong>Valor total:</strong>{" "}
                    <span>
                      R$ {pedido.valor_total.toFixed(2).replace(".", ",")}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(pedido.id_pedido)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "5px",
                      marginTop: "0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
