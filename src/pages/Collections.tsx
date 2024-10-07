import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MdPersonalInjury } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/config";
import { FaLaptop } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
import { MdLocalGroceryStore } from "react-icons/md";

import { DialogDemo } from "@/components/ui/addCollection";
//import { useCollectionContext } from "../contexts/collectionContext";
import { Collection } from "../contexts/types";
import { FaRegSmileBeam } from "react-icons/fa";

import { SkeletonCard } from "./SkeletonCard";

const fetchCollections = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch(`${BASE_URL}/collections/getCollections/${userId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch collections");
    }

    const data = await response.json();
    return data;
};

const Collections = () => {
    //const { state } = useCollectionContext();
    //const collections = state?.collections || [];
    const { data, isLoading, error } = useQuery({
        queryKey: ["collections"],
        queryFn: () => fetchCollections(),
    });

    if (isLoading) {
        return (
            <div className="flex gap-2 mt-10">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        );
    }
    if (error) {
        return <div>Error fetching collections: {error.message}</div>;
    }

    return (
        <div className="flex w-full flex-col">
            <div className="flex justify-between">
                <h1 className="text-2xl">All Collections</h1>
                <DialogDemo />
            </div>
            <div className="mt-6 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 ">
                    {data.collections.map((collection: Collection) => (
                        <Card collection={collection} key={collection.id} title={collection.name}>
                            <CardHeader>
                                {collection.name && collection.name.toLowerCase() === "personal" ? (
                                    <MdPersonalInjury className="text-yellow-200 text-3xl" />
                                ) : collection.name && collection.name.toLowerCase() === "work" ? (
                                    <FaLaptop className="text-blue-200 text-3xl" />
                                ) : collection.name &&
                                  collection.name.toLowerCase() === "grocery" ? (
                                    <MdLocalGroceryStore className="text-emerald-200 text-3xl" />
                                ) : collection.name &&
                                  collection.name.toLowerCase() === "fitness" ? (
                                    <FaHandHoldingHeart className="text-rose-300 text-3xl" />
                                ) : (
                                    <FaRegSmileBeam className="text-purple-200 text-3xl" />
                                )}
                            </CardHeader>

                            <CardContent>
                                <p>{collection.name}</p>
                            </CardContent>
                            <CardFooter>
                                {/* <p>
                                    {collection.todos.filter((todo) => todo.isChecked).length}/
                                    {collection.todos.length} done
                                </p> */}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collections;
