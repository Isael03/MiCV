import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Card, CardContent } from '../../../components/ui/card'
import { Upload } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'

interface PersonalInfoFormProps {
  form: UseFormReturn<{
    fullName: string
    email: string
    phone?: string
    photo?: string
    linkedin?: string
    github?: string
    portfolio?: string
    professionalTitle?: string
  }, any>
  photo?: string
  fileInputRef: React.RefObject<HTMLInputElement>
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function PersonalInfoForm({ form, photo, fileInputRef, onPhotoUpload }: PersonalInfoFormProps) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Información Personal</h3>
        </div>
        <div className="flex items-center gap-6 mb-6">
          <div 
            className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-muted-foreground"
            onClick={() => fileInputRef.current?.click()}
          >
            {photo ? (
              <img src={photo} alt="Foto" className="w-full h-full object-cover" />
            ) : (
              <Upload className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onPhotoUpload}
            className="hidden"
          />
          <div>
            <Label className="text-sm text-muted-foreground">Foto de perfil</Label>
            <p className="text-xs text-muted-foreground mt-1">Haz clic para subir una imagen</p>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Nombre completo</Label>
            <Input
              id="fullName"
              {...form.register('fullName')}
              placeholder="Juan Pérez"
            />
            {form.formState.errors.fullName && (
              <p className="text-sm text-destructive">{form.formState.errors.fullName.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...form.register('email')}
              placeholder="juan@email.com"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              type="tel"
              {...form.register('phone')}
              placeholder="+34 612 345 678"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="professionalTitle">Título profesional</Label>
            <Input
              id="professionalTitle"
              {...form.register('professionalTitle')}
              placeholder="Ingeniero de Software"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              type="url"
              {...form.register('linkedin')}
              placeholder="https://linkedin.com/in/juanperez"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              type="url"
              {...form.register('github')}
              placeholder="https://github.com/juanperez"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="portfolio">Portfolio / Web</Label>
            <Input
              id="portfolio"
              type="url"
              {...form.register('portfolio')}
              placeholder="https://juanperez.dev"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
