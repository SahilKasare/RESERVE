const Feedback = require('../models/Feedback.js');


exports.feedbackSent = async (req, res) => {
    try {
        const { name, email, feedback } = req.body;
        const newFeedback = new Feedback({
            name,
            email,
            feedback
        });
        const savedFeedback = await newFeedback.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
