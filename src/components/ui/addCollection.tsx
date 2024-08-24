import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useCollectionContext } from "@/contexts/collectionContext";

import { ActionType } from "../../contexts/types";

export function DialogDemo() {
    const [collectionName, setCollectionName] = useState("");
    const [open, setOpen] = useState(false);
    const { dispatch, state } = useCollectionContext();

    const handleCreateCollection = () => {
        if (collectionName.trim() === "") return;

        const collectionNameLower = collectionName.trim().toLowerCase();

        // Check if collection name already exists
        if (
            state.collections.some(
                (collection) => collection.title.toLowerCase() === collectionNameLower
            )
        ) {
            alert("Collection with this name already exists!");
            return;
        }

        dispatch({
            type: ActionType.CREATE_COLLECTION,
            payload: {
                title: collectionName.trim(),
            },
        });

        setCollectionName("");
        setOpen(false);
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
                        <Input
                            id="name"
                            onChange={(e) => setCollectionName(e.target.value)}
                            value={collectionName}
                            className="col-span-3"
                            placeholder="Collection name..."
                        />
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
