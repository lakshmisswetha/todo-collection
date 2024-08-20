import { FaPlus } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

export function ButtonIcon() {
    return (
        <Button variant="secondary" className="rounded-full w-16 h-16 text-3xl">
            <FaPlus className="h-4 w-4" />
        </Button>
    );
}
