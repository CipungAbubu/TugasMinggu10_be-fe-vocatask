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
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-r from-blue-200 via-pink-300 to-yellow-200">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8 flex flex-col justify-center items-center">
          {/* Profil Box */}
          <div className="flex flex-col items-center gap-2 mb-6">
            <div className="flex items-center justify-center gap-3">
              <FiUser size={40} className="text-gray-700" /> 
              {/* Ikon Profil */}
              <h1 className="text-2xl font-bold text-gray-800">
                Hi, {profile?.name ?? "Voca User"}!
              </h1>
            </div>
            <FiLogOut
              size={24}
              className="hover:cursor-pointer text-gray-500 hover:text-red-500 transition"
              onClick={() => {
                logout();
                navigate("/login"); 
              }}
            />
          </div>

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
