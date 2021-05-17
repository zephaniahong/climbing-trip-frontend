import React, { useContext } from "react";
import { ClimbingContext, updateRoutes } from "../store";
import classes from "./Routes.module.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Backdrop = (props) => {
  return <div onClick={props.onConfirm} className={classes.backdrop}></div>;
};

function RoutesModal(props) {
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
      <Backdrop onConfirm={props.onConfirm} />
      <div className={`modal-dialog ${classes.modalView}`} tabIndex="-1">
        <div className="modal-content">
          <h5 className="text-center modal-title">{props.title}</h5>
          <div className="modal-body">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="routes">
                {(provided) => (
                  <ul
                    className={`routes list-group ${classes.ul} mx-0`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {routes.map(({ id, name }, index) => (
                      <Draggable
                        key={id}
                        draggableId={String(id)}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            className="list-group-item"
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
          </div>
          <div className="modal-footer">
            <button
              onClick={props.onConfirm}
              type="button"
              className="btn btn-secondary"
            >
              Close
            </button>
            <button
              onClick={props.onConfirm}
              type="button"
              className="btn btn-primary"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RoutesModal;

{
  /* <React.Fragment>
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
</React.Fragment>; */
}
