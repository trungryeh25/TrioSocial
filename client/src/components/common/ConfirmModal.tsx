"use client";

interface Props {
  title?: string;
  description?: string;
  confirmAction: () => void;
  cancelAction: () => void;
}

export default function ConfirmModal({
  title = "Confirm",
  description = "Are you sure you want to do this action?",
  confirmAction,
  cancelAction,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm animate-fadeIn">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={cancelAction}
            className="px-3 py-1 rounded border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={confirmAction}
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
