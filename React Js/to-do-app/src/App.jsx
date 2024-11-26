import { useState, useEffect } from "react";
import Topbar from "./components/Topbar";

function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const addForm = (e) => {
    e.preventDefault();
  };

  const addTask = () => {
    if (!text) {
      alert("Task should not be Blank....!");
      return;
    } else {
      setTasks([...tasks, text]);
      setText("");
    }
  };

  // remove/delete
  const deleteTask = (index) => {
    const text = tasks.filter((el, i) => i != index);
    setTasks(text);
  };

  return (
    <>
      <Topbar />

      {/* Main Card */}
      <div className="row justify-content-center m-0 p-2">
        <div className="col-md-7">
          <div className="card shadow border-0 my-5 p-3">
            {/* Title */}
            <div className="card-header">
              <h3>Tasks</h3>
            </div>
            {/*============== Task Form =========== */}
            <form onSubmit={addForm}>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-9">
                    <input
                      type="text"
                      value={text}
                      className="form-control mb-3 mb-md-0"
                      placeholder="Enter your Task..."
                      onChange={(e) => {
                        setText(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-3">
                    <button className="btn btn-dark w-100" onClick={addTask}>
                      Add Task
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {/*=============== Tasks View ==============*/}

            <div className="card-body">
              <div className="row">
                {tasks.map((task, i) => {
                  return (
                    <div key={i} className="col-md-12">
                      <div className="card shadow border-0 p-3 mb-3 flex-wrap align-items-center justify-content-between d-flex flex-row">
                        <p>{task}</p>
                        <div>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              deleteTask(i);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
