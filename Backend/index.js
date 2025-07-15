import express from 'express'
const app =express()
const port = 8080
app.get('/',(req,res) =>{
    res.json('Job Finder(from server)')
})
app.listen(port, () => console.log('Listening on:' + port))