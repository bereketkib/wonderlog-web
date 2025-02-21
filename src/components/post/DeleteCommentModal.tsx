import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

interface DeleteCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteCommentModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteCommentModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-8 text-left align-middle shadow-xl transition-all border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <TrashIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-2"
                >
                  Delete Comment
                </Dialog.Title>
                <div className="mt-3">
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this comment? This action
                    cannot be undone.
                  </p>
                </div>

                <div className="mt-8 flex gap-3 justify-center">
                  <button
                    type="button"
                    className="flex-1 max-w-[160px] px-4 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-colors"
                    onClick={onConfirm}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="flex-1 max-w-[160px] px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-colors"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
