import ProjectSidebar from "./components/ProjectSidebar.jsx";
import NewProject from "./components/newProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

import { useState } from "react";

function App() {
  const [projectState, setProjectstate] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectstate((prevState) => {
      const taskId = Math.random();
      const newTask = {
        ...text,
        projectId:prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectstate((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== id
        ),
      };
    });
  }

  function handeDeleteProject() {
    setProjectstate((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectstate((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectstate((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectstate((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectstate((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }
  console.log(projectState);

  const selectedProject = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  let content = (
    <SelectedProject
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      project={selectedProject}
      onDelete={handeDeleteProject}
      tasks={projectState.tasks}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancle={handleCancelAddProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
