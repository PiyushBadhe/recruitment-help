export interface Option {
    value: string;
    label: string;
}

export interface DropdownProps {
    options: Option[];
    selectedValue: string;
    onChange: (value: string) => void;
    label: string;
}