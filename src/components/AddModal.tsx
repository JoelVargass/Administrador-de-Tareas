import { useState } from "react";
import { Task } from "../interfaces/TaskInterface";
import { X } from "lucide-react";

interface AddModalProps {
  onClose: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onClose }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("pending");
  const [error, setError] = useState(""); // Estado para manejar errores

  const handleSave = () => {
    if (!taskName.trim() || !taskDescription.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      status: taskStatus,
    };

    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    localStorage.setItem("tasks", JSON.stringify([...existingTasks, newTask]));

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <section className="bg-white rounded shadow-lg p-4 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Nueva Tarea</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">

            <X/>
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Nombre de la Tarea</label>
          <input 
            type="text" 
            value={taskName} 
            onChange={(e) => {
              setTaskName(e.target.value);
              setError(""); // Limpiar error al escribir
            }} 
            className="w-full border rounded px-2 py-1"
          />

          <label className="block text-gray-700 mt-2">Descripción</label>
          <textarea 
            value={taskDescription} 
            onChange={(e) => {
              setTaskDescription(e.target.value);
              setError(""); // limpiar
            }} 
            className="w-full border rounded px-2 py-1"
          ></textarea>

          <label className="block text-gray-700 mt-2">Estado</label>
          <select 
            value={taskStatus} 
            onChange={(e) => setTaskStatus(e.target.value)} 
            className="w-full border rounded px-2 py-1"
          >
            <option value="pending">Pendiente</option>
            <option value="finished">Completada</option>
          </select>

          {/*errores */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button 
            onClick={handleSave} 
            className={`px-2 py-1 mt-3 w-full rounded text-white ${
              !taskName.trim() || !taskDescription.trim() 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-violet-400 hover:bg-violet-500"
            }`}
            disabled={!taskName.trim() || !taskDescription.trim()}
          >
            Guardar
          </button>
        </div>
      </section>
    </div>
  );
};

export default AddModal;
