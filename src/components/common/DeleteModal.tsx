import { ModalProps } from "../../types/types";

const DeleteModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  children,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from bubbling to overlay
  };

  return (
    <div
      className="fixed inset-0 
      
       bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick} // Close on clicking outside
    >
      <div
        className="bg-gray-400 text-black p-6 rounded-xl w-full max-w-sm shadow-lg relative"
        onClick={handleModalClick} // Prevent close when clicking inside
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-lg"
        >
          &times;
        </button>

        {children}

        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white rounded-md text-white hover:bg-white hover:text-black transition"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-[#E74646] text-white rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
