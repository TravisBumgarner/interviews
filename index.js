const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('ok');
});

app.get('/measurements', (req, res) => {
    res.send('get all measurements')
});

app.post('/measurements', (req, res) => {
    res.send('create new measurement')
});
app.put('/measurements/:id', (req, res) => {
    res.send(`update measurement ${req.params.id}`)
});

app.delete('/measurements/:id', (req, res) => {
    res.send(`delete measurement ${req.params.id}`)
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`running on port ${port}`);
})