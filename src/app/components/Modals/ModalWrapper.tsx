"use client";

import { useEffect, useRef, ReactNode } from "react";
import { X } from "lucide-react";
import { tv } from "tailwind-variants";

const modalStyles = tv({
  slots: {
    overlay:
      "w-full fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4",
    container:
      "relative bg-white shadow-2xl outline-none rounded-lg",
    closeButton:
      "absolute top-3 right-3 w-8 h-8 z-10 bg-white rounded-full p-1.5 shadow-md hover:shadow-lg transition-shadow flex items-center justify-center [&>svg]:text-gray-700 [&>svg]:hover:text-gray-900",
  },
});

interface ModalWrapperProps {
  children: ReactNode;
  onClose: () => void;
  containerClassName?: string;
  closeButtonClassName?: string;
  showCloseButton?: boolean;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  containerStyle?: React.CSSProperties;
}

export default function ModalWrapper({
  children,
  onClose,
  containerClassName,
  closeButtonClassName,
  showCloseButton = true,
  ariaLabelledBy = "modal-title",
  ariaDescribedBy = "modal-description",
  containerStyle,
}: ModalWrapperProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const styles = modalStyles();

  useEffect(() => {
    dialogRef.current?.focus();
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    // Handle ESC key to close modal
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // Focus trap: keep focus within modal
  useEffect(() => {
    const modal = dialogRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener("keydown", handleTabKey);
    return () => modal.removeEventListener("keydown", handleTabKey);
  }, []);

  return (
    <div
      className={styles.overlay()}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`${styles.container()} ${containerClassName || ""}`}
        style={containerStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className={`${styles.closeButton()} ${closeButtonClassName || ""}`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

