import { useState} from "react";
import { Task } from "../interfaces/TaskInterface";

interface EditModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
}

const EditModal: React.FC<EditModalProps> = ({ task, onClose, onUpdate }) => {
  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskStatus, setTaskStatus] = useState(task.status);

  const handleSave = () => {
    const updatedTask: Task = {
      ...task,
      name: taskName,
      description: taskDescription,
      status: taskStatus,
    };

    onUpdate(updatedTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <section className="bg-white rounded shadow-lg p-4 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Editar Tarea</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">X</button>
        </div>
        <div className="mt-4">
          <label className="block text-gray-700">Nombre de la Tarea</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />

          <label className="block text-gray-700">Descripción</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full border rounded px-2 py-1"
          ></textarea>

          <label className="block text-gray-700">Estado</label>
          <select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="pending">Pendiente</option>
            <option value="finished">Finalizada</option>
          </select>

          <button
            onClick={handleSave}
            className="bg-violet-400 px-2 py-1 mt-3 w-full rounded text-white"
          >
            Guardar Cambios
          </button>
        </div>
      </section>
    </div>
  );
};

export default EditModal;
