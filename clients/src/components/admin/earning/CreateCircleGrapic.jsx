

import {Chart as ChartJs, ArcElement, Tooltip, Legend} from 'chart.js'
import {Pie} from 'react-chartjs-2'

ChartJs.register(ArcElement, Tooltip, Legend)


let options ={
    responsive:true,

}
let data ={
    labels:['enero', 'febrero', 'marzo'],
    datasets:[
        {
            label:'meses',
            data:[100, 1000, 300],
            backgroundColor:[
                '#0a0744', '#585555', '#FFCE56','#440729'
            ]
        }
    ]
}



function CircleGraphic() {
    return (  
        <div className='bg-blue-950 rounded-lg
        '>
            <Pie data={data} /> 
        </div>
    );
}

export default CircleGraphic;