import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

// Register chart elements and scales with Chart.js
ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,

    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);




// Sample data for the chart (replace with your actual data)


function Graphic({ type='bar', data }) { //data -> {meses:[meses], netos:[valores netos], brutos:[valores bruto], gastos:[gastos]}
    const sendData = {
        labels: data.mes,
        datasets: [
            {
                label: 'Neto',
                data: data.neto,
                borderColor: 'rgba(70, 210, 75, 0.974)',
                backgroundColor: ['rgba(12, 91, 8, 0.974)'],
                tension: 0.10, // Optional: set tension for bezier curves
            },
            {
                label: 'Bruto',
                data: data.bruto,
                borderColor: 'rgba(225, 168, 62, 0.974)',
                backgroundColor: ['rgba(230, 119, 15, 0.974)'],
                tension: 0.10, // Optional: set tension for bezier curves
            },
           
        ]
    };

    // Options for the chart (customize per your needs)
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Sales Chart'
            },
            legend: {
                display: true,
                position: 'bottom'
            }
        }
    };
    return (
        <div className='bg-blue-950 rounded-lg'>
            {
                type.includes('line') ?
                <Line data={sendData} options={options} />
                :
                <Bar data={sendData} options={options}/>
            }
            
        </div>
    );
}

export default Graphic;
