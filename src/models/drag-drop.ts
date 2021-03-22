/* -------------------------------------------------------------------------- */
/*                           Drag and Drop interface                          */
/* -------------------------------------------------------------------------- */

    export interface Draggable {
        dragStartHandler(event: DragEvent): void;
        dragEndHandler(event: DragEvent): void;
      }
      
      export interface DragTarget {
        dragOverHandler(evnt: DragEvent): void;
        dropHandler(event: DragEvent): void;
        dragLeaveHandler(event: DragEvent): void;
      }
