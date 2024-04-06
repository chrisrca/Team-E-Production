/* eslint-disable */
import {Grid, Typography, SelectChangeEvent, Box} from "@mui/material";
import {LeftAlignedTextbox} from "./textBox.tsx";
import {ChangeEvent, useState} from "react";
import RadioButtonsGroup from "./assets/radioButton.tsx";
import {DropDown} from "./dropDown.tsx";
import {formSubmission} from "./submission.ts";
import {SubmitButton} from "./submit.tsx";

function GiftService() {

    const [form, setFormResponses] = useState<formSubmission>({
        name: "",
        location: "",
        priority: "",
        size: "",
        words: "",
        status: "",
    });

    function handleNameInput(e: ChangeEvent<HTMLInputElement>){
        setFormResponses({...form, name: e.target.value});
    }

    function handleLocationInput(e: ChangeEvent<HTMLInputElement>){
        setFormResponses({...form, location: e.target.value});
    }

    function handlePriorityInput(e: ChangeEvent<HTMLInputElement>){
        setFormResponses({...form, priority: e.target.value});
    }

    function handleServiceInput(e: SelectChangeEvent){
        setFormResponses({...form, size: e.target.value});
        return e.target.value;
    }

    function handleStatusInput(e: ChangeEvent<HTMLInputElement>){
        setFormResponses({...form, status: e.target.value});
    }

    function handleFrequencyInput(e: SelectChangeEvent){
        setFormResponses({...form, words: e.target.value});
        return e.target.value;
    }

    function clear(){
        setFormResponses({
            name: "",
            location: "",
            priority: "",
            size: "",
            words: "",
            status: "",
        });
    }


    return (
        <Box
            sx={{
                width: "100vw",
                height: "auto",
                display: "flex",
                justifyContent: "center",
                backgroundSize: "cover",
            }}
        >
            <Grid
                container
                direction={"row"}
                rowSpacing={1}
                columnSpacing={3}
                justifyContent={"space-between"}
                boxShadow={4}
                sx={{
                    backgroundColor: "white",
                    width: "100%",
                    maxWidth: "80vw",
                    height: "auto",
                }}
            >
                <Grid item
                      xs={12}
                      sx={{
                          backgroundColor: "#6d9fcd",
                      }}>
                    <Typography color={"#012d5a"}
                                align={"center"}
                                fontStyle={"Open Sans"}
                                fontSize={40}
                    >
                        Gift Delivery Service
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography color={"black"}>
                        Name:
                    </Typography>
                    <LeftAlignedTextbox label={"Name"}
                                        value={form.name}
                                        onChange={handleNameInput}/>
                </Grid>
                <Grid item xs={6}>
                    <Typography color={"black"}>
                        Location:
                    </Typography>
                    <LeftAlignedTextbox label={"Location"}
                                        value={form.location}
                                        onChange={handleLocationInput}/>
                </Grid>
                <Grid item xs={6}>
                    <Typography color={"black"}>
                        Warm words:
                    </Typography>
                    <DropDown items={["Feel better soon", "Sending love and hugs", "I'm here for you always", "Have a speedy recovery"]}
                              handleChange={handleFrequencyInput}
                              label={"Words"}
                              returnData={form.words}/>

                </Grid>
                <Grid item xs={6}>
                    <Typography color={"black"}>
                        Gift Size:
                    </Typography>
                    <DropDown items={["Small", "Medium", "Large", "Gigantic", "Impossible To Deliver"]}
                              handleChange={handleServiceInput}
                              label={"Size"}
                              returnData={form.size}/>

                </Grid>
                <Grid item xs={6}>
                    <Typography color={"black"}>
                        Priority:
                    </Typography>
                    <RadioButtonsGroup label={"Priority"}
                                       options={["Low", "Medium", "High", "Emergency"]}
                                       returnData={form.priority}
                                       handleChange={handlePriorityInput}/>

                </Grid>
                <Grid item xs={6}>
                    <Typography color={"black"}>
                        Status:
                    </Typography>
                    <RadioButtonsGroup label={"Status"}
                                       options={["Unassigned", "Assigned", "InProgress", "Closed"]}
                                       returnData={form.status}
                                       handleChange={handleStatusInput}/>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", my: 2, justifyContent: "center" }}>
                    <SubmitButton input={form} text={"SUBMIT"} clear={clear}/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default GiftService;
