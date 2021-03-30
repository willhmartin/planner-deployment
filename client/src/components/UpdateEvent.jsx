import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { EventsContext } from "../context/EventsContext";
import EventFinder from "../apis/EventFinder";

const UpdateEvent = (props) => {
    const {id} = useParams();
    let history = useHistory();
    const {events} = useContext(EventsContext);
    const [event, setEvent] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");

      useEffect(() => {
          const fetchData = async () => {
              const response = await EventFinder.get(`/${id}`);
              const event = response.data.data.event;
              setEvent(event.event);
              setLocation(event.location);
              setDate(event.date);
          };
          fetchData();
      }, []);

      const handleSubmit = async (e) => {
          e.preventDefault()
          try {
             const updatedEvent = await EventFinder.put(`/${id}`, {
                event,
                location,
                date: date
             });
             history.push("/");
             console.log(updatedEvent); 
          } catch (err) {
              console.error(err.message)
          }
      }

    return (
            <div>
                <form action="">
                    <div className="form-group">
                        <label htmlFor="event">Event</label>
                        <input value={event} onChange={(e) => setEvent(e.target.value)} id="event" className="form-control" type="text"/>
                    </div>
                    <div>
                        <label htmlFor="location">Location</label>
                        <input value={location} onChange={(e) => setLocation(e.target.value)} id="location" className="form-control" type="text"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input value={date} onChange={(e) => setDate(e.target.value)} id="date" className="form-control" type="date"/>
                    </div>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary mt-2">Submit</button>
                </form>
           </div>
    )
}

export default UpdateEvent;
