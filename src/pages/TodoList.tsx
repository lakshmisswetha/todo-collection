import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew, MdDelete, MdModeEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ControlledCheckbox from "@/components/ui/controlledCheckBox";
import { useCollectionContext } from "@/contexts/collectionContext";
import { ActionType } from "../contexts/types";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const TodoList = () => {
    const { state, dispatch } = useCollectionContext();
    const location = useLocation();
    const navigate = useNavigate();

    const collectionId = (location.state as { id: string })?.id;
    const collection = state.collections.find((c) => c.id === collectionId);

    const [inputValue, setInputValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

    const [isDialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        if (state.collections.length > 0) {
            localStorage.setItem("collections", JSON.stringify(state.collections));
        }
    }, [state.collections]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleAddTask = () => {
        if (inputValue.trim() === "" || !collectionId) return;

        if (isEditing && editingTaskId) {
            dispatch({
                type: ActionType.UPDATE_TODO,
                payload: {
                    collectionId,
                    todoId: editingTaskId,
                    name: inputValue,
                },
            });
            setIsEditing(false);
            setEditingTaskId(null);
        } else {
            dispatch({
                type: ActionType.ADD_TODO,
                payload: {
                    collectionId,
                    name: inputValue,
                },
            });
        }

        setInputValue("");
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleAddTask();
        }
    };

    const handleDeleteTask = (taskId: string) => {
        dispatch({
            type: ActionType.DELETE_TODO,
            payload: {
                collectionId,
                todoId: taskId,
            },
        });
    };

    const handleEditClick = (id: string, name: string) => {
        setIsEditing(true);
        setEditingTaskId(id);
        setInputValue(name);
    };

    const handleCheckboxChange = (taskId: string, checked: boolean) => {
        dispatch({
            type: ActionType.TOGGLE_TODO,
            payload: {
                collectionId,
                taskId,
                isChecked: checked,
            },
        });
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleConfirmDelete = () => {
        if (collectionId) {
            dispatch({
                type: ActionType.DELETE_COLLECTION,
                payload: { collectionId: collectionId },
            });
            setDialogOpen(false);
            navigate(-1);
        }
    };

    const handleCancelDelete = () => {
        setDialogOpen(false);
    };

    if (!collection) {
        return <div>Collection not found.</div>;
    }

    return (
        <div className="flex flex-col px-14 w-full">
            <div className="flex items-center w-full mb-6">
                <div
                    onClick={handleBackClick}
                    className="flex justify-center items-center cursor-pointer"
                >
                    <MdOutlineArrowBackIosNew className="text-2xl" />
                </div>
                <div className="flex justify-between items-center w-full">
                    <h1 className="text-2xl font-semibold ml-2 self-center">
                        {collection.title || "Todo List"}
                    </h1>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="secondary">Delete Collection</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                        </DialogHeader>
                        <p>
                            Are you sure you want to delete this collection? This action cannot be
                            undone.
                        </p>
                        <DialogFooter>
                            <Button onClick={handleConfirmDelete}>Yes, Delete</Button>
                            <Button onClick={handleCancelDelete}>Cancel</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex mt-6 w-full">
                <Input
                    value={inputValue}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a new Task..."
                    className="bg-muted rounded-lg w-full outline-none border-none"
                    onChange={handleInputChange}
                />
                <Button onClick={handleAddTask} className="ml-1">
                    Add
                </Button>
            </div>
            <ul className="mt-12 flex flex-col items-center justify-center w-full">
                {collection.todos.length === 0 ? (
                    <div className="w-full h-fit flex justify-center items-center p-12">
                        <p className="text-muted-foreground">
                            No tasks available. Add a task to get started!
                        </p>
                    </div>
                ) : (
                    collection.todos.map((task) => (
                        <li
                            key={task.id}
                            className="w-full flex items-center justify-between bg-muted p-4 mb-3 rounded-lg"
                        >
                            <div className="flex items-center">
                                <ControlledCheckbox
                                    isChecked={task.isChecked}
                                    onCheckedChange={(checked) =>
                                        handleCheckboxChange(task.id, checked)
                                    }
                                />
                                <h2 className={`ml-3 ${task.isChecked ? "line-through" : ""}`}>
                                    {task.name}
                                </h2>
                            </div>
                            <div className="flex items-center">
                                <MdDelete
                                    className="text-xl hover:text-red-400 cursor-pointer mr-2"
                                    onClick={() => handleDeleteTask(task.id)}
                                />
                                <MdModeEdit
                                    className="text-xl cursor-pointer hover:text-blue-400"
                                    onClick={() => handleEditClick(task.id, task.name)}
                                />
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default TodoList;
