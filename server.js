const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/invoices', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const invoiceSchema = new mongoose.Schema({
    customerName: String,
    invoiceDate: String,
    items: Array,
    totalAmount: String,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

// API routes
app.post('/api/invoices', async (req, res) => {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.send(invoice);
});

app.get('/api/invoices', async (req, res) => {
    const invoices = await Invoice.find();
    res.send(invoices);
});

// Routes to serve static HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
