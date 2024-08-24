import { Checkbox } from "./checkbox";

type ControlledCheckboxProps = {
    isChecked: boolean;
    onCheckedChange: (checked: boolean) => void;
};

const ControlledCheckbox = ({ isChecked, onCheckedChange }: ControlledCheckboxProps) => {
    return <Checkbox checked={isChecked} onCheckedChange={onCheckedChange} />;
};

export default ControlledCheckbox;
