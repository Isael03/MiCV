import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Plus, Trash2 } from 'lucide-react'
import { Controller } from 'react-hook-form'
import type { UseFormReturn, UseFieldArrayReturn } from 'react-hook-form'
import { createEmptySkill } from '../../../shared/types/cv'

interface SkillsFormProps {
  form: UseFormReturn<any>
  fieldArray: UseFieldArrayReturn<any, "skills", "id">
  onRemove: (id: string) => void
}

export function SkillsForm({ form, fieldArray, onRemove }: SkillsFormProps) {
  const { fields, append, remove } = fieldArray

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-foreground">Habilidades</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              const newSkill = createEmptySkill()
              append(newSkill)
            }}
          >
            <Plus className="w-4 h-4 mr-1" />
            Añadir
          </Button>
        </div>
        {fields.length === 0 ? (
          <p className="text-muted-foreground text-sm">No hay habilidades agregadas. Haz clic en "Añadir" para comenzar.</p>
        ) : (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-3">
                <div className="flex-1 grid gap-2">
                  <Label className="sr-only">Habilidad</Label>
                  <Input
                    {...form.register(`skills.${index}.name`)}
                    placeholder="Habilidad"
                  />
                  {((form.formState.errors.skills as any)?.[index])?.name && (
                    <p className="text-sm text-destructive">{((form.formState.errors.skills as any)?.[index])?.name?.message}</p>
                  )}
                </div>
                <div className="w-40">
                  <Controller
                    name={`skills.${index}.level`}
                    control={form.control}
                    render={({ field: { onChange, value } }) => (
                      <Select value={value || 'intermediate'} onValueChange={onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Básico</SelectItem>
                          <SelectItem value="intermediate">Intermedio</SelectItem>
                          <SelectItem value="advanced">Avanzado</SelectItem>
                          <SelectItem value="native">Nativo</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive hover:text-destructive shrink-0"
                  onClick={() => {
                    remove(index)
                    onRemove(field.id)
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
