const express = require('express');
const router = express.Router();


const content = {
genuine: {
title: "You're looking good — self care tips",
bullets: [
'Keep up healthy sleep and routine',
'Short daily mindfulness (5–10 min)',
'Keep connected with friends',
],
actions: [
{ label: "Don't worry — stay healthy", href: '/wellness/tips' },
{ label: 'Explore light activities', href: '/activities/light' },
],
},
mid: {
title: 'Mild signs — helpful resources',
bullets: [
'Try guided breathing & CBT exercises',
'Follow small daily tasks (walk, journal)',
'Consider short check-ins with a counselor',
],
actions: [
{ label: 'Explore resources', href: '/resources' },
{ label: 'Daily tasks to feel better', href: '/tasks/month' },
],
},
high: {
title: 'High distress — recommended professional help',
bullets: [
'Book an appointment with a mental health professional',
'Follow a structured 1-month task plan',
'If in crisis, contact emergency or local helpline',
],
actions: [
{ label: 'Need a doctor', href: '/book/doctor' },
{ label: 'Get 1-month plan', href: '/tasks/1month' },
],
},
};


router.get('/:level', (req, res) => {
const { level } = req.params;
const payload = content[level];
if (!payload) return res.status(404).json({ message: 'No content for level' });
return res.json({ content: payload });
});


module.exports = router;