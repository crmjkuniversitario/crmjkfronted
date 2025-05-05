import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CadastroCliente = () => {
  const [step, setStep] = useState(1);
  const next = () => setStep(prev => prev + 1);
  const back = () => setStep(prev => prev - 1);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 flex justify-center items-center">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold mb-4">Cadastro de Cliente</h1>

          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nome</Label>
                <Input placeholder="Digite o nome" />
              </div>
              <div>
                <Label>Sobrenome</Label>
                <Input placeholder="Digite o sobrenome" />
              </div>
              <div>
                <Label>Data de nascimento</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>CPF</Label>
                <Input placeholder="000.000.000-00" />
              </div>
              <div>
                <Label>RG</Label>
                <Input placeholder="Digite o RG" />
              </div>
              <div>
                <Label>Passaporte (se estrangeiro)</Label>
                <Input placeholder="Digite o passaporte" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Ocupação</Label>
                <Select>
                  <SelectItem value="Universitário">Universitário</SelectItem>
                  <SelectItem value="Trabalhador">Trabalhador</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </Select>
              </div>
              <div>
                <Label>Celular</Label>
                <Input placeholder="(00) 00000-0000" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="email@exemplo.com" />
              </div>
              <div>
                <Label>Nacionalidade</Label>
                <Input placeholder="Digite a nacionalidade" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Endereço</Label>
                <Textarea placeholder="Rua, número, bairro..." />
              </div>
              <div>
                <Label>CEP</Label>
                <Input placeholder="00000-000" />
              </div>
              <div>
                <Label>Cidade</Label>
                <Input placeholder="Digite a cidade" />
              </div>
              <div>
                <Label>Estado</Label>
                <Input placeholder="Ex: RS" />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Tempo de moradia (meses)</Label>
                <Input type="number" />
              </div>
              <div>
                <Label>Data de entrada</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Data de saída</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Valor do aluguel</Label>
                <Input placeholder="R$ 0,00" />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && <Button variant="outline" onClick={back}>Voltar</Button>}
            {step < 4 && <Button onClick={next}>Próximo</Button>}
            {step === 4 && <Button className="ml-auto">Cadastrar</Button>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CadastroCliente;
