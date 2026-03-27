import { useEffect, useState } from "react";
import { useCVStore } from "../../../store/cvStore";
import { Header } from "../../../shared/layouts/Header";
import { Footer } from "../../../shared/layouts/Footer";
import { ProjectList } from "../components/ProjectList";
import { NewProjectDialog } from "../components/NewProjectDialog";
import { DeleteConfirmDialog } from "../components/DeleteConfirmDialog";
import { CVProject, mapBackendProjectToCVProject } from "@/shared/types/cv";

function Home() {
  const { projects, createProject, deleteProject, setProjects } = useCVStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<CVProject | null>(null);

  const loadProjects = async () => {
    try {
      const result = await window.cv.findAll();
      console.log("Proyectos cargados:", result);

      if (!result.success) {
        setProjects([]);
        return;
      }

      const cvs: CVProject[] = result.data.map(mapBackendProjectToCVProject);
      setProjects(cvs);
    } catch (error) {
      console.error("Error al cargar proyectos:", error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateProject = async (name: string) => {
    createProject(name);
    await window.cv.createProject({ title: name });
    await loadProjects();
  };

  const handleDeleteClick = (project: CVProject) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    try {
      const result = await window.cv.delete(projectToDelete.id);
      if (result.success) {
        deleteProject(projectToDelete.id);
      } else {
        console.error("Error al eliminar proyecto:", result.error);
        alert("No se pudo eliminar el proyecto");
      }
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
      alert("Error al intentar eliminar el proyecto");
    } finally {
      setIsDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleDuplicateProject = async (id: string) => {
    try {
      const result = await window.cv.duplicateProject(id);
      if (result.success) {
        await loadProjects();
      } else {
        console.error("Error al duplicar proyecto:", result.error);
        alert("No se pudo duplicar el proyecto");
      }
    } catch (error) {
      console.error("Error al duplicar proyecto:", error);
      alert("Error al intentar duplicar el proyecto");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Mis Currículums
            </h1>
            <p className="text-gray-500 mt-1">Gestiona tus proyectos de CV</p>
          </div>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nuevo Proyecto
          </button>
        </div>

        <ProjectList
          projects={projects}
          onDelete={handleDeleteClick}
          onDuplicate={handleDuplicateProject}
        />
      </main>

      <Footer />

      <NewProjectDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={handleCreateProject}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        projectName={projectToDelete?.name || ""}
      />
    </div>
  );
}

export default Home;
