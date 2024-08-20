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

const Collections = () => {
    return (
        <div className="flex w-full flex-col">
            <div className="flex">
                <Button variant="outline">Favourites{<FcLike className="mx-2" />}</Button>

                <Button className="mx-4" variant="outline">
                    All Collections
                </Button>
            </div>
            <div className="mt-6 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 ">
                    <Card className="w-auto lg:w-[200px] hover:bg-muted transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105">
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
                    <Card className="w-auto lg:w-[200px] hover:bg-muted transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 ">
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
                    <Card className="w-auto lg:w-[200px] hover:bg-muted transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 ">
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
                    <Card className="w-auto lg:w-[200px] hover:bg-muted transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 ">
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
                    <Card className="w-auto lg:w-[200px] hover:bg-muted transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 ">
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
                    <Card className="w-auto lg:w-[200px] hover:bg-muted transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 ">
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
                    <Card className="w-auto lg:w-[200px] hover:bg-muted transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 ">
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
                    <Card className="w-auto lg:w-[200px] hover:bg-muted transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 ">
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
                    <Card className="w-auto lg:w-[200px] hover:bg-muted transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 ">
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

                    <Card className="w-auto mt-6 lg:w-[200px] border-none shadow-none flex justify-center items-center ">
                        <CardHeader></CardHeader>
                        <CardContent>
                            <ButtonIcon />
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Collections;
