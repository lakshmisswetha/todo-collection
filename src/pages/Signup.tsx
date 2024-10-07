import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/config";
import {
    Form,
    FormField,
    FormDescription,
    FormItem,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

function Signup() {
    const form = useForm();
    const navigate = useNavigate();

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const values = form.getValues();

        try {
            const response = await fetch(`${BASE_URL}/users/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const result = await response.json();
            if (result.status) {
                localStorage.setItem("userId", result.user.id);
                navigate("/collections");
            } else {
                console.log("Signup failed", result);
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="w-full bg-muted flex justify-center p-6 rounded-lg">
            <div className="w-[420px]">
                <form action="" onSubmit={handleSignup}>
                    <Form {...form}>
                        <div className="flex justify-center items-center w-full">
                            <h1 className="text-3xl font-semibold ">Create Your Account</h1>
                        </div>

                        <Button className="my-8 py-6 w-full rounded-lg " variant={"default"}>
                            <span className="mr-2 text-2xl">
                                <FcGoogle />
                            </span>
                            Continue with google
                        </Button>
                        <div className="flex w-full justify-center items-center">
                            <h1 className="mt-4 font-bold">OR</h1>
                        </div>

                        <div className="w"></div>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl className="mt-5">
                                        <Input
                                            className="mt-6 "
                                            placeholder="Username"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="mt-5" placeholder="Email" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="mt-5 mb-11"
                                            placeholder="Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <Button className="w-full rounded-lg py-6">Sign Up</Button>
                                    <FormDescription className="text-base ">
                                        Already have an account?
                                        <span
                                            onClick={() => navigate("/login")}
                                            className="font-bold cursor-pointer"
                                        >
                                            {" "}
                                            Login
                                        </span>
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                    </Form>
                </form>
            </div>
        </div>
    );
}

export default Signup;
