
import ReactPlayer from 'react-player'
import Transition from '../../complements/transition';
function TutorialSection() {
    return ( 
        <Transition>
            <h1 >Tutorial para el uso de aplicacion</h1>
            <p className='text-sm text-gray-500'>medellin furnished apartments</p>
            <ReactPlayer url='https://www.youtube.com/watch?v=x3b72cY3o0M'/>
            <p className='text-sm text-gray-500 font-semibold my-2'>created with ❤️ by Alliance Developers.</p>
            
        </Transition>
     );
}

export default TutorialSection;