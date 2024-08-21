import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkBox";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const TodoList = () => {
    const [tasks, setTasks] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleAddTask = () => {
        if (inputValue.trim()) {
            setTasks([...tasks, inputValue.trim()]);
            setInputValue("");
        }
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleAddTask();
        }
    };
    const handleDeleteTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index)); // Remove task at the specified index
    };
    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };
    const title = (location.state as { title?: string })?.title || "Default Title";

    return (
        <div>
            <h1 className="text-2xl mb-4 ml-1 font-bold">{title}</h1>
            <div className="flex mt-6">
                <div
                    onClick={handleBackClick}
                    className="flex justify-center items-center mr-10 cursor-pointer"
                >
                    <MdOutlineArrowBackIosNew className="text-2xl" />
                </div>

                <Input
                    value={inputValue}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a new Task..."
                    className="bg-muted rounded-lg border-muted w-[300px] "
                    onChange={handleInputChange}
                />
                <Button onClick={handleAddTask}>Add</Button>
            </div>
            <ul className="mt-12 flex flex-col items-center justify-center">
                {tasks.length === 0 ? (
                    <div className="w-full h-fit flex justify-center items-center p-12">
                        <p className="text-muted-foreground ">
                            No tasks available. Add a task to get started!
                        </p>
                    </div>
                ) : (
                    tasks.map((task, index) => (
                        <li
                            key={index}
                            className="w-full flex items-center justify-between bg-muted p-4 mb-1"
                        >
                            <div className="flex items-center">
                                <Checkbox />
                                <h2 className="ml-3">{task}</h2>
                            </div>
                            <div className="flex items-center">
                                <MdDelete
                                    className="text-xl hover:text-red-400 cursor-pointer mr-2"
                                    onClick={() => handleDeleteTask(index)}
                                />
                                <MdModeEdit className="text-xl cursor-pointer hover:text-blue-400" />
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default TodoList;
