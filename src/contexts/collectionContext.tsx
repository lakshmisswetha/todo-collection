import React, { createContext, useReducer, useContext, useEffect, ReactNode } from "react";
import { reducer, initialState } from "./reducer";
import { State, Action } from "./types";

export type CollectionContextType = {
    state: State;
    dispatch: React.Dispatch<Action>;
};

export const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const useCollectionContext = (): CollectionContextType => {
    const context = useContext(CollectionContext);
    if (context === undefined) {
        throw new Error("useCollectionContext must be used within a CollectionProvider");
    }
    return context;
};

export const CollectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
        // Attempt to load data from localStorage
        const localData = localStorage.getItem("collections");
        if (localData) {
            try {
                const parsedData = JSON.parse(localData);
                // Check if parsedData is an array and matches expected shape
                if (Array.isArray(parsedData)) {
                    return { collections: parsedData };
                }
            } catch (e) {
                console.error("Failed to parse localStorage data", e);
            }
        }
        // Return initialState if localStorage is empty or invalid
        return initial;
    });

    useEffect(() => {
        localStorage.setItem("collections", JSON.stringify(state.collections));
    }, [state.collections]);

    return (
        <CollectionContext.Provider value={{ state, dispatch }}>
            {children}
        </CollectionContext.Provider>
    );
};
