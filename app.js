const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Factorial API
app.get('/factorial', (req, res) => {
    const n = parseInt(req.query.n) || 10;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    res.json({ input: n, factorial: result });
});

// Fibonacci API
app.get('/fibonacci', (req, res) => {
    const n = parseInt(req.query.n) || 10;
    const fibSequence = [0, 1];
    for (let i = 2; i < n; i++) {
        fibSequence.push(fibSequence[i - 1] + fibSequence[i - 2]);
    }
    res.json({ input: n, fibonacci: fibSequence });
});

// Matrix Multiplication API
app.post('/matrix-multiply', (req, res) => {
    const { matrix_a, matrix_b } = req.body;
    try {
        if (!matrix_a || !matrix_b) throw new Error("Matrices missing");
        const rowsA = matrix_a.length, colsA = matrix_a[0].length;
        const rowsB = matrix_b.length, colsB = matrix_b[0].length;

        if (colsA !== rowsB) {
            return res.status(400).json({ error: "Incompatible matrix sizes for multiplication" });
        }

        let result = Array(rowsA).fill().map(() => Array(colsB).fill(0));
        for (let i = 0; i < rowsA; i++) {
            for (let j = 0; j < colsB; j++) {
                for (let k = 0; k < colsA; k++) {
                    result[i][j] += matrix_a[i][k] * matrix_b[k][j];
                }
            }
        }
        res.json({ matrix_a, matrix_b, result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
