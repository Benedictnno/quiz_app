import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const { correct, isModelOpen, closeModel , questions} = useGlobalContext();

  const persentage = ((correct / questions.length )* 100).toFixed(0)
  return (
    <div
      className={`${
        isModelOpen ? "modal-container isOpen" : "model-container"
      }`}
    >
      <div className="modal-content">
        <h2>congrats!</h2>
        <p>You answered {persentage}% of the questions`` correctly</p>
        <button className="close-btn" onClick={closeModel}>
          play again
        </button>
      </div>
    </div>
  );
}

export default Modal
