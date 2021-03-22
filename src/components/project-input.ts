import { Componenet } from './base-component';
import * as Validation from '../utils/validation';
import { autobind } from '../decorator/autobind';
import { projectState } from '../state/project-state';

    /* -------------------------------------------------------------------------- */
  /*                                 Project Input Class                        */
  /* -------------------------------------------------------------------------- */

  export class ProjectInput extends Componenet<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");

      this.titleInputElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;

      this.configure();
    }

    configure() {
      this.element.addEventListener("submit", this.submitHandaler);
    }

    renderContent() {}

    private gatherInput(): [string, string, number] | void {
      const enterTitle = this.titleInputElement.value;
      const enterDescrition = this.descriptionInputElement.value;
      const enterPeople = this.peopleInputElement.value;

      const titleValidatable: Validation.Validatable = {
        value: enterTitle,
        required: true,
      };

      const descriptionValidatable: Validation.Validatable = {
        value: enterDescrition,
        required: true,
        minLength: 5,
      };

      const peopleValidatable: Validation.Validatable = {
        value: +enterPeople,
        required: true,
        min: 1,
      };

      if (
        //   enterTitle.trim().length === 0 ||
        //   enterDescrition.trim().length === 0 ||
        //   enterPeople.trim().length === 0
        !Validation.validate(titleValidatable) ||
        !Validation.validate(descriptionValidatable) ||
        !Validation.validate(peopleValidatable)
      ) {
        alert("Invalid input, please try again!");
        return;
      } else {
        return [enterTitle, enterDescrition, +enterPeople];
      }
    }

    private clearInput() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }

    @autobind
    private submitHandaler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherInput();

      if (Array.isArray(userInput)) {
        const [title, desc, peopele] = userInput;
        projectState.addProject(title, desc, peopele);
        this.clearInput();
      }
    }
  }
