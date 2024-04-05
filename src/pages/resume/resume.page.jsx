import "./resume.page.css";

const Resume =() =>{



    return(
        <div class="container">
        <div class="personel-detail">
            <div><h2>Sujan Maharjan</h2></div>
            <div>
                    <p>
                        <span class="detail">Sunakothi,Lalitpur</span>
                        <span class="detail">sujanmaharjan8888@gmail.com</span>
                        <span class="detail">+977 9849248922</span>
                        <span class="detail">09 Nov 1997</span>
                </p> 
                <p>
                    <span class="detail">Nepalese</span>
                    <span class="detail">http://github.com/synasme10</span>
            
                </p>
            </div>
        </div>
    
    
        <div class="mycontainer">
            <h3>Education</h3>
            <div class="education" >
                
                   
                    <p><span class="course">Bsc (Hons) Computing,</span> <span class="institutename">Softwarica College of IT and e-commerce</span> <br/>
                        Achieved Grade: First Class Degree</p>
                
               
                   
                    <p><span class="course">+2, HSEB in Science</span> <span class="institutename">Moon Light Boarding high School</span> <br/>
                    Achieved Grade: First Division</p>
            
                
                    
                    <p><span class="course">S.L.C,</span> <span class="institutename">Shahid Dharma Bhakta School</span><br/>
                    Achieved Grade: Distinction</p>
               
            </div>
            
          
            
            <div class="duration" >
                <p><span>2017 – 2020 <br/>
                    Dilibazar, Kathmandu</span></p>
                    <p><span>2016<br/>
                        Kumaripati, Lalitpur</span></p>
                    <p><span>2013<br/>
                        Nakhhu, Lalitpur</span></p>
            </div>
          
          </div>
    
    
        <div class="interest">
    
            <h3>Interest</h3>
           <div class="hobby"> <ul>
                <li>Coding</li>
                <li>Football</li>
                <li>Playing Chess</li>
                <li>Watching Anime and series</li>
                <li>Drawing</li>
            </ul>
        </div>
        </div>
        <div class="Skills">
    
            <h3>Skills</h3>
            <table class="skill-detail">
                <tr>
                  <td class="skill">HTML/CSS/JS </td>
              
                  <td>Photoshop</td>
                </tr>
                <tr>
                  <td class="skill">PHP</td>
                  <td>Illustrator</td>
                </tr>
                <tr>
                    <td class="skill">Node JS</td>
                    <td>Github</td> 
                </tr>
              </table>
        </div>
    
        <h3>Projects</h3>
        <div class="projects">
    
         
            <p><span class="fontbold">Day Job Application, </span>Web Application and Android Application</p>
          <ul>
            <li>
                The application helps user to find quality worker as per their specification
                with the touch of your finger via web browsing or mobile phone.
               
                </li>
                <li>
                     Designed, developed, and troubleshot software programs for databases and
                    applications using MySQL for database, Bootstrap, CSS, JAVA Android,
                    Node JS.
                </li>
                <li>
                    Created Restful API for web application and android application.
              
                
                </li>
                <li>
                    Documented and tested new software applications.
                </li>
                <li>
                    Participated in all phases of the software development life-cycle.
    
                </li>
          </ul>
    
          <p><span class="fontbold">GearMandu</span></p>
          <ul>
            <li>
                GearMandu E-commerce Website helps to provide quality riding gears and accessories.
            </li>
             <li>
                Designed, developed application with PHP, MySQL, jQuery, Bootstrap, CSS.
            </li>
            <li>
              integrated eSewa application for payment method providing secure environment.
            </li>       
          </ul>
        </div>
    
    
    
    </div>
    
    )
}

export default Resume;