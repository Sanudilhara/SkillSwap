import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({ children, canClose, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function getFocusableElements() {
      return dialog.querySelectorAll(
        'button:not(:disabled), input, textarea, select, a[href]',
      );
    }

    getFocusableElements()[0]?.focus();

    // Keep keyboard focus inside the dialog while it is open.
    function handleTab(event) {
      if (event.key !== 'Tab') return;

      const elements = getFocusableElements();
      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }

    dialog.addEventListener('keydown', handleTab);

    return () => {
      document.body.style.overflow = previousOverflow;
      dialog.removeEventListener('keydown', handleTab);
      previousFocus?.focus();
    };
  }, []);

  function handleBackdropClick(event) {
    if (canClose && event.target === event.currentTarget) onClose();
  }

  function handleKeyDown(event) {
    if (canClose && event.key === 'Escape') onClose();
  }

  return (
    <div className="modal-backdrop" onMouseDown={handleBackdropClick}>
      <section
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onKeyDown={handleKeyDown}
      >
        {canClose && (
          <button
            className="modal-close icon-button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X size={21} />
          </button>
        )}
        {children}
      </section>
    </div>
  );
}
