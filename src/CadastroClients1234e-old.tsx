// src/CadastroCliente.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CadastroCliente() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="max-w-4xl mx-auto p-6">
        <CardContent>
          <h1 className="text-2xl font-bold mb-6">Cadastro de Cliente</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" placeholder="João" />
            </div>

            <div>
              <Label htmlFor="sobrenome">Sobrenome</Label>
              <Input id="sobrenome" placeholder="Silva" />
            </div>

            <div>
              <Label htmlFor="nascimento">Data de nascimento</Label>
              <Input type="date" id="nascimento" />
            </div>

            <div>
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" />
            </div>

            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" />
            </div>

            <div>
              <Label htmlFor="telefone">Celular</Label>
              <Input id="telefone" type="tel" />
            </div>

            <div className="col-span-1 md:col-span-2">
              <Label htmlFor="ocupacao">Ocupação</Label>
              <Select>
                <SelectTrigger id="ocupacao">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="universitario">Universitário(a)</SelectItem>
                  <SelectItem value="profissional">Profissional</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-1 md:col-span-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea id="observacoes" placeholder="Algo a mais que devemos saber?" />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button type="submit">Cadastrar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
