import { apiClient } from "../../security/ApiClient";

export const retrieveAllTodosForUsername = async (username, token) => {
    return await apiClient
    .get(`users/${username}/todos`)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return error;
    })
    .finally(() => {
        console.log("All Todos");
    });
};

export const deleteTodoItem = async (username, id, token) => {
return await apiClient
    .delete(`users/${username}/todos/${id}`)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return error;
    })
    .finally(() => {
        console.log("Deleted Todo");
    });
};

export const retrieveTodoApi = async (username, id, token) => {
return await apiClient
    .get(`users/${username}/todos/${id}`)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return error;
    })
    .finally(() => {
        console.log("Retrieved Data");
    });
};

export const updateTodoApi = async (username, id, todo, token) => {
return await apiClient
    .put(`users/${username}/todos/${id}`, todo)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return error;
    })
    .finally(() => {
        console.log("Updated Data");
    });
};

export const createTodoApi = async (username, todo, token) => {
return await apiClient
    .post(`users/${username}/todos`, todo)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        return error;
    })
    .finally(() => {
        console.log("Updated Data");
    });
};
