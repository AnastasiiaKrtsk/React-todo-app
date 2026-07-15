import { Button } from '../ui/Button';

type DeleteModalProps = { onClose: () => void; onDelete: () => void };
export const DeleteModal = ({ onClose, onDelete }: DeleteModalProps) => {
  return (
    <div className="w-full max-w-lg rounded-xl bg-panel p-6 shadow-xl">
      <h2 className="text-2xl font-bold">Delete User</h2>
      <p className="mt-3 text-gray-600">
        Are you sure you want to delete this user?
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <Button className="px-4 py-2" onClick={onClose}>
          Cancel
        </Button>

        <Button
          className="rounded bg-red-600 px-4 py-2 text-white"
          onClick={onDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
