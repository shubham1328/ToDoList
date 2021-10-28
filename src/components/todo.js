import React from "react";
import "./style.css";
import { useState, useEffect } from "react";

// get the local storage data

const getLocalData = () => {
  const lists = localStorage.getItem("myList");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [input, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add the items function

  const addItem = () => {
    if (!input) {
      alert("Fill the data");
    } else if (input && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: input };
          }
          return curElem;
        })
      );

      setInputData([]);
    setEditItem(null);
    setToggleButton(false);

    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: input,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //Edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setEditItem(index);
    setToggleButton(true); 
  };

  // delete items from list

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // remove all the elements

  const removeAll = () => {
    setItems([]);
  };

  // adding Local storage
  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./image/notes.png" alt="notes" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Items"
              className="form-control"
              value={input}
              onChange={(event) => setInputData(event.target.value)}
            />

            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* Show our items */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" kay={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn"></div>
                  <i
                    className="far fa-edit add-btn"
                    onClick={() => editItem(curElem.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    onClick={() => deleteItem(curElem.id)}
                  ></i>
                </div>
              );
            })}
          </div>
          {/* Remove all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
