import { Componenet } from './base-component';
import { DragTarget } from '../models/drag-drop';
import { Project, ProjectStatus } from '../models/project';
import { autobind } from '../decorator/autobind';
import { projectState } from '../state/project-state';
import { ProjectItem } from './project-item';

    /* -------------------------------------------------------------------------- */
  /*                             Project List class                             */
  /* -------------------------------------------------------------------------- */
  export class ProjectList
    extends Componenet<HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedProject: Project[];

    constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);
      this.assignedProject = [];

      this.configure();
      this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent) {
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }

    @autobind
    dropHandler(event: DragEvent) {
      const prjId = event.dataTransfer!.getData("text/plain");
      projectState.moveProject(
        prjId,
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    @autobind
    dragLeaveHandler(_: DragEvent) {
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);

      projectState.addListner((projects: Project[]) => {
        const releventProjects = projects.filter((prj) => {
          if (this.type === "active") {
            return prj.status === ProjectStatus.Active;
          }
          return prj.status === ProjectStatus.Finished;
        });
        this.assignedProject = releventProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-project-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector("h2")!.textContent =
        this.type.toUpperCase() + " PROJECT";
    }

    private renderProjects() {
      const listEl = document.getElementById(
        `${this.type}-project-list`
      )! as HTMLUListElement;

      listEl.innerHTML = "";

      for (const prjItem of this.assignedProject) {
        new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
      }
    }
  }
