import http from 'k6/http';
import { check, sleep } from 'k6';

// Define the load test options
export let options = {
    stages: [
        { duration: '1m', target: 10 },  // Ramp-up to 10 virtual users (VUs) over 1 minute
        { duration: '3m', target: 10 },  // Stay at 10 VUs for 3 minutes
        { duration: '1m', target: 0 },   // Ramp-down to 0 VUs over 1 minute
    ],
};

export default function () {
    // Test the factorial API endpoint
    let factorialResponse = http.get('http://3.90.45.158:3000/factorial?n=5');
    check(factorialResponse, { 'status was 200': (r) => r.status === 200 });

    // Test the Fibonacci API endpoint
    let fibonacciResponse = http.get('http://3.90.45.158:3000/fibonacci?n=10');
    check(fibonacciResponse, { 'status was 200': (r) => r.status === 200 });

    // Test the matrix multiply API endpoint with a POST request
    let payload = JSON.stringify({ matrixA: [[1, 2], [3, 4]], matrixB: [[5, 6], [7, 8]] });
    let params = { headers: { 'Content-Type': 'application/json' } };
    let matrixResponse = http.post('http://3.90.45.158:3000/matrix-multiply', payload, params);
    check(matrixResponse, { 'status was 200': (r) => r.status === 200 });

    sleep(1);  // Pause for 1 second between iterations
}

