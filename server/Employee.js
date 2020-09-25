const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    pic:String,
    salary:String,
    position:String
})

mongoose.model('employee',EmployeeSchema)
//https://employeeapp.glitch.me/