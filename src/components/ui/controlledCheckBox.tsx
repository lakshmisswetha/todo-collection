import { Checkbox } from "./checkbox";

type ControlledCheckboxProps = {
    isChecked: boolean;
    onCheckedChange: (checked: boolean) => void;
};

const ControlledCheckbox = ({ isChecked, onCheckedChange }: ControlledCheckboxProps) => {
    const checkboxClassName = isChecked
        ? "line-through" // Style for when checked
        : ""; // Style for when unchecked
    return (
        <Checkbox
            checked={isChecked}
            onCheckedChange={onCheckedChange}
            className={checkboxClassName}
        />
    );
};

export default ControlledCheckbox;
