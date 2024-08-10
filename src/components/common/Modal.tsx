import React, { useState, useEffect, useRef, KeyboardEvent } from 'react'
import './Modal.css'

interface ModalProps {
  isOpen: boolean
  showCloseButton?: boolean
  onClose?: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, showCloseButton, onClose, children }) => {
  const ref = useRef<HTMLDialogElement | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(isOpen)

  useEffect(() => {
    setIsModalOpen(isOpen)
  }, [isOpen])

  useEffect(() => {
    const modalElem = ref.current
    if (modalElem) {
      if (isModalOpen) {
        modalElem.showModal()
      } else {
        modalElem.close()
      }
    }
  }, [isModalOpen])

  const onCloseModal = () => {
    onClose && onClose()
    setIsModalOpen(false)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'Escape') {
      onCloseModal()
    }
  }

  return (
    <dialog ref={ref} className='modal' onKeyDown={onKeyDown}>
      <div className='modal-content'>
        {showCloseButton && (
          <button className='modal-close-btn' onClick={onCloseModal}>
            &times;
          </button>
        )}
        {children}
      </div>
    </dialog>
  )
}

export default Modal
