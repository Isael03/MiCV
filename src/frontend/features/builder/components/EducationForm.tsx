import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { Plus, Trash2 } from 'lucide-react'
import type { UseFormReturn, UseFieldArrayReturn } from 'react-hook-form'
import { createEmptyEducation } from '../../../shared/types/cv'

interface EducationFormProps {
  form: UseFormReturn<any>
  fieldArray: UseFieldArrayReturn<any, "education", "id">
  onRemove: (id: string) => void
}

export function EducationForm({ form, fieldArray, onRemove }: EducationFormProps) {
  const { fields, append, remove } = fieldArray

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-foreground">Educación</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              const newEdu = createEmptyEducation()
              append(newEdu)
            }}
          >
            <Plus className="w-4 h-4 mr-1" />
            Añadir
          </Button>
        </div>
        {fields.length === 0 ? (
          <p className="text-muted-foreground text-sm">No hay educación agregada. Haz clic en "Añadir" para comenzar.</p>
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4">
                <div className="grid gap-2">
                  <Label>Centro educativo</Label>
                  <Input
                    {...form.register(`education.${index}.school`)}
                    placeholder="Nombre del centro"
                  />
                  {((form.formState.errors.education as any)?.[index])?.school && (
                    <p className="text-sm text-destructive">{((form.formState.errors.education as any)?.[index])?.school?.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label>Titulación</Label>
                  <Input
                    {...form.register(`education.${index}.degree`)}
                    placeholder="Título obtenido"
                  />
                  {((form.formState.errors.education as any)?.[index])?.degree && (
                    <p className="text-sm text-destructive">{((form.formState.errors.education as any)?.[index])?.degree?.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label>Año</Label>
                  <Input
                    {...form.register(`education.${index}.year`)}
                    placeholder="2020"
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
