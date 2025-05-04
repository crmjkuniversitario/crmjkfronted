import React, { useState } from 'react';
import axios from 'axios';

const CadastroCliente = () => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file' && (e.target as HTMLInputElement).files) {
      setFiles((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).files![0],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();

    // Adiciona dados textuais
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Adiciona arquivos
    Object.entries(files).forEach(([key, file]) => {
      data.append('arquivos', file); // Envia todos para o mesmo campo
    });

    try {
      const nomeCliente = formData.nome || 'cliente';
      await axios.post(`http://localhost:3000/upload/${nomeCliente}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Cadastro e upload realizados com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar dados.');
    }
  };

  interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
  }

  const Input = ({ label, name, ...props }: InputProps) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input name={name} onChange={handleChange} className="input-style" {...props} />
    </div>
  );

  interface SelectProps {
    label: string;
    name: string;
    options: string[];
  }

  const Select = ({ label, name, options }: SelectProps) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select name={name} onChange={handleChange} className="input-style">
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-md mt-4"
    >
      <h1 className="text-2xl font-bold text-center mb-6">Cadastro de Cliente</h1>

      <div className="space-y-4">
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
        <Select label="Ocupação" name="ocupacao" options={['Universitário(a)', 'Trabalhador(a)']} />
        <Input label="Celular" name="celular" type="text" />
        <Input label="E-mail" name="email" type="email" />
        <Select label="Rua" name="rua" options={['Rua Euclides da Cunha', 'Osvaldo Cruz']} />
        <Select label="N° do imóvel" name="numero" options={['421', '411', '35']} />
        <Select
          label="Complemento"
          name="complemento"
          options={[
            'Quarto 1',
            'Quarto 2',
            'Quarto 3',
            'JK 1',
            'JK 2',
            'JK 3',
            'JK 4',
            'Apartamento térreo',
            'Apartamento 1',
            'Apartamento 3',
            'Apartamento 4',
            'Apartamento 5',
            'Kitnet',
          ]}
        />
        <Input label="Bairro" name="bairro" placeholder="Jardim Universitário" type="text" />
        <Input label="CEP" name="cep" placeholder="94500-300" type="text" />
        <Input label="Cidade" name="cidade" placeholder="Viamão" type="text" />
        <Input label="Estado" name="estado" placeholder="RS" type="text" />
        <Select label="Tempo de moradia (meses)" name="tempoMoradia" options={['6', '12']} />
        <Input label="Data de entrada" name="entrada" type="date" />
        <Input label="Data de saída" name="saida" type="date" />
        <Input label="Dia de pagamento" name="diaPagamento" type="number" min={1} max={10} />
        <Select
          label="Valor do aluguel"
          name="valor"
          options={['Selecione', 'R$ 750,00', 'R$ 950,00', 'R$ 1.000,00']}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl mt-6 font-semibold"
        >
          Cadastrar
        </button>

        <button
          type="button"
          className="w-full mt-2 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-xl"
          onClick={() =>
            window.prompt('Clique em "Instalar" no navegador para adicionar o app à tela inicial.')
          }
        >
          Instalar App
        </button>
      </div>
    </form>
  );
};

export default CadastroCliente;
