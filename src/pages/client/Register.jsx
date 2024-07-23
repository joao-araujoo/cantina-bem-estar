import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AiOutlineLoading } from "react-icons/ai";
import styles from "../Login/styles.module.css";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [fotoPerfilUrl, setFotoPerfilUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePhoneNumber = (number) => {
    return number.length >= 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (!nome || !email || !senha || !telefone) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!validatePhoneNumber(telefone)) {
      toast.error(
        "Número de telefone inválido. Certifique-se de incluir o código de área e ter pelo menos 10 dígitos."
      );
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("senha", senha);
    formData.append("telefone", telefone);
    if (fotoPerfil) {
      formData.append("fotoPerfil", fotoPerfil);
    }

    try {
      const response = await fetch("http://localhost:3000/clientes", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status) {
          toast.success("Registro bem-sucedido!");
          setTimeout(() => {
            window.location.href = "/login"; // Redireciona para a página de login após a mensagem de sucesso
          }, 2000);
        } else {
          toast.error(data.msg);
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "Erro ao fazer registro");
      }
    } catch (error) {
      console.error("Erro ao fazer registro:", error);
      toast.error("Erro ao fazer registro. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleFotoPerfilChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFotoPerfil(file);
      setFotoPerfilUrl(url);
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
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            placeholder="Dani Araujo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

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

          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="*************"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />

          <label htmlFor="phone">Telefone</label>
          <PhoneInput
            country={"br"}
            value={telefone}
            onChange={(phone) => setTelefone(phone)}
            inputProps={{
              name: "phone",
              required: true,
              autoFocus: true,
            }}
            containerClass="phone-input-container"
            inputClass="phone-input"
            isValid={(value) => {
              return validatePhoneNumber(value);
            }}
          />

          {fotoPerfilUrl && (
            <div>
              <img
                src={fotoPerfilUrl}
                alt="Preview"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}

          <label htmlFor="profilePicture">Foto de Perfil</label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleFotoPerfilChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? (
              <AiOutlineLoading className={styles.spinner} />
            ) : (
              "Criar Conta"
            )}
          </button>
        </form>
        <ToastContainer />
      </main>
      <footer>
        <p>
          Já possui uma conta? <a href="/login">Fazer Login</a>
        </p>
      </footer>
    </div>
  );
}
