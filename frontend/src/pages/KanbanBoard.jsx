import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FaPlus } from "react-icons/fa";
import "../sass/KanbanBoard.scss";

const initialDataKanban = {
  tasks: {
    "task-1": { id: "task-1", content: "Task 1" },
    "task-2": { id: "task-2", content: "Task 2" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "À Faire",
      taskIds: ["task-1", "task-2"],
      img: <FaPlus />,
    },
    "column-2": {
      id: "column-2",
      title: "En cours",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Complété",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

const KanbanBoard = () => {
  const [dataKanban, setDataKanban] = useState(initialDataKanban);

  const handleAddTask = () => {
    alert("Ajout de la tache"); // modifier l'alerte à l'avenir pour une modal
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = dataKanban.columns[source.droppableId];
    const finish = dataKanban.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...dataKanban,
        columns: {
          ...dataKanban.columns,
          [newColumn.id]: newColumn,
        },
      };

      setDataKanban(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...dataKanban,
      columns: {
        ...dataKanban.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setDataKanban(newState);
  };

  return (
    <section className="kanban-main-content">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {dataKanban.columnOrder.map((columnId) => {
            const column = dataKanban.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => dataKanban.tasks[taskId]
            );

            return (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="column"
                  >
                    <h3>{column.title}</h3>
                    <span
                      className="add-tasks-kanban"
                      onClick={() => handleAddTask()}
                    >
                      {column.img}
                    </span>
                    {tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="card"
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </section>
  );
};

export default KanbanBoard;
