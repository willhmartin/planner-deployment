import React, {useState, useContext} from 'react';
import EventFinder from '../apis/EventFinder';
import { EventsContext } from "../context/EventsContext";

const AddEvent = () => {
  const {addEvents} = useContext(EventsContext);
    const [event, setEvent] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await EventFinder.post("/", {
          event,
          location,
          date
        });
        addEvents(response.data.data.event);
        console.log(response.data.data.event);
      } catch (err) {
        console.error(err.message)
      }
    }
    return (
        <div className="mb-4">
          <form action="">
              <div className="form-row">
              <div className="col">
                <input value={event} onChange={e => setEvent(e.target.value)} type="text" className="form-control" placeholder="event"/>
              </div>
              <div className="col">
                <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="location"/>
              </div>
              <div className="col">
              <input value={date} onChange={e => setDate(e.target.value)} type="date" className="form-control" placeholder="yyyy-mm-dd"/>
              </div>
              <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
              </div>
          </form>    
        </div>
    )
}

export default AddEvent;
