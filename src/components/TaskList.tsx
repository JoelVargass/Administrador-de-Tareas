import { useEffect, useState } from "react";
import { Task } from "../interfaces/TaskInterface";
import { Pencil, Trash2 } from "lucide-react";
import EditModal from "./EditModal";

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
  
    useEffect(() => {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      setTasks(storedTasks);
    }, []);
  
    const handleDelete = (id: number) => {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const handleUpdate = (updatedTask: Task) => {
      const updatedTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };
  
    return (
      <div className="mt-5">
        {tasks.map(task => (
          <div key={task.id} className="p-4 rounded shadow-md mb-3">
            
            <div className="flex justify-between">
            <h3 className="text-lg font-semibold">{task.name}</h3>
            <span className={`text-sm ${task.status === "pending" ? "text-orange-600 bg-orange-200/50 rounded-full px-2 py-1" : "text-green-600 bg-green-200/50 rounded-full px-2 py-1"}`}>
              {task.status === "pending" ? "Pendiente" : "Finalizada"}
            </span>
            </div>
            <p>{task.description}</p>
            <div className="flex justify-end">
                <button onClick={() => setEditingTask(task)} className="ml-3 text-blue-500 hover:text-blue-700">
                    <Pencil/>
                </button>
                <button onClick={() => handleDelete(task.id)} className="ml-3 text-red-500 hover:text-red-700">
                    <Trash2/>
                </button>
            </div>
          </div>
        ))}

        {editingTask && (
          <EditModal task={editingTask} onClose={() => setEditingTask(null)} onUpdate={handleUpdate} />
        )}
      </div>
    );
  };

export default TaskList;
