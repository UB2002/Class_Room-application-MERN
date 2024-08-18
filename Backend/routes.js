const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Classroom, Timetable } = require('./model');
const { authenticateJWT } = require('./middleware');
const { secret } = require('./config');

const router = express.Router();

// Principal account setup
const setupPrincipal = async () => {
    const principalExists = await User.findOne({ role: 'Principal' });
    if (!principalExists) {
        const hashedPassword = await bcrypt.hash('Admin', 10);
        await User.create({ email: 'principal@classroom.com', password: hashedPassword, role: 'Principal' });
    }
};
setupPrincipal();


router.get('/', (req, res) => {
    res.send('Hello From APIs');
});


// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid credentials');
    }
     
   // res.send('Logged in ')
    const token = jwt.sign({ userId: user._id, role: user.role }, secret, { expiresIn: '1h' });
    res.json({ token });
});

// Create user (Teacher/Student) - Only Principal can do this
router.post('/signup', authenticateJWT, async (req, res) => {
    const { email, password, role } = req.body;

    if (req.user.role !== "Principal") return res.sendStatus(403);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role });

    res.json(user);
});

// Create Classroom
router.post('/classrooms', authenticateJWT, async (req, res) => {
    console.log(req.body)
    if (req.user.role !== 'Principal') return res.sendStatus(403);
    
    const classroom = await Classroom.create(req.body);
    res.json(classroom);
});

// Assign Teacher to Classroom
router.put('/classrooms/:id/assign-teacher', authenticateJWT, async (req, res) => {
    try {
        if (req.user.role !== 'Principal') return res.sendStatus(403);

        const classroom = await Classroom.findOne({roomno: req.params.id});

        console.log(classroom)
        if (!classroom) return res.status(404).json({ error: 'Classroom not found' });

        const teacher = await User.findById(req.body.teacherId);
        if (!teacher || teacher.role !== 'Teacher') return res.status(404).json({ error: 'Teacher not found or invalid role' });

        classroom.teacher = req.body.teacherId;
        await classroom.save();
        res.json({message : "successfull assigned the teacher to room number"});
    } catch (error) {
        // Handle any errors
        console.error('Error assigning teacher:', error);
        res.status(500).json({ error: 'An error occurred while assigning the teacher' });
    }
});


// Assign Student to Teacher's Classroom
router.put('/classrooms/:classroomId/assign-student', authenticateJWT, async (req, res) => {
    if (req.user.role !== 'Principal') return res.sendStatus(403);

    const { studentId } = req.body;
    const { classroomId } = req.params;

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) return res.status(404).send('Classroom not found');

    const student = await User.findById(studentId);
    if (!student || student.role !== 'Student') return res.status(404).send('Student not found');
    
    classroom.students = req.body.studentId;
    //student.classroom = classroom._id;
    await classroom.save();
    res.json(classroom);

    // res.json({ message: 'Student assigned to classroom successfully', student });
});

// Get Students for Teacher
// Get Students for Teacher
router.get('/classrooms/:id/students', authenticateJWT, async (req, res) => {
    try {
        // Ensure that the user is a teacher
        if (req.user.role !== 'Teacher') {
            return res.status(403).json({ error: 'Access forbidden: Only teachers can access this resource.' });
        }

        // Find the classroom by ID and populate the teacher reference
        const classroom = await Classroom.findById(req.params.id).populate('teacher');
        if (!classroom) {
            return res.status(404).json({ error: 'Classroom not found' });
        }

        // Check if the teacher making the request is assigned to this classroom
        if (String(classroom.teacher._id) !== String(req.user.userId)) {
            return res.status(403).json({ error: 'Access forbidden: You are not assigned to this classroom.' });
        }

        // Populate the students array in the classroom document
        await classroom.populate('students');

        // Return the list of students in the classroom
        res.json(classroom.students);
    } catch (error) {
        // Log the full error details
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'An error occurred while fetching students.', details: error.message });
    }
});


module.exports = router;
