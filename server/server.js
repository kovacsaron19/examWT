const express = require("express");
const cors=require('cors')
const path = require('path');
require('dotenv').config();
const sequelize = require("./sequelize.js");
const { Op } = require("sequelize");
const JobPosting = require("./models/jobPosting")
const Candidate = require("./models/Candidate")

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname,'build')))

const port = 3001;
// const port = process.env.PORT

JobPosting.hasMany(Candidate, {as:"Candidates", foreignKey:"jobId"});
Candidate.belongsTo(JobPosting, { foreignKey: "jobId" })

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.listen(port, () => {
    console.log("The server is running on http://localhost:" + port);
});

app.use((err, req, res, next) => {
    console.error("[ERROR]:" + err);
    res.status(500).json({ message: "500 - Server Error" });
});

app.get('/sync', async (req, res) => {
    try {
        await sequelize.sync({ force: true })
        res.status(201).json({ message: 'table created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

//----------JOBPOSTING------------

app.get('/jobs', async (req, res) => {
    try {
        const jobs = await JobPosting.findAll()
        res.status(200).json(jobs)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.get('/jobs/:jpid', async (req, res) => {
    try {
        const job = await JobPosting.findByPk(req.params.jpid)
        if (job) {
            res.status(200).json(job)

        } else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/jobs', async (req, res) => {
    try {
        await JobPosting.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})


app.put('/jobs/:jpid', async (req, res) => {
    try {
        const job = await JobPosting.findByPk(req.params.jpid)
        if (job) {
            await job.update(req.body, { fields: ['description', 'deadline'] })
            res.status(202).json({ message: "accepted" })
        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.delete('/jobs/:jpid', async (req, res) => {
    try {
        const job = await JobPosting.findByPk(req.params.jpid)
        if (job) {
            await job.destroy()
            res.status(202).json({ message: "deleted" })
        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})





//--------CANDIDATE----------


app.get('/candidates', async (req, res) => {
    try {
        const candidate = await Candidate.findAll()
        res.status(200).json(candidate)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.get('/candidates/:cid', async (req, res) => {
    try {
        const candidate = await Candidate.findByPk(req.params.cid)
        if (candidate) {
            res.status(200).json(candidate)

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/candidates', async (req, res) => {
    try {
        await Candidate.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.put('/candidates/:cid', async (req, res) => {
    try {
        const candidate = await Candidate.findByPk(req.params.cid)
        if (candidate) {
            await candidate.update(req.body, { fields: ['name', 'cv', 'email'] })
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})


app.delete('/candidates/:cid', async (req, res) => {
    try {
        const candidate = await Candidate.findByPk(req.params.cid)
        if (candidate) {
            await candidate.destroy()
            res.status(202).json({ message: "deleted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})






//--------CANDIDATE THROUGH JOBPOSTING----------

app.get('/jobs/:jpid/candidates', async (req, res) => {
    try {
        const job = await JobPosting.findByPk(req.params.jpid)
        if (job) {
            const candidates = await job.getCandidates();
            res.status(200).json(candidates)
        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/jobs/:jpid/candidates', async (req, res) => {
    try {
        const job = await JobPosting.findByPk(req.params.jpid)
        if (job) {
            const candidate = req.body
            candidate.jobId = job.id
            await Candidate.create(candidate)
            res.status(200).json({ message: 'created' })
        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.put('/jobs/:jpid/candidates/:cid', async (req, res) => {
    try {
        const job = await JobPosting.findByPk(req.params.jpid)
        if (job) {
            const candidates = await job.getCandidates({where:{ id: req.params.cid }})
            var singleCandidate = null
            for (var i = 0; i < candidates.length; i++) {
                if (candidates[i].id == req.params.cid) {
                    singleCandidate = candidates[i];
                }
            }
            if (singleCandidate) {
                singleCandidate.name = req.body.name;
                singleCandidate.cv = req.body.cv;
                await singleCandidate.save();
                res.status(202).json({ message: "accepted" })
            } else {
                res.status(404).json({ message: "not found" })
            }
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.delete('/jobs/:jpid/candidates/:cid', async (req, res) => {
    try {
        const job = await JobPosting.findByPk(req.params.jpid)
        if (job) {
            const candidates = await job.getCandidates({where: { id: req.params.cid }})
            var singleCandidate = null
            for (var i = 0; i < candidates.length; i++) {
                if (candidates[i].id == req.params.cid) {
                    singleCandidate = candidates[i];
                }
            }
            if (singleCandidate) {
                await singleCandidate.destroy()
                res.status(202).json({ message: "accepted" })
            } else {
                res.status(404).json({ message: "not found" })
            }
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})






//------------FILTER JOBS-------------


app.get('/filterJobs/:paramyear/:paramfield', async (req, res) => {

    const year = new Date(`${req.params.paramyear}-01-01`);
    const yearplus = new Date(`${parseInt(req.params.paramyear) + 1}-01-01`);
    try {
        const jobs = await JobPosting.findAll(
            {
                where: {
                    deadline: {
                        [Op.gt]: year,
                        [Op.lt]: yearplus,
                    },
                    description: {
                        [Op.like]: req.params.paramfield
                    }
                    
                }
            }
        )
        res.status(200).json(jobs)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})






//---------SORTING---------


function sortByDeadline (jp1, jp2) {
    var deadline1 = jp1.deadline;
    var deadline2 = jp2.deadline;

    if (deadline1 <= deadline2) {
        return -1;
    }
    if (deadline1 > deadline2) {
        return 1;
    }

    return 0;
}

app.get('/jobsdeadline', async (req, res) => {
    try {
        const jobs = await JobPosting.findAll()
        jobs.sort(sortByDeadline)
        res.status(200).json(jobs)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})





//---------PAGINATION-----------

app.get('/jobs/paged', async(req, res, next)=>{
    try{
        const jobs = JobPosting.findAndCountAll({
            limit: 5,
            offset: req.query.offset
        })
        res.status(200).json(jobs.rows)
    }
    catch{
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})