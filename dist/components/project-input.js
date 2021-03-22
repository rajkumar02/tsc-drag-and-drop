var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Componenet } from './base-component.js';
import * as Validation from '../utils/validation.js';
import { autobind } from '../decorator/autobind.js';
import { projectState } from '../state/project-state.js';
export class ProjectInput extends Componenet {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandaler);
    }
    renderContent() { }
    gatherInput() {
        const enterTitle = this.titleInputElement.value;
        const enterDescrition = this.descriptionInputElement.value;
        const enterPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enterTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enterDescrition,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: +enterPeople,
            required: true,
            min: 1,
        };
        if (!Validation.validate(titleValidatable) ||
            !Validation.validate(descriptionValidatable) ||
            !Validation.validate(peopleValidatable)) {
            alert("Invalid input, please try again!");
            return;
        }
        else {
            return [enterTitle, enterDescrition, +enterPeople];
        }
    }
    clearInput() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    submitHandaler(event) {
        event.preventDefault();
        const userInput = this.gatherInput();
        if (Array.isArray(userInput)) {
            const [title, desc, peopele] = userInput;
            projectState.addProject(title, desc, peopele);
            this.clearInput();
        }
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandaler", null);
//# sourceMappingURL=project-input.js.map