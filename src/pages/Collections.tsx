import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MdPersonalInjury } from "react-icons/md";

import { FaLaptop } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
import { MdLocalGroceryStore } from "react-icons/md";

import { DialogDemo } from "@/components/ui/addCollection";
import { useCollectionContext } from "../contexts/collectionContext";
import { Collection } from "../contexts/types";
import { FaRegSmileBeam } from "react-icons/fa";

const Collections = () => {
    const { state } = useCollectionContext();
    const collections = state?.collections || [];

    return (
        <div className="flex w-full flex-col">
            <div className="flex justify-between">
                <h1 className="text-2xl">All Collections</h1>
                <DialogDemo />
            </div>
            <div className="mt-6 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 ">
                    {collections.map((collection: Collection) => (
                        <Card collection={collection} key={collection.id} title={collection.title}>
                            <CardHeader>
                                {collection.title.toLowerCase() === "personal" ? (
                                    <MdPersonalInjury className="text-yellow-200 text-3xl" />
                                ) : collection.title.toLowerCase() === "work" ? (
                                    <FaLaptop className="text-blue-200 text-3xl" />
                                ) : collection.title.toLowerCase() === "grocery" ? (
                                    <MdLocalGroceryStore className="text-emerald-200 text-3xl" />
                                ) : collection.title.toLowerCase() === "fitness" ? (
                                    <FaHandHoldingHeart className="text-rose-300 text-3xl" />
                                ) : (
                                    <FaRegSmileBeam className="text-purple-200 text-3xl" />
                                )}
                            </CardHeader>

                            <CardContent>
                                <p>{collection.title}</p>
                            </CardContent>
                            <CardFooter>
                                <p>
                                    {collection.todos.filter((todo) => todo.isChecked).length}/
                                    {collection.todos.length} done
                                </p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collections;
