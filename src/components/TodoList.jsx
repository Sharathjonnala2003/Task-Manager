import { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    let arr = localStorage.getItem("taskList");

    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const deleteTask = (index) => {
    // Use slice to create a new array without modifying the original state
    const tempList = [...taskList];
    tempList.splice(index, 1);

    // Update the state directly
    setTaskList(tempList);

    // Update localStorage
    localStorage.setItem("taskList", JSON.stringify(tempList));
  };

  const updateListArray = (obj, index) => {
    // Use slice to create a new array without modifying the original state
    const tempList = [...taskList];
    tempList[index] = obj;

    // Update the state directly
    setTaskList(tempList);

    // Update localStorage
    localStorage.setItem("taskList", JSON.stringify(tempList));
  };

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    // Use slice to create a new array without modifying the original state
    const tempList = [...taskList, taskObj];

    // Update the state directly
    setTaskList(tempList);

    // Update localStorage
    localStorage.setItem("taskList", JSON.stringify(tempList));

    // Close the modal
    setModal(false);
  };

  return (
    <>
      <div className="header text-center">
        <h3>Todo List</h3>
        <button className="btn btn-primary mt-2" onClick={toggle}>
          Create Task
        </button>
      </div>
      <div className="task-container">
        {taskList &&
          taskList.map((obj, index) => (
            <Card
              key={index} // Add a unique key for each Card component
              taskObj={obj}
              index={index}
              deleteTask={deleteTask}
              updateListArray={updateListArray}
            />
          ))}
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;
