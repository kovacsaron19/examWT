import { useState } from 'react';

function Candidate(props) {

    const { item, onSave, onCandidateDeletion } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cv, setCv] = useState('');


    const deleteCandidate = () => {
        onCandidateDeletion(item.id, item.jobId)
    }

    const editCandidate = () => {
        setIsEditing(true);
    }

    const cancel = () => {
        setIsEditing(false);
    }

    const save = () => {
        onSave( item.jobId, {
            name,
            cv,
            email
        }, item.id)
        setIsEditing(false);
    }

    return (
        isEditing ? (
            <>
                <input type='text' placeholder='Name' value={name} onChange={(evt) => setName(evt.target.value)} />
                <input type='text' placeholder='Email' value={email} onChange={(evt) => setEmail(evt.target.value)} />
                <input type='text' placeholder='Cv' value={cv} onChange={(evt) => setCv(evt.target.value)} />
                <div>
                    <input type='button' value='save' onClick={save} />
                    <input type='button' value='cancel' onClick={cancel} />
                </div>
            </>
        ) : (
            <>
                <div>
                    <div>
                        Name <span>{item.name}</span> Email <span>{item.email} </span>
                    </div>
                    <div>
                        <input type='button' value='delete' onClick={deleteCandidate} />
                        <input type='button' value='edit' onClick={editCandidate} />
                    </div>
                </div>
            </>
        )

    );
}

export default Candidate;