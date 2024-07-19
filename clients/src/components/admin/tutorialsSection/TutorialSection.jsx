
import ReactPlayer from 'react-player'
import Transition from '../../complements/transition';
import MainSection from '../mainSection';
function TutorialSection() {
    return (
        <Transition>
                <div className='w-100%'>
                    <h1 >Tutorial para el uso de aplicacion</h1>
                    <p className='text-sm text-gray-500'>medellin furnished apartments</p>
                    <div className='w-[100%]'>
                        <ReactPlayer  url='https://www.youtube.com/watch?v=x3b72cY3o0M' />
                    </div>
                    <p className='text-sm text-gray-500 font-semibold my-2'>created with ❤️ by Alliance Developers.</p>
                </div>
        </Transition>
    );
}

export default TutorialSection;