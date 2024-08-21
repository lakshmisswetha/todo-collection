import { Button } from "@/components/ui/button";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MdPersonalInjury } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { FaLaptop } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { MdLocalGroceryStore } from "react-icons/md";
import { RadialChart } from "@/components/ui/ProgressBar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDemo } from "@/components/ui/addCollection";
const Collections = () => {
    return (
        <div className="flex w-full flex-col">
            <div className="flex">
                <Button variant="outline">Favourites{<FcLike className="mx-2" />}</Button>

                <Button className="mx-4" variant="outline">
                    All Collections
                </Button>
                <DialogDemo />
            </div>
            <div className="mt-6 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 ">
                    <Card title="Personal">
                        <CardHeader>
                            <MdPersonalInjury className="text-yellow-200 text-3xl" />
                        </CardHeader>
                        <CardContent>
                            <p>Personal</p>
                        </CardContent>
                        <CardFooter>
                            <p>2/4 done</p>
                        </CardFooter>
                    </Card>
                    <Card title="Work">
                        <CardHeader>
                            <FaLaptop className="text-blue-200 text-3xl" />
                        </CardHeader>
                        <CardContent>
                            <p>Work</p>
                        </CardContent>
                        <CardFooter>
                            <p>3/4 done</p>
                        </CardFooter>
                    </Card>

                    <Card title="Fitness">
                        <CardHeader>
                            <FaHandHoldingHeart className="text-rose-300 text-3xl" />
                        </CardHeader>
                        <CardContent>
                            <p>Fitness</p>
                        </CardContent>
                        <CardFooter>
                            <p>2/4 done</p>
                        </CardFooter>
                    </Card>
                    <Card title="Grocery">
                        <CardHeader>
                            <MdLocalGroceryStore className="text-emerald-200 text-3xl" />
                        </CardHeader>
                        <CardContent>
                            <p>Grocery</p>
                        </CardContent>
                        <CardFooter>
                            <p>2/4 done</p>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <MdLocalGroceryStore className="text-rose-300 text-3xl" />
                        </CardHeader>
                        <CardContent>
                            <p>Grocery</p>
                        </CardContent>
                        <CardFooter>
                            <p>2/4 done</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Collections;
