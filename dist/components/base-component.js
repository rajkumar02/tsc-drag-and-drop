export class Componenet {
    constructor(elementId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(elementId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAdBeginning) {
        this.hostElement.insertAdjacentElement(insertAdBeginning ? "afterbegin" : "beforeend", this.element);
    }
}
//# sourceMappingURL=base-component.js.map