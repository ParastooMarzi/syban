import Footer from './Footer/Footer';
import Hero from './Hero/Hero';
import Join from './Join/Join';
import Programs from './Programs/Programs';
import Taskmanagement from './Taskmanagement/Taskmanagement';
import './home.css';
import Workflow from './workflow/Workflow';
function Home() {
  return (
    <div className="Home">
        <Hero />
        <Programs />
        <Taskmanagement/>
        <Workflow />
        <Join/>
        <Footer/>
    </div>
  );
}

export default Home;