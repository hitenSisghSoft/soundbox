export interface userDataInterface {
  id: number;
  name?: string;
  email?: string;
  mobile?: number;
  role?: string;
  action?: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  children?: React.ReactNode;
}