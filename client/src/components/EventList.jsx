import React, {useContext, useEffect } from 'react';
import EventFinder from '../apis/EventFinder';
import { EventsContext } from "../context/EventsContext";
import { useHistory } from "react-router-dom";

const EventList = () => {
        console.log("Fetching events");
        const {events, setEvents, weather, setWeather, temp, setTemp, date, setDate} = useContext(EventsContext);
        let history = useHistory();
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await EventFinder.get("/");
            setEvents(response.data.data.events);
            setWeather(response.data.data.weather[0]);
            setTemp(response.data.data.temp);
            setDate(response.data.data.date)
            console.log(response.data.data.weather[0]);
          } catch (err) {
            console.error(err.message)
          }
        };
        fetchData();
        console.log(temp);
      }, [])

      const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
          const response = await EventFinder.delete(`/${id}`);
          setEvents(events.filter(event => {
            return event.id !== id
          }))
        } catch (err) {
          console.error(err.message)
        }
      };

      const handleUpdate = async (e, id) => {
        e.stopPropagation();
        history.push(`/events/${id}/update`);
      };

      const handleEventSelect = (id) => {
        history.push(`/events/${id}`)
      };

      const tempInF = 1.8 * (temp.temp - 273) + 32;
      // 1.8(K - 273) + 32
      const iconUrl = `http://openweathermap.org/img/w/${weather.icon}.png`;
      console.log(iconUrl);
    return (
        <div >
          
          <table>
          <tbody>
            <tr className="bg-info text-white">
              <td>{Math.floor(tempInF)}°F</td>
              <td><img src={iconUrl} /></td>
            </tr>
            </tbody>
          </table>
          <table className=" table table-hover table-dark">
          {/* {weather && weather.map((weather) => {
                  return (
                    <tr>
                    <td>{weather.main}</td>
                    <td>{weather.description}</td>
                    <tr>{temp.temp}°F</tr>
                     <td><image src={'http://openweathermap.org/img/w/01n.png'}></image></td> 
                    <td><img src="http://openweathermap.org/img/w/01n.png" alt="icon"/></td>
                  </tr>
                  )
                }
              )} */}
            <thead>
              <tr className="bg-dark">
                <th scope="col">Event</th>
                <th scope="col">Location</th>
                <th scope="col">Date</th>
                <th scope="col">Notes</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>  
              <tbody>
              
               {/* {temp && temp.map((temp) => {
                  return (
                    <tr>
                    <td>{temp.temp}</td>
                    <td><image src='http://openweathermap.org/img/w/01n.png'></image></td>
                  </tr>
                  )
                }
              )} */}
              
                {events && events.map((event) => {
                  return (
                    <tr onClick={() => handleEventSelect(event.id)} key={event.id} className="bg-secondary">
                    <td>{event.event}</td>
                    <td>{event.location}</td>
                    <td>{event.date.split("T")[0]}</td>
                    <td>({event.count > 0 ? event.count : "0"})</td>
                    <td><button onClick={(e) => handleUpdate(e, event.id)} className="btn btn-warning">Update</button></td>
                    <td><button onClick={(e) => handleDelete(e, event.id)} className="btn btn-danger">Delete</button></td>
                  </tr>
                  )
                }
              )}
                {/* <tr>
                  <td>Wendy's</td>
                  <td>New York</td>
                  <td>$$$</td>
                  <td>Rating</td>
                  <td><button className="btn btn-warning">Edit</button></td>
                  <td><button className="btn btn-danger">Delete</button></td>
                </tr>
                <tr>
                  <td>Wendy's</td>
                  <td>New York</td>
                  <td>$$$</td>
                  <td>Rating</td>
                  <td><button className="btn btn-warning">Edit</button></td>
                  <td><button className="btn btn-danger">Delete</button></td>
                </tr> */}
              </tbody>  
          </table> 
        </div>
    )
}

export default EventList;
