import logo from './logo.svg';
import './App.css';
import JobPosting from './JobPosting';
import AddJob from './AddJob'
import store from "./JobStore";
import { useEffect, useState } from 'react';
import Candidate from './Candidate'
import AddCandidate from './AddCandidate';
import FilteredSorted from './FilteredSorted';

function App() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [sorted, setSorted] = useState(false);

  const addJob = (job) => {
    store.addJob(job);
    store.getJobs();
    store.emitter.addListener('GET_JOBS_SUCCESS', () => {
      setJobs(store.data);
    })
  }

  const saveJob = (id, job) => {
    store.saveJob(id, job);
  }

  const saveCandidate = (id, candidate, cid) => {
    store.saveCandidate(id, candidate, cid);
  }

  const deleteJob = (id) => {
    store.deleteJob(id);
  }

  const setDisplayedCandidates = (job) => {

    setSelectedJob(job);
  }

  const onCandidateDeletion = (id, jobId) => {
    store.deleteCandidate(id, jobId);
  }

  const addCandidate = (name, cv, email, jobId) => {
    store.addCandidate(name, cv, email, jobId);
  }

  const applyFilter = (year, keyword) => {
    store.deadlineFilter(year, keyword)
    setFiltered(true);
  }


  useEffect(() => {
    if (selectedJob != null) {

      store.getCandidates(selectedJob.id);
      store.emitter.addListener('GET_CANDIDATES_SUCCESS', () => {
        console.log('here')
        setCandidates(store.candidates);
      })

      store.getJobs();
      store.emitter.addListener('GET_JOBS_SUCCESS', () => {
        setJobs(store.data);
      })
    }

  }, [selectedJob])

  useEffect(() => {
    if (filtered) {
      store.emitter.addListener('GET_FILTERED_JOBS_SUCCESS', () => {
        setJobs(store.data);
      })
    }
    else if (sorted) {
      store.getSortedDeadlines();
      store.emitter.addListener('GET_SORTED_DEADLINES_SUCCESS', () => {
        setJobs(store.data);
      })
    }
  }, [filtered, sorted])

  // useEffect(() => {
  //   store.getJobs();
  //   store.emitter.addListener('GET_JOBS_SUCCESS', () => {
  //     setJobs(store.data);
  //   })
  // })

  return (
    <div className="container">
      <div className="flex-container">
        <div>
          <div>
            <h3>Add job</h3>
            <AddJob onAdd={addJob} />
          </div>
          <div>
            <h3>Jobs</h3>
            {
              jobs.map((e) => <JobPosting key={e.id} item={e} onSave={saveJob} onDelete={deleteJob} setDisplayedCandidates={setDisplayedCandidates} />)
            }
          </div>
          <div>
            <h2>Candidatesssss</h2>
            {selectedJob ?
              candidates.map((e) => <Candidate key={e.id} item={e} onCandidateDeletion={onCandidateDeletion} onSave={saveCandidate} />) : <div>no selected job</div>
            }
            {selectedJob ?
              <div><AddCandidate onAdd={addCandidate} jobId={selectedJob.id} /></div> : <div>no selected job</div>
            }
          </div>
          <div>
            <FilteredSorted onFilter={applyFilter} setFiltered={setFiltered} setSorted={setSorted} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
