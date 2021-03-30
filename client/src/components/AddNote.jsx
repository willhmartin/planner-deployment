import React, { useState } from 'react'
import EventFinder from '../apis/EventFinder';
import { useHistory, useLocation, useParams } from "react-router-dom";

const AddNote = () => {
    const { id } = useParams();
    // const location = useLocation;
    // console.log(location);
    const history = useHistory();

    const [content, setContent] = useState("");
    // const [reviewText, setReviewText] = useState("");
    // const [rating, setRating] = useState("Rating");

    const handleSubmitNote = async (e) => {
        e.preventDefault();
        try {
            const response = await EventFinder.post(`/${id}/addNote`, {
                content
            });
            
        } catch (err) {
            console.error(err.message)
        }
        history.push("/");
        history.push(`/events/${id}`);
    };
    return (
        <div className="mb-2">
            <form action="">
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="content"></label>
                        <input onChange={e => setContent(e.target.value)} value={content}type="text" className="form-control" id="note" placeholder="note"/>
                        <button type="submit" onClick={handleSubmitNote} className=" mt-2 btn btn-primary">Submit</button>
                    </div>
                
                </div>
            </form>
        </div>
    )
}

export default AddNote;
