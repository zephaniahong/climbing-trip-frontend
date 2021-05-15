import React, { useContext } from "react";
import { ClimbingContext, updateRoutes } from "../store";
import classes from "./Routes.module.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Backdrop = (props) => {
  return <div onClick={props.onConfirm} className={classes.backdrop}></div>;
};

function RoutesModal() {
  const { store, dispatch } = useContext(ClimbingContext);
  const { routes } = store;

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const routeList = Array.from(routes);
    const [reorderedRoutes] = routeList.splice(result.source.index, 1);
    routeList.splice(result.destination.index, 0, reorderedRoutes);
    dispatch(updateRoutes(routeList));
  }
  return (
    <React.Fragment>
      <Backdrop />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="routes">
          {(provided) => (
            <ul
              className="routes"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {routes.map(({ id, name }, index) => (
                <Draggable key={id} draggableId={String(id)} index={index}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {name}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </React.Fragment>
  );
}

export default RoutesModal;
