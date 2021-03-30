import React from 'react';
import Header from '../components/Header';
import AddEvent from '../components/AddEvent';
import EventList from '../components/EventList';

export const Home = () => {
    return (
        <div>
          <Header />
          <AddEvent />
          <EventList />
          {/* <Weather /> */}
        </div>
    )
}

export default Home



