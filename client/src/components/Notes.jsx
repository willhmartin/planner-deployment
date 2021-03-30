import React from 'react';
import StarRating from './StarRating';

const Notes = ({notes}) => {
    return (
        <div className="row row-cols-3 mb-2">
            {notes.map((note) => {
                return (
                <div key={note.id} className="card text-white bg-secondary mb-3 mr-4" style={{maxwidth: "30%"}}>
                <div className="card-header d-flex justify-content-between">
                    <span>{note.content}</span>
                    {/* <span><StarRating rating={review.rating} /></span> */}
                </div>
            </div>
                ) 
            })}
            {/* <div className="card text-white bg-primary mb-3 mr-4" style={{maxwidth: "30%"}}>
                <div className="card-header d-flex justify-content-between">
                    <span>Joan</span>
                    <span><StarRating rating={3} /></span>
                </div>
                <div className="card-body">
                    <p className="card-text">This restaurant was awesome</p>
                </div>
            </div>
            <div className="card text-white bg-primary mb-3 mr-4" style={{maxwidth: "30%"}}>
                <div className="card-header d-flex justify-content-between">
                    <span>Joan</span>
                    <span><StarRating rating={3} /></span>
                </div>
                <div className="card-body">
                    <p className="card-text">This restaurant was awesome</p>
                </div>
            </div>
            <div className="card text-white bg-primary mb-3 mr-4" style={{maxwidth: "30%"}}>
                <div className="card-header d-flex justify-content-between">
                    <span>Joan</span>
                    <span><StarRating rating={3} /></span>
                </div>
                <div className="card-body">
                    <p className="card-text">This restaurant was awesome</p>
                </div>
            </div> */}
        </div>
    )
};

export default Notes;
