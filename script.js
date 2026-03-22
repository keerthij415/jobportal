let jobs = [
    { title: "Java Developer", location: "Chennai", company: "TCS", experience:"2+ yrs", skills:["Java","Spring Boot"], description:"Backend development and API integration." },
    { title: "Frontend Developer", location: "Bangalore", company: "Infosys", experience:"1+ yrs", skills:["HTML","CSS","JS"], description:"Develop UI interfaces and responsive designs." },
    { title: "Python Developer", location: "Hyderabad", company: "Wipro", experience:"2+ yrs", skills:["Python","Django"], description:"Build backend applications in Python." },
    { title: "Full Stack Developer", location: "Chennai", company: "HCL", experience:"3+ yrs", skills:["Java","React","SQL"], description:"Handle full stack application development." },
    { title: "React Developer", location: "Bangalore", company: "Accenture", experience:"2+ yrs", skills:["React","JS","CSS"], description:"Develop frontend React applications." },
    { title: "Backend Developer", location: "Hyderabad", company: "Cognizant", experience:"2+ yrs", skills:["Java","Spring Boot"], description:"Backend services and API development." },
    { title: "UI Developer", location: "Chennai", company: "Zoho", experience:"1+ yrs", skills:["HTML","CSS","JS"], description:"Frontend UI development." },
    { title: "Software Engineer", location: "Bangalore", company: "Capgemini", experience:"3+ yrs", skills:["Java","SQL"], description:"Software development and maintenance." },
    { title: "Angular Developer", location: "Hyderabad", company: "IBM", experience:"2+ yrs", skills:["Angular","TypeScript"], description:"Build dynamic Angular web apps." },
    { title: "DevOps Engineer", location: "Chennai", company: "Tech Mahindra", experience:"3+ yrs", skills:["AWS","Docker","CI/CD"], description:"Manage deployments and automation." },
    { title: "Java Full Stack Developer", location: "Bangalore", company: "Oracle", experience:"3+ yrs", skills:["Java","Spring Boot","React"], description:"Full stack web application development." },
    { title: "Web Developer", location: "Hyderabad", company: "Mindtree", experience:"2+ yrs", skills:["HTML","CSS","JS"], description:"Frontend and web development." },
    { title: "Application Developer", location: "Chennai", company: "L&T Infotech", experience:"2+ yrs", skills:["Java","Spring"], description:"Develop and maintain applications." },
    { title: "Cloud Engineer", location: "Bangalore", company: "Amazon", experience:"3+ yrs", skills:["AWS","CloudFormation"], description:"Design and maintain cloud infrastructure." },
    { title: "System Engineer", location: "Hyderabad", company: "Infosys", experience:"2+ yrs", skills:["Java","SQL"], description:"System analysis and development." },
    { title: "Data Analyst", location: "Chennai", company: "Deloitte", experience:"1+ yrs", skills:["Excel","SQL","Python"], description:"Analyze and visualize data." },
    { title: "QA Tester", location: "Bangalore", company: "Cognizant", experience:"1+ yrs", skills:["Selenium","Testing"], description:"Test applications for quality assurance." },
    { title: "Mobile App Developer", location: "Hyderabad", company: "Flipkart", experience:"2+ yrs", skills:["Flutter","React Native"], description:"Develop mobile applications." },
    { title: "AI Engineer", location: "Chennai", company: "Google", experience:"3+ yrs", skills:["Python","ML","AI"], description:"Build AI/ML models." },
    { title: "Software Developer", location: "Bangalore", company: "Microsoft", experience:"2+ yrs", skills:["C#","SQL"], description:"Software and backend development." },
    { title: "Backend Developer", location: "Pune", company: "Infosys", experience:"2+ yrs", skills:["Java","Spring Boot"], description:"Backend services and API development." },
    { title: "Software Engineer", location: "Mumbai", company: "TCS", experience:"3+ yrs", skills:["Java","SQL"], description:"Software development and maintenance." },
    { title: "UI/UX Designer", location: "Delhi", company: "Adobe", experience:"1+ yrs", skills:["Figma","Photoshop"], description:"Design UI/UX interfaces." },
    { title: "Software Tester", location: "Pune", company: "Capgemini", experience:"1+ yrs", skills:["Selenium","Testing"], description:"Quality assurance and testing." }
];

let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

// DISPLAY
function displayJobs(data) {
    let container = document.getElementById("jobList");
    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = "<h3>No jobs found</h3>";
        return;
    }

    data.forEach((job, index) => {
        container.innerHTML += `
            <div class="job-card">
                <h3>${job.title}</h3>
                <p><b>${job.company}</b> | ${job.location}</p>
                <p>${job.experience}</p>
                <p><b>Skills:</b> ${job.skills.join(", ")}</p>
                <p>${job.description}</p>
                <button class="apply" onclick="openModal('${job.title}')">Apply</button>
                <button class="save" onclick="saveJob(${index})">Save</button>
            </div>
        `;
    });
    displaySavedJobs();
}

// FILTER
function filterJobs() {
    let search = document.getElementById("search").value.toLowerCase();
    let location = document.getElementById("locationFilter").value;
    let company = document.getElementById("companyFilter").value;

    let filtered = jobs.filter(job => {
        return (
            job.title.toLowerCase().includes(search) &&
            (location === "all" || job.location === location) &&
            (company === "all" || job.company === company)
        );
    });

    displayJobs(filtered);
}

// SAVE
function saveJob(index) {
    if (!savedJobs.includes(jobs[index])) {
        savedJobs.push(jobs[index]);
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
        alert("Job Saved!");
        displaySavedJobs();
    } else {
        alert("Already Saved!");
    }
}

// DISPLAY SAVED JOBS
function displaySavedJobs() {
    let container = document.getElementById("savedJobs");
    container.innerHTML = "";
    if(savedJobs.length === 0) {
        container.innerHTML = "<p>No saved jobs</p>";
        return;
    }
    savedJobs.forEach(job => {
        container.innerHTML += `
            <div class="job-card">
                <h3>${job.title}</h3>
                <p><b>${job.company}</b> | ${job.location}</p>
            </div>
        `;
    });
}

// MODAL
let currentJob = "";
function openModal(title) {
    currentJob = title;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function submitForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    if(!name || !email || !phone) {
        alert("Please fill all details!");
        return;
    }

    alert(`${name} applied successfully for ${currentJob}!`);
    closeModal();
}

// EVENTS
document.getElementById("search").addEventListener("keyup", filterJobs);
document.getElementById("locationFilter").addEventListener("change", filterJobs);
document.getElementById("companyFilter").addEventListener("change", filterJobs);

// INITIAL LOAD
displayJobs(jobs);