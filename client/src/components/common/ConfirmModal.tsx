"use client";

interface Props {
  title: string;
  description: string;
  confirmAction: () => void;
  cancelAction: () => void;
}

export default function ConfirmModal({
  title,
  description,
  confirmAction,
  cancelAction,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-sm shadow-lg">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={cancelAction}
            className="px-4 py-1 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={confirmAction}
            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
