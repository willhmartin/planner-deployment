import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import EventDetailPage from "./routes/EventDetailPage";
import { EventsContextProvider } from './context/EventsContext';

const App = () => {
    return (
      <EventsContextProvider>
        <div className="container">
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/events/:id/update" component={UpdatePage} />
              <Route exact path="/events/:id" component={EventDetailPage} />
            </Switch>
          </Router>
        </div>
      </EventsContextProvider>
    )
};

export default App;


