import { ReactElement, Dispatch, SetStateAction } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

type DragDropProps = {
  state: any[];
  setState: Dispatch<SetStateAction<any>>;
  action: CallableFunction;
  draggableComponent: (
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot,
    item: any
  ) => ReactElement<HTMLElement>;
};

const DragDrop = ({
  state,
  setState,
  action,
  draggableComponent,
}: DragDropProps) => {
  const grid = 8;

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 450,
  });

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination || source.index === destination.index) {
      return;
    }

    setState((prev: any[]) => reorder(prev, source.index, destination.index));
    action();
  };
  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {state.map((item, index) => {
              const draggableId = String(item.id);
              return (
                <Draggable key={item.id} draggableId={draggableId} index={index}>
                  {(provided, snapshot) =>
                    draggableComponent(provided, snapshot, item)
                  }
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDrop;
