// src/pages/CadastroCliente.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function CadastroCliente() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-xl border rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">Cadastro de Cliente</h2>

          {/* Dados Pessoais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome completo</Label>
              <Input id="nome" placeholder="João da Silva" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="joao@email.com" />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" placeholder="(00) 91234-5678" />
            </div>
            <div>
              <Label htmlFor="nacionalidade">Nacionalidade</Label>
              <Input id="nacionalidade" placeholder="Brasileira" />
            </div>
          </div>

          {/* Documentos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" placeholder="000.000.000-00" />
            </div>
            <div>
              <Label htmlFor="rg">RG</Label>
              <Input id="rg" placeholder="00.000.000-0" />
            </div>
            <div>
              <Label htmlFor="passaporte">Passaporte</Label>
              <Input id="passaporte" placeholder="Opcional" />
            </div>
          </div>

          {/* Endereço */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="endereco">Endereço</Label>
              <Textarea id="endereco" placeholder="Rua Exemplo, 123, Bairro, Cidade - UF" />
            </div>
            <div>
              <Label htmlFor="cep">CEP</Label>
              <Input id="cep" placeholder="00000-000" />
            </div>
          </div>

          {/* Dados do aluguel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="inicio">Data de Início</Label>
              <Input id="inicio" type="date" />
            </div>
            <div>
              <Label htmlFor="fim">Data de Término</Label>
              <Input id="fim" type="date" />
            </div>
            <div>
              <Label htmlFor="valor">Valor Mensal</Label>
              <Input id="valor" placeholder="R$ 1.200,00" />
            </div>
          </div>

          {/* Ocupação */}
          <div>
            <Label htmlFor="ocupacao">Ocupação</Label>
            <Select>
              <SelectTrigger id="ocupacao">
                <SelectValue placeholder="Selecione a ocupação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="estudante">Estudante</SelectItem>
                <SelectItem value="trabalhador">Trabalhador</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Botão */}
          <div className="pt-4">
            <Button className="w-full" type="submit">Cadastrar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
