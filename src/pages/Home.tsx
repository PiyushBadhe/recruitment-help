import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Dropdown from "../components/Dropdown";
import { emailOptions, linkedInOptions, replacementKeywords } from "../data/dropdownOptions";
import { enums } from "../types/enums";

const HomePage: React.FC = () => {
    const [copied, setCopied] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [isModified, setIsModified] = useState<boolean>();
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState<"reset" | "messageBody">("reset");

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [messageTypeDropdownOptions, setMessageTypeDropdownOptions] = useState(linkedInOptions);

    const [messageContext, setMessageContext] = useState(messageTypeDropdownOptions[0].message);

    const [previousSelectedMessageType, setPreviousSelectedMessageType] = useState<string | null>(null);

    const [selectedMessageType, setSelectedMessageType] = useState(messageTypeDropdownOptions[0].value);
    const [selectedReplacementKeyword, setSelectedReplacementKeyword] =
        useState(replacementKeywords.connection_request[0].value);
    const [replacementDropdownOptions, setReplacementDropdownOptions] =
        useState(replacementKeywords.connection_request);

    const fetchMessageBody = (value: string) => {
        const found = [...linkedInOptions, ...emailOptions].find((item) => item.value === value);
        return found ? `${found.message}` : "";
    };

    const autoResize = useCallback(() => {
        const el = textareaRef.current;
        if (el) {
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
        }
    }, []);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(messageContext);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    }, [messageContext]);

    const handleReplace = useCallback(() => {
        if (!searchText.trim()) return;

        const updatedContext = messageContext.replaceAll(
            new RegExp(`\\b${selectedMessageType}\\b`, "gi"),
            searchText
        );
        setMessageContext(updatedContext);
        localStorage.setItem(enums.LOCAL_CONTEXT_KEY, updatedContext);
    }, [messageContext, searchText, selectedMessageType]);

    const handleDropdown1Change = (newSelected: string) => {
        setDialogType("messageBody");
        if (!isModified) {
            setSelectedMessageType(newSelected);

            setReplacementDropdownOptions(replacementKeywords[newSelected as keyof typeof replacementKeywords]);
            return;
        }

        setPreviousSelectedMessageType(newSelected);
        setOpenDialog(true);
    };

    const handleDropdown2Change = (newValue: string) => {
        setSelectedReplacementKeyword(newValue);
    }

    const handleReset = () => {
        if (!isModified) { performReset(); return; }
        setDialogType("reset");
        setOpenDialog(true);
    };

    const performReset = () => {
        const defaultText = fetchMessageBody(selectedMessageType);
        setSearchText("");
        setMessageContext(defaultText);
        updateContext(enums.LOCAL_SELECTED_KEY, selectedMessageType);
        updateContext(enums.LOCAL_CONTEXT_KEY, defaultText);
        setIsModified(false);
    };

    const handleDialogClose = (shouldReset: boolean) => {
        setOpenDialog(false);

        if (shouldReset) {
            if (dialogType === "messageBody" && previousSelectedMessageType) {
                const newText = fetchMessageBody(previousSelectedMessageType);
                setSelectedMessageType(previousSelectedMessageType);
                setMessageContext(newText);
                updateContext(enums.LOCAL_CONTEXT_KEY, newText);
                updateLocalStorage(enums.LOCAL_SELECTED_KEY, previousSelectedMessageType);
                return;
            }
            if (dialogType === "reset") {
                performReset();
            }

            setIsModified(false);
        }

        setPreviousSelectedMessageType(null);
    };

    const updateContext = useCallback((key: string, value: string) => {
        localStorage.setItem(key, value);
    }, []);

    const updateLocalStorage = useCallback((key: string, value: string) => {
        localStorage.setItem(key, value);
    }, []);

    useEffect(() => {
        const savedSelected = localStorage.getItem(enums.LOCAL_SELECTED_KEY);
        const savedContext = localStorage.getItem(enums.LOCAL_CONTEXT_KEY);

        if (savedSelected) {
            setSelectedMessageType(savedSelected);
        }

        if (savedContext) {
            setMessageContext(savedContext);
        } else {
            const initialValue = savedSelected || selectedMessageType;
            const newText = fetchMessageBody(initialValue);
            setMessageContext(newText);
            updateContext(enums.LOCAL_CONTEXT_KEY, newText);
            updateLocalStorage(enums.LOCAL_SELECTED_KEY, initialValue);
        }
    }, []);

    useEffect(() => {
        setMessageContext(fetchMessageBody(selectedMessageType));

        updateContext(enums.LOCAL_CONTEXT_KEY, fetchMessageBody(selectedMessageType));
        updateLocalStorage(enums.LOCAL_SELECTED_KEY, selectedMessageType);
    }, [selectedMessageType]);

    useEffect(() => {
        autoResize();
    }, [messageContext]);

    return (
        <Box p={4}>
            {/* Icon Buttons Row */}
            <Box display="flex" justifyContent="center" mb={3} gap={4}>
                <IconButton
                    onClick={() => {
                        setMessageTypeDropdownOptions(linkedInOptions);
                        setSelectedMessageType(linkedInOptions[0].value);
                    }}
                    aria-label="LinkedIn message options"
                    color="primary"
                >
                    <LinkedInIcon fontSize="large" />
                </IconButton>

                <IconButton
                    onClick={() => {
                        setMessageTypeDropdownOptions(emailOptions);
                        setSelectedMessageType(emailOptions[0].value);
                    }}
                    aria-label="Email message options"
                    sx={{ color: "red" }}
                >
                    <EmailIcon fontSize="large" />
                </IconButton>
            </Box>

            {/* Dropdown and Actions */}
            <Box display="flex" justifyContent="center" alignItems="flex-end" gap={4} mb={2} position="relative">
                {/* Dropdown */}
                <Dropdown
                    label="Message Body"
                    options={messageTypeDropdownOptions}
                    selectedValue={selectedMessageType}
                    onChange={handleDropdown1Change}
                />

                <Dropdown
                    label="Replacement Words"
                    options={replacementDropdownOptions}
                    selectedValue={selectedReplacementKeyword}
                    onChange={handleDropdown2Change}
                />

                {/* Search + Replace Section */}
                <Box display="flex" flexDirection="column">
                    <Typography variant="body2" color="textSecondary" mb={0.5}>
                        Replace word
                    </Typography>
                    <Box display="flex" gap={1}>
                        <TextField
                            size="small"
                            placeholder="Replace with word..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            variant="outlined"
                        />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleReplace}
                            aria-label="Replace the key with the value"
                        >
                            Replace
                        </Button>
                    </Box>
                </Box>

                {/* Copy Button */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCopy}
                    aria-label="Copy text to clipboard"
                    title="Copy text to clipboard"
                    sx={{
                        position: "absolute",
                        right: 0,
                        top: 8,
                        boxShadow: 2,
                    }}
                >
                    {copied ? "Copied!" : "Copy to Clipboard"}
                </Button>
            </Box>

            {/* Editable TextArea */}
            <TextField
                multiline
                fullWidth
                inputRef={textareaRef}
                rows={6}
                value={messageContext}
                onChange={(e) => {
                    setIsModified(true);
                    setMessageContext(e.target.value);
                    updateContext(enums.LOCAL_CONTEXT_KEY, e.target.value);
                }}
                placeholder="Type or auto-generated text will appear here..."
                variant="outlined"
                sx={{
                    mt: 2,
                    '& .MuiOutlinedInput-root': {
                        alignItems: 'flex-start',
                    }
                }}
            />

            {/* Reset Button */}
            <Box display="flex" justifyContent="center" mt={3}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleReset}
                    aria-label="Reset message body to default"
                >
                    Reset
                </Button>
            </Box>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>
                    {dialogType === "reset" ? "Confirm Reset" : "Confirm Platform Change"}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {dialogType === "reset"
                            ? "You have unsaved changes. Do you want to overwrite them with the default message body?"
                            : "You have unsaved changes. Do you want to change the platform and overwrite them?"}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleDialogClose(true)} color="secondary">
                        {dialogType === "reset" ? "Reset" : "Change"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default HomePage;
