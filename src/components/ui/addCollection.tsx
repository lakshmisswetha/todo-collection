import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { BASE_URL } from "@/utils/config";

export function DialogDemo() {
    const queryClient = useQueryClient();
    const [collectionName, setCollectionName] = useState("");
    const [open, setOpen] = useState(false);
    //const { dispatch, state } = useCollectionContext();
    const userId = localStorage.getItem("userId");

    const handleCreateCollection = async () => {
        if (collectionName.trim() === "") return;

        const collectionNameLower = collectionName.trim().toLowerCase();

        // if (
        //     state.collections.some(
        //         (collection) => collection.title.toLowerCase() === collectionNameLower
        //     )
        // ) {
        //     alert("Collection with this name already exists!");
        //     return;
        // }
        try {
            const response = await fetch(`${BASE_URL}/collections/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: collectionName.trim(),
                    userId: Number(userId),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create collection");
            }

            //const newCollection = await response.json();
            queryClient.invalidateQueries({
                queryKey: ["collections"],
            });
            setCollectionName("");
            setOpen(false);
        } catch (error) {
            console.error(error);
            alert("There was an error creating the collection.");
        }
    };
    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            handleCreateCollection();
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary">Create new</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create new collection</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Category
                        </Label>
                        <Input id="name" onChange={(e) => setCollectionName(e.target.value)} value={collectionName} className="col-span-3" placeholder="Collection name..." onKeyDown={handleKeyDown} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleCreateCollection}>
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
