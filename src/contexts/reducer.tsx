import { State, Action } from "./types";
import { v4 as uuidv4 } from "uuid";

const defaultCollections = [
    { id: uuidv4(), title: "Work", todos: [] },
    { id: uuidv4(), title: "Personal", todos: [] },
    { id: uuidv4(), title: "Fitness", todos: [] },
    { id: uuidv4(), title: "Grocery", todos: [] },
];

const getStoredCollections = () => {
    try {
        const storedCollections = localStorage.getItem("collections");
        if (storedCollections) {
            const parsedCollections = JSON.parse(storedCollections);
            if (Array.isArray(parsedCollections)) {
                return parsedCollections;
            }
        }
    } catch (e) {
        console.error("Error parsing collections from localStorage:", e);
    }
    return defaultCollections;
};

export const initialState: State = {
    collections: getStoredCollections(),
};

export function reducer(state: State, action: Action): State {
    let updatedCollections;

    switch (action.type) {
        case "ADD_TODO":
            updatedCollections = state.collections.map((collection) =>
                collection.id === action.payload.collectionId
                    ? {
                          ...collection,
                          todos: [
                              ...collection.todos,
                              {
                                  id: uuidv4(),
                                  name: action.payload.name,
                                  isChecked: false,
                              },
                          ],
                      }
                    : collection
            );
            localStorage.setItem("collections", JSON.stringify(updatedCollections));
            return {
                ...state,
                collections: updatedCollections,
            };

        case "DELETE_TODO":
            updatedCollections = state.collections.map((collection) =>
                collection.id === action.payload.collectionId
                    ? {
                          ...collection,
                          todos: collection.todos.filter(
                              (todo) => todo.id !== action.payload.todoId
                          ),
                      }
                    : collection
            );
            localStorage.setItem("collections", JSON.stringify(updatedCollections));
            return {
                ...state,
                collections: updatedCollections,
            };
        case "UPDATE_TODO":
            updatedCollections = state.collections.map((collection) =>
                collection.id === action.payload.collectionId
                    ? {
                          ...collection,
                          todos: collection.todos.map((todo) =>
                              todo.id === action.payload.todoId
                                  ? { ...todo, name: action.payload.name }
                                  : todo
                          ),
                      }
                    : collection
            );
            localStorage.setItem("collections", JSON.stringify(updatedCollections));
            return {
                ...state,
                collections: updatedCollections,
            };

        case "TOGGLE_TODO":
            updatedCollections = state.collections.map((collection) =>
                collection.id === action.payload.collectionId
                    ? {
                          ...collection,
                          todos: collection.todos.map((todo) =>
                              todo.id === action.payload.taskId
                                  ? { ...todo, isChecked: action.payload.isChecked }
                                  : todo
                          ),
                      }
                    : collection
            );
            localStorage.setItem("collections", JSON.stringify(updatedCollections));
            return {
                ...state,
                collections: updatedCollections,
            };

        case "CREATE_COLLECTION":
            updatedCollections = [
                ...state.collections,
                {
                    id: uuidv4(),
                    title: action.payload.title,
                    todos: [],
                },
            ];
            localStorage.setItem("collections", JSON.stringify(updatedCollections));
            return {
                ...state,
                collections: updatedCollections,
            };

        case "DELETE_COLLECTION":
            updatedCollections = state.collections.filter(
                (collection) => collection.id !== action.payload.collectionId
            );
            localStorage.setItem("collections", JSON.stringify(updatedCollections));
            return {
                ...state,
                collections: updatedCollections,
            };

        default:
            return state;
    }
}
