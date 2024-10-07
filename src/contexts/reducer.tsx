import { State, Action } from "./types";

import { produce } from "immer";

export function reducer(state: State, action: Action): State {
    return produce(state, (draft) => {
        switch (action.type) {
            case "ADD_TODO":
                const addCollection = draft.collections.find(
                    (collection) => collection.id === action.payload.collectionId
                );
                if (addCollection) {
                    addCollection.todos.push({
                        id: crypto.randomUUID(),
                        name: action.payload.name,
                        isChecked: false,
                    });
                }
                break;

            case "DELETE_TODO":
                const deleteCollection = draft.collections.find(
                    (collection) => collection.id === action.payload.collectionId
                );
                if (deleteCollection) {
                    deleteCollection.todos = deleteCollection.todos.filter(
                        (todo) => todo.id !== action.payload.todoId
                    );
                }
                break;

            case "UPDATE_TODO":
                const updateCollection = draft.collections.find(
                    (collection) => collection.id === action.payload.collectionId
                );
                if (updateCollection) {
                    const todo = updateCollection.todos.find(
                        (todo) => todo.id === action.payload.todoId
                    );
                    if (todo) {
                        todo.name = action.payload.name;
                    }
                }
                break;

            case "TOGGLE_TODO":
                const toggleCollection = draft.collections.find(
                    (collection) => collection.id === action.payload.collectionId
                );
                if (toggleCollection) {
                    const todo = toggleCollection.todos.find(
                        (todo) => todo.id === action.payload.taskId
                    );
                    if (todo) {
                        todo.isChecked = action.payload.isChecked;
                    }
                }
                break;

            case "CREATE_COLLECTION":
                draft.collections.push({
                    id: crypto.randomUUID(),
                    title: action.payload.title,
                    todos: [],
                });
                break;

            case "DELETE_COLLECTION":
                draft.collections = draft.collections.filter(
                    (collection) => collection.id !== action.payload.collectionId
                );
                break;

            default:
                break;
        }

        // Save the updated state to localStorage
        localStorage.setItem("collections", JSON.stringify(draft.collections));
    });
}
