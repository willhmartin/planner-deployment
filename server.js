require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const axios = require('axios');
// const { express } = require("express");
const request = require('request');

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
  
    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const apiKey = process.env.OPENWEATHERKEY
// Get all restaurants
app.get("/api/v1/events", async (req, res) => {
  console.log("fetching events");
    try {
        const api_url = `http://api.openweathermap.org/data/2.5/weather?q=los%20angeles&appid=${apiKey}`; 
        const events = await db.query("SELECT * FROM events");
        const eventNotesData = await db.query("SELECT * FROM events LEFT JOIN (select event_id, COUNT(*) FROM notes GROUP BY event_id) notes on events.id = notes.event_id;");
        const axios_response = await axios.get(api_url);
        console.log("weather", axios_response.data.weather);
        console.log("hello");
        // console.log(json);
        console.log("events", events);
        console.log("eventNotesData", eventNotesData);
        console.log(events.rows);
        res.status(200).json({
        status: "success",
        results: eventNotesData.rows.length,
        data: {
            events: eventNotesData.rows,
            weather: axios_response.data.weather,
            temp: axios_response.data.main
        }
    });
    } catch (err) {
        console.error(err.message);
    }
    
});

// Get a Restaurant
app.get("/api/v1/events/:id", async (req, res) => {
    try {
        const event = await db.query("SELECT * FROM events WHERE id = $1", [req.params.id]);
       
// Fetch reviews
        const notes = await db.query("SELECT * FROM notes WHERE event_id = $1", [req.params.id]);
        res.status(200).json({
        status: "success",
        data: {
            event: event.rows[0],
            notes: notes.rows,
            dates: event.rows.date
        },
    }); 
    } catch (err) {
        console.error(err.message);
    }
   
});

// Create a Restaurant
app.post("/api/v1/events", async (req, res) => {
    try {
      const { event, location, date } = req.body;
      const newEvent = await db.query("INSERT INTO events (event, location, date) values($1, $2, $3) RETURNING *", 
      [event, location, date]);
      res.status(200).json({
          status: "success",
          data: {
            event: newEvent.rows[0]
          },
        });
    } catch (err) {
        console.error(err.message);
    }
});

// Update Restaurant
app.put("/api/v1/events/:id", async (req, res) => {
    try {
      const  updatedEvent = await db.query ("UPDATE events SET event = $1, location = $2, date = $3 WHERE id = $4 RETURNING *",
       [req.body.event, req.body.location, req.body.date, req.params.id]);
       res.status(200).json({
           status: "success",
           data: {
               event: updatedEvent.rows[0]
           },
       }) 
    } catch (err) {
        console.error(err.message);
    }
    console.log(req.params.id);
    console.log(req.body);
});

// Delete a restaurant
app.delete("/api/v1/events/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedNotes = await db.query("DELETE FROM notes WHERE event_id = $1", [id]);
      const deletedEvent = await db.query ("DELETE FROM events WHERE id = $1", 
      [id]);
      res.status(204).json({
          status: "success",
      })  
    } catch (err) {
        console.error(err.message);  
    }
});

// Add a Review
app.post("/api/v1/events/:id/addNote", async (req, res) => {
    try {
      const newNote = await db.query("INSERT INTO notes (event_id, content) values($1, $2) RETURNING *;", [req.params.id, req.body.content]); 
      console.log(newNote);
      res.status(201).json({
          status: "success",
          data: {
              note: newNote.rows[0]
          },
      }) ;
    } catch (err) {
        console.error(err.message)
    }
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
});