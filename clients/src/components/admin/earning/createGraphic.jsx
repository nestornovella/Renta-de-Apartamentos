import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    CategoryScale,
    ArcElement,
    Tooltip,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Legend,
    Filler
} from 'chart.js';

// Register chart elements and scales with Chart.js
ChartJs.register(
    CategoryScale,
    ArcElement,
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


function LineGraphic({ type = 'bar', data }) { //data -> {meses:[meses], netos:[valores netos], brutos:[valores bruto], gastos:[gastos]}
    const neto = data.neto?.map((e, i) => e + data.services[i])
    const sendData = {
        labels: data.mes,
        datasets: [
            {
                label: 'Neto',
                data: neto,
                borderColor: 'rgba(10, 246, 18, 0.974)',
                backgroundColor: ['rgba(89, 223, 82, 0.974)'],
                tension: 0.10, // Optional: set tension for bezier curves
            },
            {
                label: 'Bruto',
                data: data.bruto,
                borderColor: 'rgba(243, 118, 1, 0.974)',
                backgroundColor: ['rgba(243, 118, 1, 0.974)'],
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
        <div className='bg-black rounded-lg h-[100%] flex items-center justify-center'>
            {
                type.includes('line') ?
                    <Line data={sendData} options={options} />
                    :
                    <Bar data={sendData} options={options} />
            }

        </div>
    );
}

function CircleGraphic({data}) {
    let dataSet = {
        labels: data.months,
        datasets: [
            {
                label: 'Ganancia',
                data: data.amounts,
                backgroundColor: [
                    '#3299dd', // Azul claro
                    '#FFA726', // Naranja
                    '#EF5350', // Rojo
                    '#66BB6A', // Verde claro
                    '#42A5F5', // Azul
                    'rgba(89, 223, 82, 0.974)', // Amarillo
                    'rgba(243, 118, 1, 0.974)', // Rosa
                    '#EC407A', // Rosa oscuro
                    '#7E57C2', // Morado
                    '#26A69A', // Verde azulado
                    '#FFCA28', // Amarillo dorado
                    '#78909C', // Gris azulado
                ]
            }
        ]
    }
    let options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom', // Puedes ajustar la posición de la leyenda aquí
            },
        },
        tooltip: {
            callbacks: {
                label: (tooltipItem) => {
                    // Mostrar el valor y porcentaje de la ganancia en cada rebanada
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const value = dataset.data[tooltipItem.index];
                    const label = dataset.label[tooltipItem.index];
                    return `${label}: $${value.toLocaleString()}`;
                }}}

    }
    return (
        <div className='bg-black rounded-lg h-full flex items-center justify-center'>
            <Pie data={dataSet} />
        </div>
    );
}

export default {
    LineGraphic,
    CircleGraphic
}


