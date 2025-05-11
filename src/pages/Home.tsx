import {
    Email as EmailIcon,
    LinkedIn as LinkedInIcon,
    MiscellaneousServices as MiscControls
} from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import React, {
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

import Dropdown from "../components/Dropdown";
import Data from "../data/dropdownOptions";
import { enums } from "../types/enums";

const HomePage: React.FC = () => {
    const [copied, setCopied] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [isModified, setIsModified] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState<"reset" | "messageBody">("reset");

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [messageOptions, setMessageOptions] = useState(Data.dropDownListLinkedIn);
    const [selectedMessageType, setSelectedMessageType] = useState(messageOptions[0].value);
    const [previousSelectedMessageType, setPreviousSelectedMessageType] = useState<string | null>(null);

    const initialReplacement =
        Data.replacementKeywords.connection_request?.[0]?.value || "";

    const [replacementOptions, setReplacementOptions] = useState(
        Data.replacementKeywords.connection_request || []
    );
    const [selectedReplacementKeyword, setSelectedReplacementKeyword] = useState(initialReplacement);

    const [messageContext, setMessageContext] = useState(messageOptions[0].message);

    const [isOtherOptions, setIsOtherOptions] = useState<boolean>(true);

    // Helpers
    const fetchMessageBody = useCallback((value: string): string => {
        const allOptions = [...Data.dropDownListLinkedIn, ...Data.dropDownListEmail, ...Data.dropDownListOthers];
        return allOptions.find(item => item.value === value)?.message || "";
    }, []);

    const autoResize = useCallback(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, []);

    const updateLocalStorage = useCallback((key: string, value: string) => {
        localStorage.setItem(key, value);
    }, []);

    // Actions
    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(messageContext);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Copy failed", err);
        }
    }, [messageContext]);

    const handleReplace = () => {
        if (!searchText.trim()) return;

        const escaped = selectedReplacementKeyword.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
        const regex = new RegExp(escaped, "g");
        const updated = messageContext.replace(regex, searchText);

        setSearchText("");
        setMessageContext(updated);
        updateLocalStorage(enums.LOCAL_CONTEXT_KEY, updated);
        setIsModified(true);
    };

    const performReset = () => {
        const defaultText = fetchMessageBody(selectedMessageType);
        setMessageContext(defaultText);
        setSearchText("");
        updateLocalStorage(enums.LOCAL_CONTEXT_KEY, defaultText);
        updateLocalStorage(enums.LOCAL_SELECTED_KEY, selectedMessageType);
        setIsModified(false);
    };

    const handleReset = () => {
        if (!isModified) {
            performReset();
        } else {
            setDialogType("reset");
            setOpenDialog(true);
        }
    };

    const confirmDialogChange = () => {
        if (dialogType === "messageBody" && previousSelectedMessageType) {
            const newText = fetchMessageBody(previousSelectedMessageType);
            setSelectedMessageType(previousSelectedMessageType);
            setMessageContext(newText);
            updateLocalStorage(enums.LOCAL_CONTEXT_KEY, newText);
            updateLocalStorage(enums.LOCAL_SELECTED_KEY, previousSelectedMessageType);
        } else if (dialogType === "reset") {
            performReset();
        }

        setIsModified(false);
        setPreviousSelectedMessageType(null);
    };

    const handleDialogClose = (confirm: boolean) => {
        setOpenDialog(false);
        if (confirm) confirmDialogChange();
    };

    const handlePlatformChange = (
        options: typeof Data.dropDownListEmail | typeof Data.dropDownListLinkedIn | typeof Data.dropDownListOthers
    ) => {
        setMessageOptions(options);

        const isOthers = options === Data.dropDownListOthers;
        setIsOtherOptions(!isOthers);

        const defaultType = options[0].value;

        setDialogType("messageBody");

        if (!isModified) {
            setSelectedMessageType(defaultType);

            if (isOthers) {
                setReplacementOptions([]);
                setSelectedReplacementKeyword("");
            } else {
                setReplacementOptions(Data.replacementKeywords[defaultType as keyof typeof Data.replacementKeywords]);
                setSelectedReplacementKeyword(Data.replacementKeywords[defaultType as keyof typeof Data.replacementKeywords][0].value);
            }

            return;
        }

        setPreviousSelectedMessageType(defaultType);
        setOpenDialog(true);
    };


    const handleMessageTypeChange = (newType: string) => {
        setDialogType("messageBody");

        if (!isOtherOptions) {
            setSelectedMessageType(newType);
            return;
        }

        if (!isModified) {
            setSelectedMessageType(newType);
            const keywords = Data.replacementKeywords[newType as keyof typeof Data.replacementKeywords];
            setReplacementOptions(keywords);
            setSelectedReplacementKeyword(keywords[0].value);
            return;
        }

        setPreviousSelectedMessageType(newType);
        setOpenDialog(true);
    };


    // Load saved context
    useEffect(() => {
        const savedType = localStorage.getItem(enums.LOCAL_SELECTED_KEY);
        const savedContext = localStorage.getItem(enums.LOCAL_CONTEXT_KEY);

        const typeToLoad = savedType || selectedMessageType;
        const contextToLoad = savedContext || fetchMessageBody(typeToLoad);

        setSelectedMessageType(typeToLoad);
        setMessageContext(contextToLoad);
        updateLocalStorage(enums.LOCAL_CONTEXT_KEY, contextToLoad);
        updateLocalStorage(enums.LOCAL_SELECTED_KEY, typeToLoad);
    }, []);

    useEffect(() => {
        setMessageContext(fetchMessageBody(selectedMessageType));

        updateLocalStorage(enums.LOCAL_CONTEXT_KEY, fetchMessageBody(selectedMessageType));
        updateLocalStorage(enums.LOCAL_SELECTED_KEY, selectedMessageType);
    }, [selectedMessageType]);

    useEffect(() => {
        autoResize();
    }, [messageContext]);

    return (
        <Box p={{ xs: 2, sm: 3, md: 4 }}>
            {/* Icons */}
            <Box
                display="flex"
                justifyContent="center"
                mb={3}
                gap={2}
                flexWrap="wrap"
            >
                <IconButton onClick={() => handlePlatformChange(Data.dropDownListLinkedIn)} color="primary">
                    <LinkedInIcon fontSize="large" />
                </IconButton>
                <IconButton onClick={() => handlePlatformChange(Data.dropDownListEmail)} color="error">
                    <EmailIcon fontSize="large" />
                </IconButton>
                <IconButton onClick={() => handlePlatformChange(Data.dropDownListOthers)}>
                    <MiscControls fontSize="large" />
                </IconButton>
            </Box>

            {/* Controls */}
            <Box
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                alignItems={{ xs: 'stretch', md: 'flex-end' }}
                gap={2}
                mb={2}
                position="relative"
            >
                <Dropdown
                    label="Message Body"
                    options={messageOptions}
                    selectedValue={selectedMessageType}
                    onChange={handleMessageTypeChange}
                />

                {isOtherOptions &&
                    <>
                        <Dropdown
                            label="Replacement Words"
                            options={replacementOptions}
                            selectedValue={selectedReplacementKeyword}
                            onChange={(val) => setSelectedReplacementKeyword(val)}
                        />

                        <TextField
                            size="small"
                            placeholder="Replace with word..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            fullWidth
                        />

                        <Button
                            variant="contained"
                            color="inherit"
                            onClick={handleReplace}
                            fullWidth={true}
                        >
                            Replace
                        </Button>
                    </>
                }
                <Button
                    variant="contained"
                    color={copied ? "success" : "secondary"}
                    onClick={handleCopy}
                    className={`${!isOtherOptions ? "w-28" : "w-full"}`}
                >
                    {copied ? "Copied!" : "Copy"}
                </Button>

                {!isOtherOptions &&
                    <>
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={
                                () => { window.open(import.meta.env.VITE_RESUME_LINK!, "_blank", "noopener,noreferrer") }
                            }
                            sx={{ textTransform: "none" }}
                        >
                            <strong>Resume</strong>
                        </Button>

                        <Button
                            variant="outlined"
                            color="success"
                            onClick={
                                () => { window.open(import.meta.env.VITE_CV_LINK!, "_blank", "noopener,noreferrer") }
                            }
                            sx={{ textTransform: "none" }}
                        >
                            <strong>Curriculum Vitae</strong>
                        </Button>

                    </>
                }
            </Box>

            {/* TextArea */}
            <TextField
                multiline
                fullWidth
                inputRef={textareaRef}
                rows={6}
                value={messageContext}
                onChange={(e) => {
                    setIsModified(true);
                    setMessageContext(e.target.value);
                    updateLocalStorage(enums.LOCAL_CONTEXT_KEY, e.target.value);
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

            {/* Reset */}
            <Box display="flex" justifyContent="center" mt={3}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleReset}
                >
                    Reset
                </Button>
            </Box>

            {/* Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="xs">
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
                    <Button onClick={() => handleDialogClose(false)} color="primary">Cancel</Button>
                    <Button onClick={() => handleDialogClose(true)} color="secondary">
                        {dialogType === "reset" ? "Reset" : "Change"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );

};

export default HomePage;
