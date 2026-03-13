import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { Plus, Trash2 } from 'lucide-react'
import type { UseFormReturn, UseFieldArrayReturn } from 'react-hook-form'
import { createEmptyCertification } from '../../../shared/types/cv'

interface CertificatesFormProps {
  form: UseFormReturn<any>
  fieldArray: UseFieldArrayReturn<any, "certifications", "id">
  onRemove: (id: string) => void
}

export function CertificatesForm({ form, fieldArray, onRemove }: CertificatesFormProps) {
  const { fields, append, remove } = fieldArray

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-foreground">Certificados</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newCert = createEmptyCertification()
              append(newCert)
            }}
          >
            <Plus className="w-4 h-4 mr-1" />
            Añadir
          </Button>
        </div>
        {fields.length === 0 ? (
          <p className="text-muted-foreground text-sm">No hay certificados agregados. Haz clic en "Añadir" para comenzar.</p>
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="grid gap-3 p-4 border rounded-md bg-muted/20">
                <div className="grid gap-2">
                  <Label>Nombre del certificado</Label>
                  <Input
                    {...form.register(`certifications.${index}.name`)}
                    placeholder="Ej: AWS Certified Solutions Architect"
                  />
                  {((form.formState.errors.certifications as any)?.[index])?.name && (
                    <p className="text-sm text-destructive">{((form.formState.errors.certifications as any)?.[index])?.name?.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label>Organización emisora</Label>
                  <Input
                    {...form.register(`certifications.${index}.issuer`)}
                    placeholder="Ej: Amazon Web Services"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-2">
                    <Label>Fecha de emisión</Label>
                    <Input
                      {...form.register(`certifications.${index}.date`)}
                      type="month"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>URL (opcional)</Label>
                    <Input
                      {...form.register(`certifications.${index}.url`)}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      remove(index)
                      onRemove(field.id)
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
