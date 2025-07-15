import express from 'express'
const app =express()
const port = 8080
app.get('/',(req,res) =>{
    res.send('Job Finder(from server)')
})
app.listen(prompt, () => console.log('Listening on:' + port))