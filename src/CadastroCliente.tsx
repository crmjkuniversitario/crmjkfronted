import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CadastroCliente.css';

const CadastroCliente = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    nome: "",
    sobrenome: "",
    nascimento: "",
    cpf: "",
    rg: "",
    passaporte: "",
    nacionalidade: "",
    ocupacao: "",
    celular: "",
    email: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cep: "",
    cidade: "",
    estado: "",
    tempoMoradia: "",
    entrada: "",
    saida: "",
    diaPagamento: "",
    valor: "",
  });

  const [files, setFiles] = useState<{ [key: string]: File | undefined }>({});
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("Usuário aceitou instalar o app");
        } else {
          console.log("Usuário recusou instalar o app");
        }
        setDeferredPrompt(null);
      });
    } else {
      alert("Instalação não disponível no momento.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file' && 'files' in e.target) {
      const fileInput = e.target as HTMLInputElement;
      setFiles((prev) => ({ ...prev, [name]: fileInput.files?.[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        data.append("arquivos", file);
      }
    });

    try {
      const nomeCliente = formData.nome || 'cliente';
      await axios.post(`http://localhost:3000/upload/${nomeCliente}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Cadastro e upload realizados com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar dados.');
    }
  };

  const TextInput = ({ label, name, type = "text", ...props }: { label: string; name: string; type?: string; [key: string]: any }) => (
    <div className="formulario">
      <label>{label}</label>
      <input
        name={name}
        type={type}
        value={formData[name] || ""}
        onChange={handleChange}
        className="input"
        {...props}
      />
    </div>
  );

  const FileInput = ({ label, name }: { label: string; name: string }) => (
    <div className="formulario">
      <label>{label}</label>
      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={handleChange}
        className="input"
      />
    </div>
  );

  const Select = ({ label, name, options }: { label: string; name: string; options: string[] }) => (
    <div className="formulario">
      <label>{label}</label>
      <select
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        className="input"
      >
        <option value="">Selecione</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="container">
      <h1 className="titulo">Cadastro de Cliente</h1>
      <form onSubmit={handleSubmit}>
        <TextInput label="Nome" name="nome" />
        <TextInput label="Sobrenome" name="sobrenome" />
        <TextInput label="Data de nascimento" name="nascimento" type="date" />
        <TextInput label="CPF" name="cpf" />
        <FileInput label="CPF (frente)" name="cpfFrente" />
        <FileInput label="CPF (verso)" name="cpfVerso" />
        <TextInput label="RG" name="rg" />
        <FileInput label="RG (frente)" name="rgFrente" />
        <FileInput label="RG (verso)" name="rgVerso" />
        <TextInput label="Passaporte (estrangeiro)" name="passaporte" />
        <FileInput label="Foto do passaporte" name="passaporteFoto" />
        <TextInput label="Nacionalidade" name="nacionalidade" />
        <Select label="Ocupação" name="ocupacao" options={["Universitário(a)", "Trabalhador(a)"]} />
        <TextInput label="Celular" name="celular" />
        <TextInput label="Email" name="email" type="email" />
        <Select label="Rua" name="rua" options={["Rua Euclides da Cunha", "Osvaldo Cruz"]} />
        <Select label="Nº do imóvel" name="numero" options={["421", "411", "35"]} />
        <Select label="Complemento" name="complemento" options={["Quarto 1", "JK 1", "Apartamento 1"]} />
        <TextInput label="Bairro" name="bairro" />
        <TextInput label="CEP" name="cep" />
        <TextInput label="Cidade" name="cidade" />
        <TextInput label="Estado" name="estado" />
        <Select label="Tempo de moradia (meses)" name="tempoMoradia" options={["6", "12"]} />
        <TextInput label="Data de entrada" name="entrada" type="date" />
        <TextInput label="Data de saída" name="saida" type="date" />
        <TextInput label="Dia de pagamento" name="diaPagamento" type="number" min={1} max={10} />
        <Select label="Valor do aluguel" name="valor" options={["R$ 750,00", "R$ 950,00", "R$ 1.000,00"]} />

        <div className="botoes">
          <button type="submit" className="botao">Cadastrar</button>
          <button type="button" className="botao" onClick={handleInstallClick}>Instalar App</button>
        </div>
      </form>
    </div>
  );
};

export default CadastroCliente;
