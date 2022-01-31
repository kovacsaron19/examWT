import { EventEmitter } from 'fbemitter';

const SERVER = 'http://localhost:3001';
// const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`

class JobStore {
    constructor () {
        this.data = []
        this.candidates = []
        this.emitter = new EventEmitter()
    }

    async getJobs() {
        try{
            const response = await fetch(`${SERVER}/jobs`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_JOBS_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_JOBS_ERROR')
        }
    }

    async addJob(job) {
        try{
            const response = await fetch(`${SERVER}/jobs`,{
                method:'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(job)
            })
            if(!response.ok){
                throw response
            }
            this.getJobs()
            this.emitter.emit('ADD_JOB_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_JOB_ERROR')
        }
    }
    
    async saveJob(id, job) {
        try{
            const response = await fetch(`${SERVER}/jobs/${id}`,{
                method:'PUT',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(job)
            })
            if(!response.ok){
                throw response
            }
            this.getJobs();
            this.emitter.emit('SAVE_JOB_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('SAVE_JOB_ERROR')
        }
    }

    async deleteJob(id) {
        try{
            const response = await fetch(`${SERVER}/jobs/${id}`,{
                method:'DELETE'
            })
            if(!response.ok){
                throw response
            }
            this.getJobs();
            this.emitter.emit('DELETE_JOB_SUCCESS');
        } catch(err) {
            console.warn(err)
            this.emitter.emit('DELETE_JOB_ERROR')
        }
    }

    async getCandidates(jobId) {
        try{
            const response = await fetch(`${SERVER}/jobs/${jobId}/candidates`)
            if(!response.ok){
                throw response
            }
            this.candidates=await response.json()
            this.emitter.emit('GET_CANDIDATES_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_CANDIDATES_ERROR')
        }
    }

    async addCandidate(name, cv, email, jobId) {
        try{
            var candidate = { name, cv, email, jobId }
            const response = await fetch(`${SERVER}/jobs/${jobId}/candidates`,{
                method:'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(candidate)
            })
            if(!response.ok){
                throw response
            }
            this.getCandidates(jobId);
            this.emitter.emit('ADD_CANDIDATE_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_CANDIDATE_ERROR')
        }
    }

    async deleteCandidate(id, jobId) {
        try{
            const response = await fetch(`${SERVER}/jobs/${jobId}/candidates/${id}`,{
                method:'DELETE'
            })
            if(!response.ok){
                throw response
            }
            this.getCandidates(jobId);
        } catch(err) {
            console.warn(err)
            this.emitter.emit('DELETE_CANDIDATE_ERROR')
        }
    }

    async saveCandidate(id, candidate, cid) {
        try{
            const response = await fetch(`${SERVER}/jobs/${id}/candidates/${cid}`,{
                method:'PUT',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(candidate)
            })
            if(!response.ok){
                throw response
            }
            this.getJobs();
            this.emitter.emit('SAVE_CANDIDATE_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('SAVE_CANDIDATE_ERROR')
        }
    }

    async deadlineFilter(year, keyword) {
        try{
            const response = await fetch(`${SERVER}/filterJobs/${year}/${keyword}`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_FILTERED_JOBS_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_FILTERED_JOBS_ERROR')
        }
    }

    async getSortedDeadlines() {
        try{
            const response = await fetch(`${SERVER}/jobsdeadline`)
            if(!response.ok){
                throw response
            }
            this.data=await response.json()
            this.emitter.emit('GET_SORTED_DEADLINES_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_SORTED_DEADLINES_ERROR')
        }
    }
}


const store = new JobStore();

export default store;