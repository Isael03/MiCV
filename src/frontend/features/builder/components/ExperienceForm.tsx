import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Button } from '../../../components/ui/button'
import { Textarea } from '../../../components/ui/textarea'
import { Card, CardContent } from '../../../components/ui/card'
import { Plus, Trash2 } from 'lucide-react'
import type { UseFormReturn, UseFieldArrayReturn } from 'react-hook-form'
import { createEmptyExperience } from '../../../shared/types/cv'

interface ExperienceFormProps {
  form: UseFormReturn<any>
  fieldArray: UseFieldArrayReturn<any, "experiences", "id">
  onRemove: (id: string) => void
}

export function ExperienceForm({ form, fieldArray, onRemove }: ExperienceFormProps) {
  const { fields, append, remove } = fieldArray

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-foreground">Experiencia laboral</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              const newExp = createEmptyExperience()
              append(newExp)
            }}
          >
            <Plus className="w-4 h-4 mr-1" />
            Añadir
          </Button>
        </div>
        {fields.length === 0 ? (
          <p className="text-muted-foreground text-sm">No hay experiencia agregada. Haz clic en "Añadir" para comenzar.</p>
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Empresa</Label>
                    <Input
                      {...form.register(`experiences.${index}.company`)}
                      placeholder="Nombre de la empresa"
                    />
                    {((form.formState.errors.experiences as any)?.[index])?.company && (
                      <p className="text-sm text-destructive">{((form.formState.errors.experiences as any)?.[index])?.company?.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label>Cargo</Label>
                    <Input
                      {...form.register(`experiences.${index}.position`)}
                      placeholder="Tu puesto"
                    />
                    {((form.formState.errors.experiences as any)?.[index])?.position && (
                      <p className="text-sm text-destructive">{((form.formState.errors.experiences as any)?.[index])?.position?.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Fecha inicio</Label>
                    <Input
                      {...form.register(`experiences.${index}.startDate`)}
                      placeholder="Enero 2020"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Fecha fin</Label>
                    <Input
                      {...form.register(`experiences.${index}.endDate`)}
                      placeholder="Actual"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Descripción</Label>
                  <Textarea
                    {...form.register(`experiences.${index}.description`)}
                    placeholder="Describe tus responsabilidades y logros..."
                    className="min-h-[80px]"
                  />
                </div>
                <div className="flex justify-end gap-2">
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
                    <Trash2 className="w-4 h-4 mr-1" />
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
