// types.ts
export type Todo = {
    id: string;
    name: string;
    isChecked: boolean;
};

export type Collection = {
    id: string;
    title: string;
    todos: Todo[];
};

export type State = {
    collections: Collection[];
};

export enum ActionType {
    ADD_TODO = "ADD_TODO",
    DELETE_TODO = "DELETE_TODO",
    CREATE_COLLECTION = "CREATE_COLLECTION",
    DELETE_COLLECTION = "DELETE_COLLECTION",
    UPDATE_TODO = "UPDATE_TODO",
    TOGGLE_TODO = "TOGGLE_TODO",
}

export type Action =
    | { type: ActionType.ADD_TODO; payload: { collectionId: string; name: string } }
    | { type: ActionType.DELETE_TODO; payload: { collectionId: string; todoId: string } }
    | { type: ActionType.CREATE_COLLECTION; payload: { title: string } }
    | { type: ActionType.DELETE_COLLECTION; payload: { collectionId: string } }
    | {
          type: ActionType.UPDATE_TODO;
          payload: { collectionId: string; todoId: string; name: string };
      }
    | {
          type: ActionType.TOGGLE_TODO;
          payload: { collectionId: string; taskId: string; isChecked: boolean };
      };
