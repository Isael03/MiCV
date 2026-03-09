import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Button } from '../../../components/ui/button'
import { Textarea } from '../../../components/ui/textarea'
import { Card, CardContent } from '../../../components/ui/card'
import { Plus, Trash2 } from 'lucide-react'
import type { UseFormReturn, UseFieldArrayReturn } from 'react-hook-form'
import { createEmptyProjectItem } from '../../../shared/types/cv'

interface ProjectsFormProps {
  form: UseFormReturn<any>
  fieldArray: UseFieldArrayReturn<any, "projects", "id">
  onRemove: (id: string) => void
}

export function ProjectsForm({ form, fieldArray, onRemove }: ProjectsFormProps) {
  const { fields, append, remove } = fieldArray

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-foreground">Proyectos</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              const newProj = createEmptyProjectItem()
              append(newProj)
            }}
          >
            <Plus className="w-4 h-4 mr-1" />
            Añadir
          </Button>
        </div>
        {fields.length === 0 ? (
          <p className="text-muted-foreground text-sm">No hay proyectos agregados. Haz clic en "Añadir" para comenzar.</p>
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4">
                <div className="grid gap-2">
                  <Label>Nombre del proyecto</Label>
                  <Input
                    {...form.register(`projects.${index}.name`)}
                    placeholder="Nombre del proyecto"
                  />
                    {((form.formState.errors.projects as any)?.[index])?.name && (
                      <p className="text-sm text-destructive">{((form.formState.errors.projects as any)?.[index])?.name?.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label>Descripción</Label>
                    <Textarea
                      {...form.register(`projects.${index}.description`)}
                      placeholder="Describe el proyecto..."
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Enlace (opcional)</Label>
                    <Input
                      {...form.register(`projects.${index}.link`)}
                      placeholder="https://..."
                    />
                    {((form.formState.errors.projects as any)?.[index])?.link && (
                      <p className="text-sm text-destructive">{((form.formState.errors.projects as any)?.[index])?.link?.message}</p>
                    )}
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
