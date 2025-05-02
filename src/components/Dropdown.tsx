import { DropdownProps } from "../interfaces";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Dropdown: React.FC<DropdownProps> = ({ options, selectedValue, onChange, label }) => {
    return (
        <FormControl size="small" sx={{ minWidth: 300 }}>
            <InputLabel id="platform-select-label">{label || "Compare With"}</InputLabel>
            <Select
                labelId="platform-select-label"
                id="platform-select"
                value={selectedValue}
                label={label || "Compare With"}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Dropdown;
