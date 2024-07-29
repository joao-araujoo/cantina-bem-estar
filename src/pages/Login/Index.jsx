// src/pages/Login/Index.js
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery-mask-plugin';

import { AiOutlineLoading } from "react-icons/ai";
import styles from "./styles.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status) {
          // Usa a função de login do AuthContext
          login(data.data, data.token);

          toast.success("Login bem-sucedido!");
          setTimeout(() => {
            if (data.userType === "funcionario") {
              navigate("/dashboard");
            } else {
              navigate("/")
            }
          }, 1000);
        } else {
          toast.error(data.msg);
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Erro ao fazer login. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img
          width={100}
          src="/Logo Branca.png"
          alt="Logo - Cantina Bem Estar"
        />
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="*************"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? (
              <AiOutlineLoading className={styles.spinner} />
            ) : (
              "Entrar"
            )}
          </button>
        </form>
        <ToastContainer />
      </main>
      <footer>
        <p>
          Ainda não possui uma conta? <a href="/register">Registrar-se</a>
        </p>
      </footer>
    </div>
  );
}
