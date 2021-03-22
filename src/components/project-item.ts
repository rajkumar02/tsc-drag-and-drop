import { Draggable } from '../models/drag-drop.js';
import { Project } from '../models/project.js';
import { autobind  as AutoBind} from '../decorator/autobind.js';
import { Componenet } from './base-component.js';

  /* -------------------------------------------------------------------------- */
  /*                             Project Item Class                             */
  /* -------------------------------------------------------------------------- */

  export class ProjectItem
  extends Componenet<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  get persons() {
    if (this.project.pople === 1) {
      return "1 person";
    } else {
      return `${this.project.pople} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(_: DragEvent) {
    console.log("dragend");
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent =
      this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

