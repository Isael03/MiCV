import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Card, CardContent } from '../../../components/ui/card'
import { Textarea } from '../../../components/ui/textarea'
import type { UseFormReturn } from 'react-hook-form'

interface SummaryFormProps {
  form: UseFormReturn<{ summary?: string }, any>
}

export function SummaryForm({ form }: SummaryFormProps) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Sobre mí</h3>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="summary">Resumen profesional</Label>
          <Textarea
            id="summary"
            {...form.register('summary')}
            placeholder="Breve descripción de tu perfil profesional, habilidades y objetivos..."
            className="min-h-[150px]"
          />
        </div>
      </CardContent>
    </Card>
  )
}
