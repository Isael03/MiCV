import { useCVStore } from "../../../store/cvStore";
import { AVAILABLE_FONTS } from "../../../shared/types/cv";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Palette } from "lucide-react";

export function DesignForm() {
  const { currentProjectId, projects, updateDesign } = useCVStore();

  const currentProject = projects.find((p) => p.id === currentProjectId);
  const design = currentProject?.data.design;

  if (!design) return null;

  return (
    <Card className="border-none shadow-none px-5">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center gap-2 mb-1">
          <Palette className="w-5 h-5 text-primary" />
          <CardTitle className="text-xl">Diseño del Currículum</CardTitle>
        </div>
        <CardDescription>
          Personaliza la apariencia visual de tu currículum.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <div className="space-y-3">
          <Label htmlFor="font-family">Fuente del Texto</Label>
          <Select
            value={design.fontFamily}
            onValueChange={(value) => updateDesign({ fontFamily: value })}
          >
            <SelectTrigger id="font-family" className="w-full">
              <SelectValue placeholder="Selecciona una fuente" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABLE_FONTS.map((font) => (
                <SelectItem
                  key={font.name}
                  value={font.value}
                  style={{ fontFamily: font.value }}
                >
                  <span style={{ fontFamily: font.value }}>{font.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-2">
            La fuente seleccionada se aplicará a todo el documento del
            currículum.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
