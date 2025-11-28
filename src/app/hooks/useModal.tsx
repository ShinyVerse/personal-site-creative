import { useState, useCallback } from "react";

/**
 * Hook for managing modal state
 * @returns Object with modal state, open function, close function, and isOpen boolean
 * 
 * @example
 * ```tsx
 * const modal = useModal<PhotoEntry>();
 * 
 * // Open modal with data
 * <button onClick={() => modal.open(photo)}>View</button>
 * 
 * // Render modal
 * {modal.isOpen && (
 *   <Modal onClose={modal.close}>
 *     <Content data={modal.data} />
 *   </Modal>
 * )}
 * ```
 */
export function useModal<T = unknown>() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const open = useCallback((item: T) => {
    setData(item);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Clear data after a short delay to allow exit animations
    setTimeout(() => setData(null), 200);
  }, []);

  return {
    isOpen,
    data,
    open,
    close,
  };
}

