import { useCVStore } from "../../../store/cvStore";
import {
  AVAILABLE_FONTS,
  CVSectionKey,
  DEFAULT_SECTION_ORDER,
} from "../../../shared/types/cv";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { ArrowDown, ArrowUp, Palette } from "lucide-react";

export function DesignForm() {
  const {
    currentProjectId,
    projects,
    updateDesign,
    updateSectionOrder,
    updateHiddenSections,
  } = useCVStore();

  const currentProject = projects.find((p) => p.id === currentProjectId);
  const design = currentProject?.data.design;
  const rawSectionOrder =
    currentProject?.data.sectionOrder || DEFAULT_SECTION_ORDER;
  const normalizedSectionOrder = normalizeSectionOrder(rawSectionOrder);
  const rawHiddenSections = currentProject?.data.hiddenSections || [];
  const hiddenSections = normalizeHiddenSections(rawHiddenSections);

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
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Orden de secciones</Label>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={() => {
                updateSectionOrder([...DEFAULT_SECTION_ORDER]);
                updateHiddenSections([]);
              }}
            >
              Restablecer
            </Button>
          </div>
          <div className="space-y-2">
            {normalizedSectionOrder.map((sectionKey, index) => (
              <div
                key={sectionKey}
                className="flex items-center justify-between rounded-md border px-3 py-2 bg-muted/20"
              >
                <span className="text-sm font-medium">
                  {SECTION_LABELS[sectionKey]}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="xs"
                    onClick={() =>
                      toggleHiddenSection(
                        sectionKey,
                        hiddenSections,
                        updateHiddenSections,
                      )
                    }
                  >
                    {hiddenSections.includes(sectionKey) ? "Mostrar" : "Ocultar"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-xs"
                    disabled={index === 0}
                    onClick={() =>
                      moveSection(
                        normalizedSectionOrder,
                        index,
                        -1,
                        updateSectionOrder,
                      )
                    }
                  >
                    <ArrowUp className="w-3 h-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-xs"
                    disabled={index === normalizedSectionOrder.length - 1}
                    onClick={() =>
                      moveSection(
                        normalizedSectionOrder,
                        index,
                        1,
                        updateSectionOrder,
                      )
                    }
                  >
                    <ArrowDown className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Usa las flechas para reordenar y el botón para ocultar secciones.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

const SECTION_LABELS: Record<CVSectionKey, string> = {
  summary: "Resumen",
  experience: "Experiencia",
  education: "Educación",
  skills: "Habilidades",
  projects: "Proyectos",
  languages: "Idiomas",
  certifications: "Certificados",
};

function normalizeSectionOrder(order: CVSectionKey[]): CVSectionKey[] {
  const unique = order.filter(
    (key, index) => order.indexOf(key) === index,
  );
  const missing = DEFAULT_SECTION_ORDER.filter(
    (key) => !unique.includes(key),
  );
  return [...unique, ...missing];
}

function normalizeHiddenSections(hidden: CVSectionKey[]): CVSectionKey[] {
  const unique = hidden.filter(
    (key, index) => hidden.indexOf(key) === index,
  );
  return unique.filter((key) => DEFAULT_SECTION_ORDER.includes(key));
}

function moveSection(
  currentOrder: CVSectionKey[],
  index: number,
  direction: -1 | 1,
  onChange: (order: CVSectionKey[]) => void,
) {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= currentOrder.length) return;
  const next = [...currentOrder];
  const [moved] = next.splice(index, 1);
  next.splice(newIndex, 0, moved);
  onChange(next);
}

function toggleHiddenSection(
  sectionKey: CVSectionKey,
  hidden: CVSectionKey[],
  onChange: (hidden: CVSectionKey[]) => void,
) {
  if (hidden.includes(sectionKey)) {
    onChange(hidden.filter((key) => key !== sectionKey));
    return;
  }
  onChange([...hidden, sectionKey]);
}
