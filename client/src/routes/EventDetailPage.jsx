import React, { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { EventsContext } from "../context/EventsContext";
import EventFinder from "../apis/EventFinder";
import StarRating from '../components/StarRating';
import Notes from '../components/Notes';
import AddNote from '../components/AddNote';

const EventDetailPage = () => {
    const {id} = useParams();
    const {selectedEvent, setSelectedEvent} = useContext(EventsContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EventFinder.get(`/${id}`);
                console.log(response.data.data.notes.length);
                setSelectedEvent(response.data.data);          
        } catch (err) {
            console.error(err.message)
        }
    };
        fetchData();
    }, []);

    return (
        <div>
            {selectedEvent && (
                <>
                <h1 className="text-center display-1">{selectedEvent.event.event}</h1>
                <div className="mt-3">
                    <Notes notes={selectedEvent.notes} />
                </div>
                    <AddNote />
                </>
            )}
           
        </div>
    )
}

export default EventDetailPage;