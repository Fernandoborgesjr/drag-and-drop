import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

export type DraggableItemProps = {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  item: any;
};
