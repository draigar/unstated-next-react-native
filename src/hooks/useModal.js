import React, {useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom';

function WithClickOutside(children, fade = true, onClickOutisde, useEscapeKey = true, className) {
  const outRef = useRef();

  const handleClickOutside = e => {
    if (outRef.current && (!outRef.current.contains(e.target) || e.target.id === 'fade')) {
      onClickOutisde();
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') onClickOutisde();
  };

  const fadeStyle = {
    position: 'absolute',
    top: 0,
    left: '50%',
    right: '50%',
    width: '100vw',
    height: '100%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
    backgroundColor: 'rgba(227, 227, 227, 0.5)'
  };

  useEffect(() => {
    global.document.addEventListener('mousedown', handleClickOutside);
    if (useEscapeKey) global.document.addEventListener('keydown', handleKeyDown);
    return () => {
      global.document.removeEventListener('mousedown', handleClickOutside);
      if (useEscapeKey) global.document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return React.createElement(
    'div',
    {id: fade ? 'fade' : null, style: fade ? fadeStyle : null, ref: outRef, className},
    children
  );
}

export function useModalWrapper({bindToElement = global.document.body} = {}) {
  const [isOpen, setModalOpen] = useState(false);

  function openModal() {
    if (bindToElement) setModalOpen(true);
  }

  function closeModal() {
    if (bindToElement) setModalOpen(false);
  }

  function ModalWrapper({children, backdrop, fade, className}) {
    const returnChildren = backdrop
      ? WithClickOutside(children, fade, closeModal, className)
      : children;
    return bindToElement && isOpen ? ReactDOM.createPortal(returnChildren, bindToElement) : null;
  }

  return {ModalWrapper, isOpen, openModal, closeModal};
}
