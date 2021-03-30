import React, { useState, createContext } from "react";

export const EventsContext = createContext();

export const EventsContextProvider = (props) => {
    const [events, setEvents] = useState([]);
    const [weather, setWeather] = useState([]);
    const [temp, setTemp] = useState([]);
    const [date, setDate] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const addEvents = (event) => {
        setEvents([...events, event]);
    };
    return (
        <EventsContext.Provider 
            value={{ events, setEvents, weather, setWeather, temp, setTemp, date, setDate, addEvents, selectedEvent, setSelectedEvent }}>
            {props.children}
        </EventsContext.Provider>
    );
};