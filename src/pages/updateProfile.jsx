import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUserProfile } from "../api/network"; // Assuming your API functions are stored here
import { useProfileStore } from "../store/profileStore"; // Use your state management or context for profile data

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Access profile from store/context
  const profile = useProfileStore((state) => state.profile); // Assuming profile is stored here

  // Set the form fields with the current profile data
  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      await updateUserProfile({ name, email, password });
      toast.success("Profile updated successfully!");
      navigate("/home"); // Redirect to home after updating the profile
    } catch (err) {
      setError("Failed to update profile.");
      toast.error("There was an error updating your profile.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-pink-300 to-yellow-200">
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
