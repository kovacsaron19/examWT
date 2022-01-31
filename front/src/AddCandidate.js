import { useState } from "react";

function AddCandidate(props) {
    const { onAdd, jobId } = props 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cv, setCv] = useState('');

    const add = (event) => {
        onAdd(
            name, 
            cv,
            email,
            jobId
        );
        setName('');
        setEmail('');
        setCv('')
    }

    return (
        <div>
            <div>
                <input type='text' placeholder='Name' value={name} onChange={(evt) => setName(evt.target.value)} />
                <input type='text' placeholder='Email' value={email} onChange={(evt) => setEmail(evt.target.value)} />
                <input type='text' placeholder='Cv' value={cv} onChange={(evt) => setCv(evt.target.value)} />
                <div>
                    <input type='button' value='add' onClick={add}/>
                </div>
            </div>
        </div>
    );
}

export default AddCandidate;