const express = require('express')
const app = express();
const User = require('./Routers/user')

app.use(express.json())
app.use(User)

app.get('/',(req,res)=>{
  res.send('Hello World!')
})

app.listen(3000,()=>{
  console.log('Server is running on port 3000')
})