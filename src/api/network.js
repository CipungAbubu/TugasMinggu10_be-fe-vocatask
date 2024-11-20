import { useAuthStore } from "../store/authStore";

const BASE_API_URL = "http://localhost:8080";

export const login = async ({ email, password }) => {
  const url = `${BASE_API_URL}/api/users/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
  }
};

export const register = async ({ email, password, name }) => {
  const url = `${BASE_API_URL}/api/users/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during registration:", error.message);
  }
};

export const createTask = async (title) => {
  const url = `${BASE_API_URL}/api/tasks`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
  }
};

export const getAllTask = async () => {
  const url = `${BASE_API_URL}/api/tasks`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
  }
};

export const getProfile = async () => {
  const url = `${BASE_API_URL}/api/users/profile`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
  }
};

export const toggleTaskStatus = async (taskId) => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/tasks/${taskId}/toggle`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
    });

    console.log("Toggle Task Status Response:", response); 
    if (!response.ok) {
      throw new Error("Failed to toggle task");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error toggling task:", error);
  }
};

export const deleteTaskById = async (taskId) => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
    });

    console.log("Delete Task Response:", response); 
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
