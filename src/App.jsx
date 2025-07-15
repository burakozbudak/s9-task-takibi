import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Task from "./components/Task";
import TaskHookForm from "./components/TaskHookForm";
import PeopleForm from "./components/PeopleForm";
import { initialTasks, initialTeam } from "./tasks";

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  const handleTaskSubmit = (yeniTask) => {
    setTasks([yeniTask, ...tasks]);
    toast.success("Yeni görev oluşturuldu.");
  };

  const handlePeopleSubmit = (yeniKisi) => {
    setTeam([...team, yeniKisi]);
    toast.success("Yeni kişi oluşturuldu.");
  };

  const handleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "yapıldı" } : task
      )
    );
    toast.success(`${id} id'li görev tamamlandı.`);
  };

  return (
    <div className="app">
      <ToastContainer position="bottom-right" />
      <div className="formColumn">
        <div className="form-container">
          <h2>Yeni Task</h2>
          <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
        </div>

        <div className="form-container">
          <h2>Yeni Kişi</h2>
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h2 className="column-title">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapılacak")
              .map((t) => (
                <Task key={t.id} taskObj={t} onComplete={handleComplete} />
              ))}
          </div>
        </div>
        <div className="column">
          <h2 className="column-title">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapıldı")
              .map((t) => (
                <Task key={t.id} taskObj={t} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
