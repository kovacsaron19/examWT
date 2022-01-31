import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function JobPosting(props) {

    const { item, onSave, onDelete, setDisplayedCandidates } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(item.decription);
    const [deadline, setDeadline] = useState(new Date(item.deadline));

    const showCandidates = (event) => {
        setDisplayedCandidates(item);
    }

    const formatReleaseDate = (d) => {
        return d.substring(0, 10);
    }

    const deleteJob = (event) => {
        onDelete(item.id);
    }

    const edit = () => {
        setIsEditing(true);
    }

    const cancel = () => {
        setIsEditing(false);
    }

    const saveJob = () => {
        onSave( item.id, {
            description,
            deadline
        })
        setIsEditing(false);
    }
    return (
        <div>
            {
                isEditing ? (
                    <>
                        <div>
                            <input type='text' placeholder='description' value={description} onChange={(evt) => setDescription(evt.target.value)} />
                            <div>
                                <DatePicker selected={deadline} onChange={date => setDeadline(date)} />
                            </div>
                        </div>
                        <input type='button' value='cancel' onClick={cancel} />
                        <input type='button' value='save' onClick={saveJob} />
                    </>
                ) :
                    (
                        <>
                            <div>
                                Description: <a>{item.description}</a> Deadline: {formatReleaseDate(item.deadline)}
                            </div>
                            <div>
                                <input type='button' value='delete' onClick={deleteJob} />
                                <input type='button' value='edit' onClick={edit} />
                                <input type='button' value='candidates' onClick={showCandidates} />
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default JobPosting