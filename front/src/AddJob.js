import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddJob(props) {
    const { onAdd } = props;
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(new Date());

    const add = (event) => {
        onAdd({
            description,
            deadline
        })
        setDescription('');
    }

    return (
        <div>
            <div>
                <textarea placeholder='description here' value={description} onChange={(evt) => setDescription(evt.target.value)} />
                <div>
                    <DatePicker selected={deadline} onChange={date => setDeadline(date)} />
                </div>
                <div>
                    <input type='button' value='add' onClick={add}/>
                </div>
            </div>
        </div>
    );
}

export default AddJob;