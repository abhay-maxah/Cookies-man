import express from require('express')
const app = express();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

app.get('/',(req,res)=>{
  res.send('Hello World!')
})

app.listen(3000,()=>{
  console.log('Server is running on port 3000')
})