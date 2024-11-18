import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useStyles from "./styles";

const Ride = ({onLocationUpdate}) => {
    const classes = useStyles();

    // State to track input values
    const [pickupLocation, setPickupLocation] = useState("");
    const [dropoffLocation, setDropoffLocation] = useState("");
    const [stops, setStops] = useState([]); // Track additional stop fields

    // Check if all fields are filled
    const isSearchEnabled =
        pickupLocation.trim() !== "" && dropoffLocation.trim() !== "" && stops.every((stop) => stop.trim() !== "");

    const handleAddStop = () => {
        if (stops.length < 5) {
            setStops([...stops, ""]); // Add an empty stop if limit not reached
        } 
    };

    const handleStopChange = (index, value) => {
        // Update the specific stop's value
        const updatedStops = [...stops];
        updatedStops[index] = value;
        setStops(updatedStops);
    };

    const handleRemoveStop = (index) => {
        // Remove the specific stop from the array
        const updatedStops = stops.filter((_, i) => i !== index);
        setStops(updatedStops);
    };

    const handleRideNow = () => {
        console.log("Ride now clicked");
    };

    const handleSearch = () => {
        const trip =[
            pickupLocation,
            ...stops.filter((stop) => stop.trim() !== ""),
            dropoffLocation,
        ]
        onLocationUpdate(trip);

    };

    return (
        <div className={classes.container}>
            <h1>Get a ride</h1>
            <TextField
                id="pickup-location"
                label="Pickup Location"
                variant="filled"
                className={classes.textbar}
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)} // Update state
            />
            {/* Render dynamically added stop fields */}
            {stops.map((stop, index) => (
            <TextField
                    key={`stop-${index}`}
                    id={`stop-${index}`}
                    label="Add a stop"
                    variant="filled"
                    className={classes.textbar}
                    value={stop}
                    onChange={(e) => handleStopChange(index, e.target.value)} // Update specific stop
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleRemoveStop(index)} className={classes.deleteButton}>
                                    <DeleteIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            ))}
            <TextField
                id="dropoff-location"
                label="Dropoff Location"
                variant="filled"
                className={classes.textbar}
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)} // Update state
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleAddStop}>
                                <AddIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
             <Button
                className={classes.button}
                onClick={handleSearch}
                disableElevation
                disabled={!isSearchEnabled} // Disable button if fields are empty
            >
                Search
            </Button>
            <Button
                className={classes.button}
                onClick={handleRideNow}
                disableElevation
            >
                Ride Now
            </Button>
           
        </div>
    );
};

export default Ride;
