import { Label } from '../../../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card'
import { Input } from '../../../components/ui/input'
import type { UseFormReturn } from 'react-hook-form'
import { Banknote } from 'lucide-react'

interface SalaryFormProps {
  form: UseFormReturn<{ amount?: string; isNegotiable: boolean }, any>
}

export function SalaryForm({ form }: SalaryFormProps) {
  return (
    <Card className="border-none shadow-none px-5">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center gap-2 mb-1">
          <Banknote className="w-5 h-5 text-primary" />
          <CardTitle className="text-xl">Pretensión de Renta</CardTitle>
        </div>
        <CardDescription>
          Indica tu expectativa salarial para este puesto. Esta información es opcional.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Monto estimado</Label>
            <Input
              id="amount"
              {...form.register('amount')}
              placeholder="Ej: $1.500.000 Líquido"
              className="w-full"
            />
          </div>
          
          <div className="flex items-center space-x-3 p-4 rounded-lg border bg-muted/20">
            <input
              type="checkbox"
              id="isNegotiable"
              {...form.register('isNegotiable')}
              className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
            />
            <div className="grid gap-1.5 leading-none">
              <Label 
                htmlFor="isNegotiable" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Monto conversable / negociable
              </Label>
              <p className="text-xs text-muted-foreground">
                Indica que estás abierto a discutir el salario según beneficios u otros factores.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
