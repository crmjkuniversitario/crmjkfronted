import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CadastroCliente.css';

const CadastroCliente = () => {
  const [formData, setFormData] = useState({
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
    valor: ""
  });

  const [files, setFiles] = useState<any>({});
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
      setFiles((prev: any) => ({ ...prev, [name]: fileInput.files?.[0] }));
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
      if (file) data.append('arquivos', file);
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

  const Input = ({ label, name, ...props }: { label: string; name: string; [key: string]: any }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        {...props}
      />
    </div>
  );

  const Select = ({ label, name, options }: { label: string; name: string; options: string[] }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
      >
        <option value="">Selecione</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Cliente</h1>

        <Input label="Nome" name="nome" type="text" />
        <Input label="Sobrenome" name="sobrenome" type="text" />
        <Input label="Data de nascimento" name="nascimento" type="date" />
        <Input label="CPF" name="cpf" type="text" />
        <Input label="CPF (frente)" name="cpfFrente" type="file" accept="image/*" />
        <Input label="CPF (verso)" name="cpfVerso" type="file" accept="image/*" />
        <Input label="RG" name="rg" type="text" />
        <Input label="RG (frente)" name="rgFrente" type="file" accept="image/*" />
        <Input label="RG (verso)" name="rgVerso" type="file" accept="image/*" />
        <Input label="Passaporte (Estrangeiro)" name="passaporte" type="text" />
        <Input label="Passaporte (foto)" name="passaporteFoto" type="file" accept="image/*" />
        <Input label="Nacionalidade" name="nacionalidade" type="text" />
        <Select label="Ocupação" name="ocupacao" options={["Universitário(a)", "Trabalhador(a)"]} />
        <Input label="Celular" name="celular" type="text" />
        <Input label="E-mail" name="email" type="email" />
        <Select label="Rua" name="rua" options={["Rua Euclides da Cunha", "Osvaldo Cruz"]} />
        <Select label="N° do imóvel" name="numero" options={["421", "411", "35"]} />
        <Select label="Complemento" name="complemento" options={[
          "Quarto 1", "Quarto 2", "Quarto 3", "JK 1", "JK 2", "JK 3", "JK 4",
          "Apartamento térreo", "Apartamento 1", "Apartamento 3", "Apartamento 4",
          "Apartamento 5", "Kitnet",
        ]} />
        <Input label="Bairro" name="bairro" placeholder="Jardim Universitário" type="text" />
        <Input label="CEP" name="cep" placeholder="94500-300" type="text" />
        <Input label="Cidade" name="cidade" placeholder="Viamão" type="text" />
        <Input label="Estado" name="estado" placeholder="RS" type="text" />
        <Select label="Tempo de moradia (meses)" name="tempoMoradia" options={["6", "12"]} />
        <Input label="Data de entrada" name="entrada" type="date" />
        <Input label="Data de saída" name="saida" type="date" />
        <Input label="Dia de pagamento" name="diaPagamento" type="number" min={1} max={10} />
        <Select label="Valor do aluguel" name="valor" options={["R$ 750,00", "R$ 950,00", "R$ 1.000,00"]} />

        <div className="flex flex-col gap-2 mt-6">
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Cadastrar
          </button>
          <button
            type="button"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
            onClick={handleInstallClick}
          >
            Instalar App
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroCliente;
