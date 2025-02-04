import { useState } from "react";
import { createPortal } from "react-dom";
import "./index.css";
import TaskList from "./components/TaskList";
import AddModal from "./components/AddModal";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setReload(!reload);
  };

  return (
    <>
      <header className="py-4">
        <h1 className="text-center text-4xl font-bold">Administrador de Tareas</h1>
      </header>

      <main className="max-w-2xl mx-auto rounded-lg p-10">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Lista de tareas</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-violet-400 text-white px-3 py-1 rounded-md hover:bg-violet-500"
          >
            Añadir Tarea
          </button>
        </div>

        <TaskList key={reload} /> {/*no supe como hacer esto correctamente :p */}

        {showModal &&
          createPortal(<AddModal onClose={handleCloseModal} />, 
          document.body)}
      </main>
    </>
  );
}

export default App;
