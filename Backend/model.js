const { mongoose } = require('./config');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: {type: String, unique: false},
    role: { type: String, enum: ['Principal', 'Teacher', 'Student'] }
});

const classroomSchema = new mongoose.Schema({
    roomno: {type: Number, unique:true},
    name: String,
    startTime: String,
    endTime: String,
    daysInSession: [String],
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const timetableSchema = new mongoose.Schema({
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
    subject: String,
    startTime: String,
    endTime: String,
    day: String
});


const User = mongoose.model('User', userSchema);
const Classroom = mongoose.model('Classroom', classroomSchema);
const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = { User, Classroom, Timetable };
