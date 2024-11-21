import { useEffect } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useProfileStore } from "../store/profileStore";
import { AddForm } from "../components/addForm";
import { TaskList } from "../components/taskList";
import { toast } from "react-toastify";
import { useTaskStore } from "../store/taskStore";

const Home = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const profile = useProfileStore((state) => state.profile);
  const { tasks, getTasks } = useTaskStore();

  const handleUpdateProfile = () => {
    navigate("/update-profile");
  };

  useEffect(() => {
    if (profile) {
      toast.success(`Login Successful! Welcome, ${profile.name}!`);
    }
    getTasks();
  }, [profile, getTasks]);

  const toggleTask = async (taskId) => {
    try {
      console.log("Toggling task with ID:", taskId);
      await updateTaskToDone(taskId);
      getTasks();
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      console.log("Deleting task with ID:", taskId);
      await deleteTask(taskId);
      getTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const incompleteTasks = tasks.filter((task) => !task.isDone);
  const completeTasks = tasks.filter((task) => task.isDone);

  return (
    <div className="flex justify-center items-start min-h-screen w-full bg-gradient-to-r from-blue-200 via-pink-300 to-yellow-200">
      {/* Container Utama dengan 2 Kolom */}
      <div className="flex w-full max-w-6xl mt-16 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Kolom Kiri untuk Profil */}
        <div className="flex flex-col items-center justify-between p-8 w-1/3 bg-gray-100">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-3">
              <FiUser size={40} className="text-gray-700" />
              <h1 className="text-2xl font-bold text-gray-800">
                Hi, {profile?.name ?? "Voca User"}!
              </h1>
            </div>
            <button
              onClick={handleUpdateProfile}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Update Profile
            </button>
            <FiLogOut
              size={24}
              className="hover:cursor-pointer text-gray-500 hover:text-red-500 transition"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            />
          </div>
        </div>

        {/* Kolom Kanan untuk Task */}
        <div className="flex flex-col p-8 w-2/3">
          {/* Input Form */}
          <AddForm />

          {/* Tasks to do */}
          <TaskList
            title="Incomplete Tasks"
            tasks={incompleteTasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />

          {/* Completed Tasks */}
          <TaskList
            title="Completed Tasks"
            tasks={completeTasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
