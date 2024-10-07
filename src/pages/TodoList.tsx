import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew, MdDelete, MdModeEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import ControlledCheckbox from "@/components/ui/controlledCheckBox";
//import { useCollectionContext } from "@/contexts/collectionContext";
import { ActionType } from "../contexts/types";
import { BASE_URL } from "@/utils/config";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const fetchTodos = async (userId: string | null, collectionId: string | null) => {
    const response = await fetch(
        `${BASE_URL}/todos/get?userId=${userId}&collectionId=${collectionId}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }
    return response.json();
};
const addTodos = async (newTodo: any) => {
    try {
        const response = await fetch(`${BASE_URL}/todos/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodo),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        return response.json();
    } catch (err) {
        console.log(err);
    }
};
const updateTodos = async (updateData: any) => {
    try {
        const response = await fetch(`${BASE_URL}/todos/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    } catch (err) {
        console.log(err);
    }
};
const deleteTodos = async (taskId: any) => {
    try {
        const response = await fetch(`${BASE_URL}/todos/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskId: taskId }),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.log(error);
    }
};
const deleteCollection = async (collectionId: any) => {
    try {
        const response = await fetch(`${BASE_URL}/collections/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ collectionId: collectionId }),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.log(error);
    }
};

const TodoList = () => {
    //const { state, dispatch } = useCollectionContext();
    const queryClient = useQueryClient();
    const location = useLocation();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const collectionId = (location.state as { id: string })?.id;
    const collectionName = (location.state as { name: string })?.name;
    //const collection = state.collections.find((c) => c.id === collectionId);

    const [inputValue, setInputValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

    const [isDialogOpen, setDialogOpen] = useState(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ["todos"],
        queryFn: () => fetchTodos(userId, collectionId),
    });
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading todos</div>;

    const mutation = useMutation({
        mutationFn: addTodos,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const mutation2 = useMutation({
        mutationFn: updateTodos,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            setIsEditing(false);
            setEditingTaskId(null);
            setInputValue("");
        },
        onError: (error) => {
            console.error("Error updating todo:", error);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTodos,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onError: (error) => {
            console.error("Error deleting todo:", error);
        },
    });
    const deletecollectionMutation = useMutation({
        mutationFn: deleteCollection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["collections"] });
        },
        onError: (error) => {
            console.error("Error deleting todo:", error);
        },
    });

    // useEffect(() => {
    //     if (state.collections.length > 0) {
    //         localStorage.setItem("collections", JSON.stringify(state.collections));
    //     }
    // }, [state.collections]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleEditClick = (id: string, name: string) => {
        // Enable editing mode and set the task details for the input field
        setIsEditing(true);
        setEditingTaskId(id);
        setInputValue(name);
    };

    const handleAddTask = () => {
        if (inputValue.trim() === "" || !collectionId) return;

        if (isEditing && editingTaskId) {
            const updatedTask = {
                id: editingTaskId,
                title: inputValue,
                collectionId,
            };

            mutation2.mutate(updatedTask, {
                onSuccess: () => {
                    setIsEditing(false);
                    setEditingTaskId(null);
                    setInputValue("");
                },
            });
        } else {
            mutation.mutate(
                { title: inputValue, collectionId },
                {
                    onSuccess: () => {
                        setInputValue("");
                    },
                }
            );
        }
    };

    <Button onClick={handleAddTask} className="ml-1">
        {isEditing ? "Update" : "Add"}
    </Button>;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleAddTask();
        }
    };

    const handleDeleteTask = (taskId: string) => {
        deleteMutation.mutate(taskId);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleConfirmDelete = () => {
        deletecollectionMutation.mutate(collectionId);
        navigate(-1);
    };

    const handleCancelDelete = () => {
        setDialogOpen(false);
    };

    function handleCheckboxChange(id: any, checked: boolean): void {
        throw new Error("Function not implemented.");
    }

    // if (!collection) {
    //     return <div>Collection not found.</div>;
    // }

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
                    <h1 className="text-2xl font-semibold ml-2 self-center">{collectionName}</h1>
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
                    className={`bg-muted rounded-lg w-full outline-none border-none  ${isEditing ? "ring-2" : ""}`}
                    onChange={handleInputChange}
                />
                <Button
                    onClick={handleAddTask}
                    className="ml-1 "
                    disabled={isEditing && !editingTaskId}
                >
                    {isEditing ? "Update" : "Add"}
                </Button>
            </div>
            <ul className="mt-12 flex flex-col items-center justify-center w-full">
                {data.data.todoItems.length === 0 ? (
                    <div className="w-full h-fit flex justify-center items-center p-12">
                        <p className="text-muted-foreground">
                            No tasks available. Add a task to get started!
                        </p>
                    </div>
                ) : (
                    data.data.todoItems.map((task: any) => (
                        <li
                            key={task.id}
                            className="w-full flex items-center justify-between bg-muted p-4 mb-3 rounded-lg"
                        >
                            <div className="flex items-center">
                                <ControlledCheckbox
                                    isChecked={task.isCompleted}
                                    onCheckedChange={(checked) =>
                                        handleCheckboxChange(task.id, checked)
                                    }
                                />
                                <h2 className={`ml-3 ${task.isChecked ? "line-through" : ""}`}>
                                    {task.title}
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
