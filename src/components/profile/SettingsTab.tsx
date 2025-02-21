import Input from "@/components/ui/Input";

interface SettingsTabProps {
  modalError: string;
  modalSuccess: string;
  onPasswordChange: (e: React.FormEvent<HTMLFormElement>) => void;
  onPasswordFieldChange: (
    name: string,
    value: string,
    form: HTMLFormElement
  ) => void;
  onShowPasswordModal: () => void;
  onShowDeleteModal: () => void;
  showPasswordModal: boolean;
  showDeleteModal: boolean;
  onClosePasswordModal: () => void;
  onCloseDeleteModal: () => void;
  onDeleteAccount: () => void;
}

export default function SettingsTab({
  modalError,
  modalSuccess,
  onPasswordChange,
  onPasswordFieldChange,
  onShowPasswordModal,
  onShowDeleteModal,
  showPasswordModal,
  showDeleteModal,
  onClosePasswordModal,
  onCloseDeleteModal,
  onDeleteAccount,
}: SettingsTabProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-lg font-medium mb-6">Account Settings</h3>
      <div className="space-y-4">
        <button
          onClick={onShowPasswordModal}
          className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Change Password
        </button>
        <button
          onClick={onShowDeleteModal}
          className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-red-600 dark:text-red-400"
        >
          Delete Account
        </button>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Change Password</h3>
            <form
              onSubmit={onPasswordChange}
              className="space-y-4"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                if (
                  target.name === "newPassword" ||
                  target.name === "confirmNewPassword"
                ) {
                  onPasswordFieldChange(
                    target.name,
                    target.value,
                    e.currentTarget
                  );
                }
              }}
            >
              {modalError && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {modalError}
                </p>
              )}
              {modalSuccess && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  {modalSuccess}
                </p>
              )}
              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                required
              />
              <Input
                label="New Password"
                name="newPassword"
                type="password"
                required
              />
              <Input
                label="Confirm New Password"
                name="confirmNewPassword"
                type="password"
                required
              />
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={onClosePasswordModal}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Delete Account</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            {modalError && (
              <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                {modalError}
              </p>
            )}
            <div className="flex justify-end gap-4">
              <button
                onClick={onCloseDeleteModal}
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={onDeleteAccount}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
