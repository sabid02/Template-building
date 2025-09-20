import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const UserProfile = ({ isOpen, onClose }) => {
  const { user, logout, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone_number: user?.phone_number || "",
    bio: user?.profile?.bio || "",
    company: user?.profile?.company || "",
    website: user?.profile?.website || "",
  });
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    new_password_confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const result = await updateProfile(formData);

    if (result.success) {
      setIsEditing(false);
    } else {
      setErrors({ general: result.error });
    }

    setIsLoading(false);
  };

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    if (passwordData.new_password !== passwordData.new_password_confirm) {
      setErrors({ new_password_confirm: "Passwords do not match" });
      setIsLoading(false);
      return;
    }

    const result = await changePassword(passwordData);

    if (result.success) {
      setIsChangingPassword(false);
      setPasswordData({
        old_password: "",
        new_password: "",
        new_password_confirm: "",
      });
    } else {
      setErrors({ general: result.error });
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "profile"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "security"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Security
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* User Info Display */}
              {!isEditing && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {user?.first_name?.[0]}
                        {user?.last_name?.[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user?.first_name} {user?.last_name}
                      </h3>
                      <p className="text-gray-600">{user?.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">
                        Username:
                      </span>
                      <p className="text-gray-600">{user?.username}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Phone:</span>
                      <p className="text-gray-600">
                        {user?.phone_number || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Company:
                      </span>
                      <p className="text-gray-600">
                        {user?.profile?.company || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Website:
                      </span>
                      <p className="text-gray-600">
                        {user?.profile?.website || "Not provided"}
                      </p>
                    </div>
                  </div>

                  {user?.profile?.bio && (
                    <div>
                      <span className="font-medium text-gray-700">Bio:</span>
                      <p className="text-gray-600 mt-1">{user.profile.bio}</p>
                    </div>
                  )}

                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>
              )}

              {/* Edit Form */}
              {isEditing && (
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-600">{errors.general}</p>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              {!isChangingPassword ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Change Password
                  </h3>
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Change Password
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handlePasswordChangeSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="old_password"
                      value={passwordData.old_password}
                      onChange={handlePasswordChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="new_password"
                      value={passwordData.new_password}
                      onChange={handlePasswordChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="new_password_confirm"
                      value={passwordData.new_password_confirm}
                      onChange={handlePasswordChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.new_password_confirm && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.new_password_confirm}
                      </p>
                    )}
                  </div>

                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-600">{errors.general}</p>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? "Changing..." : "Change Password"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordData({
                          old_password: "",
                          new_password: "",
                          new_password_confirm: "",
                        });
                        setErrors({});
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Danger Zone
                </h3>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
