import { useState } from "react";
import "./App.css";
import { Articles } from "./Articles";
import Modal from "./Modal";
import { useModal } from "./useModal";

function App() {
  const [id, setId]: [string, (id: string) => void] = useState<string>("");
  const { isOpen, showModal } = useModal();

  return (
    <div className="App">
      <Articles showModal={showModal} setId={setId} />
      {id && (
        <Modal
          isOpen={isOpen}
          toggleModal={showModal}
          id={id}
          setId={setId}
        ></Modal>
      )}
    </div>
  );
}

export default App;
