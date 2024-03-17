import React from 'react'
import './index.css'
import {Link} from 'react-router-dom'


function About() {
  
    React.useEffect(() => {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
          element.classList.add('fade-in-animation');
        });
      }, []);
    
      return (
    <div>
      
        <div className="about-container">
        <h2 className="about-title fade-in">About Me</h2>
        <p className="about-text fade-in">Hello there! My name is Phani and I am a passionate and aspiring MERN stack developer. As a fresher in the field of web development, I am constantly eager to learn and grow, and I believe that every project is an opportunity to challenge myself and enhance my skills.</p>
        <p className="about-text fade-in">With a solid foundation in HTML, CSS, JavaScript, and React, I have embarked on my journey into the world of full-stack development. I have hands-on experience in building web applications using the MERN (MongoDB, Express.js, React.js, Node.js) stack, and I am proficient in implementing features such as JWT authentication to ensure secure user authentication and authorization.</p>
        <p className="about-text fade-in">My passion for coding and problem-solving drives me to seek new challenges and push the boundaries of what I can achieve. I am dedicated to delivering high-quality solutions and providing exceptional user experiences through clean, efficient, and well-documented code.</p>
        <p className="about-text fade-in">I am excited about the opportunity to contribute my skills and enthusiasm to your project and to be a part of your team. Let's collaborate and create something amazing together!</p>

        
      </div>

<Link to='/home'  ><button type="button" class="btn btn-light">Please go back to home</button></Link>

</div>
  
      );
    }
    
    export default About;