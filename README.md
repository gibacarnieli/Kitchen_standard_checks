# Kitchen Standard Checks

## Description

The last project that I created for this course is a kitchen standard check to be implemented in any restaurant and the owner be able to record his fridge temperature and cooked meat as per law in Food Safety.

## Deployment Link

[Kitchen Standard](https://kitchen-standard-checks-bbd60a709900.herokuapp.com/)

## Getting Started / Code Installation

bcrypt
Axios
bootstrap
dotenv
express
jsonwebtoken
mdb-react-ui-kit
Neon
react-bootstrap
react-router-dom
sass
vite
@fortawesome/fontawesome-svg-core
@fortawesome/free-brands-svg-icons
@fortawesome/react-fontawesome
@vitejs/plugin-react-swc

## Timeframe

I had a 9-day timeline to successfully deliver the project. Beginning with thorough research, I meticulously outlined a wireframe using Trello. Leveraging the platform further, I strategically assigned tasks, prioritising the areas I aimed to address first. The conceptual groundwork was laid out in my mind prior to project commencement. Notably, this project was executed independently.

## Technologies

Frontend: React.js, Bootstrap, React Router Dom
Backend: Django, Neon
Styling: SASS, Bootstrap
Other Tools: Axios, JSON Web Token, Bcrypt, Dotenv
Build Tools: Vite, SASS Compiler
Libraries: Font Awesome (Font Awesome SVG Core, Free Brands SVG Icons, React Font Awesome)
Deployment: Heroku (for hosting the application)"

## Brief

* **Build a full-stack application** by making your own backend and your own front-end
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Complex Functionality** like integrating a 3rd party API or using a particularly complex React Component would mean that the CRUD and multiple relationships requirement can be relaxed, speak to your instructor if you think this could be you.
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.
* A **working app** hosted on the internet
* A **link to your hosted working app** in the URL section of your Github repo
* A **git repository hosted on Github**, with a link to your hosted project, and frequent commits dating back to the _very beginning_ of the project

## Planning

This was the wireframe that I created before commencing my project. I had the freedom to design it according to my preferences. My wireframe was well-structured, outlining the various pages and routes we intended to incorporate.

<img width="614" alt="Screenshot 2024-02-09 at 12 44 17" src="https://github.com/gibacarnieli/Kitchen_standard_checks/assets/113900097/4fcbba40-1e10-45f3-afde-4c58b7f59067">

## Build / Code Process

Day 1 – I started to search for the logo and finished my wireframe, as I already had the idea of what I wanted to do. I would like to make a site that it’s able to hold information from a coffee shop or kitchen. 

Day 2 – I initiated the coding from the backend server of my project. This included working on the Neon and establishing the routes for the website. 

I didn't choose to have loads of backserver information, as my important focus was the frontend to be able to display the temperatures and reviews that the user would add to the page.

<img width="615" alt="Screenshot 2024-02-09 at 12 45 06" src="https://github.com/gibacarnieli/Kitchen_standard_checks/assets/113900097/5a5a3350-cbea-4e98-83d9-e8fa5a651b44">

Day 3 –Once the backend server was meticulously structured to ensure seamless functionality, I seamlessly transitioned my focus towards the frontend development phase. Beginning on the inaugural day, I start to implement the login and registration functionalities, meticulously addressing all aspects of authentication necessary to fortify the robustness of my project.

<img width="605" alt="Screenshot 2024-02-09 at 12 45 53" src="https://github.com/gibacarnieli/Kitchen_standard_checks/assets/113900097/d3725f4a-4eab-4863-8e1a-5450f47237ba">

<img width="605" alt="Screenshot 2024-02-09 at 12 46 05" src="https://github.com/gibacarnieli/Kitchen_standard_checks/assets/113900097/f534c9a5-8a63-4f12-a403-3f2ba531918e">

Day 4 - As I embarked on the development of my project, I first contemplated the layout and content organisation for my profile page. After deliberating on which sections to include, I began executing the code to enable the display of fridge temperature on the screen. Concurrently, I initiated the construction of my profile page, aiming to showcase comprehensive information extracted from various sources within the project.
I created the Fridges forms that I had to use at my profile page, with all the information that was important for the user insert.

<img width="424" alt="Screenshot 2024-02-09 at 12 46 31" src="https://github.com/gibacarnieli/Kitchen_standard_checks/assets/113900097/f083d6ea-295c-4f97-8581-d4a436912983">

Day 5 - As I progressed towards achieving my Minimum Viable Product (MVP), I prioritised the completion of all CRUD (Create, Read, Update, Delete) functionalities within my project. To this end, I commenced the development of the handle delete review feature, thereby ensuring the inclusion of all essential components. This entailed orchestrating the seamless removal of reviews, marking a pivotal step in achieving project completeness.

Delving into the technical intricacies, I meticulously gathered the necessary information required for users to delete reviews securely. Employing token-based authentication mechanisms, I established a robust framework to verify user identities, thereby fortifying the authentication process.

Furthermore, I introduced a meaty form tailored specifically for utilisation within the profile page, aiming to streamline the user experience. Leveraging the useEffect hook, I optimised the timing settings to minimise waiting periods, ensuring swift and responsive interactions within the profile environment.

<img width="601" alt="Screenshot 2024-02-09 at 12 46 59" src="https://github.com/gibacarnieli/Kitchen_standard_checks/assets/113900097/9fe5c4e4-5ae3-46c2-9ee1-4dca5238b2ec">

After this, I started to work at the update button that I wanted to display on the page, as I wanted the user to be able to update the meat records.

<img width="607" alt="Screenshot 2024-02-09 at 12 47 16" src="https://github.com/gibacarnieli/Kitchen_standard_checks/assets/113900097/aa09b017-ad22-45cc-aa0f-f08eac537a7f">

Day 5 - I achieved my Minimum Viable Product (MVP). At this point, my focus was on refining the user experience by eliminating errors in my pages and completing any remaining items. 
I started to insert some console.logs to look at any issues that I may face, it turned out that all was running as it should and I started to work into the style.

Day 6 - Commenced styling the project interface, beginning with the creation of the footer section.
Selected the colour palette to be incorporated throughout the project, prioritising hues that maintain a subtle visual impact for potential users. The chosen colours were carefully curated to ensure a harmonious and user-friendly experience.

<img width="405" alt="Screenshot 2024-02-09 at 12 47 46" src="https://github.com/gibacarnieli/Kitchen_standard_checks/assets/113900097/b932d3b5-e959-4606-9c5d-b0586e3ff2ce">

Then I moved to my profile page. I want this page to display the records side by side, meat and fridge, and develop the technical process. It looked exactly how I planned in my mind.

<img width="421" alt="Screenshot 2024-02-09 at 12 48 06" src="https://github.com/gibacarnieli/Kitchen_standard_checks/assets/113900097/b706f6de-7d0e-4e02-9600-7294c3fe6c2a">

Day 7 - I have my project done and ready for deployment.

## Challenges

I had a great experience with this project. The challenge that took me more time to resolve was the token authentication that I was using in my project. I tried to use the same approach as my previous projects, using the token to guarantee the access to the user, but, in this project, I had to use the access Token to reach this, otherwise, the authentication will be returned as failed.

After resolving this problem, all the issues stopped and I could start to display my data at the profile page. I had also an issue with the load data for my page, probably because I used a freesource database holder, then after a research, I saw that it has to be used useeffect to resolve this issue, I changed my code, and all came as should be. 

My personal challenge was implementing the review feature—being able to display it on the page and enabling only the user who wrote it to delete it. Initially, I thought it would be simpler, but after encountering a few issues with the code, everything started functioning as intended.

## Wins

Throughout my project journey, I encountered various challenges and achieved significant wins. One notable triumph was overcoming the hurdle of implementing token authentication. Initially, I relied on conventional methods, but this project demanded the utilisation of access tokens instead of the usual authorization mechanism. After diligently resolving this issue, all subsequent obstacles ceased, empowering me to seamlessly showcase my data on the profile page.

Additionally, I triumphed over the challenge of loading data efficiently for my page, which was impeded by utilising a freesource database holder. Through thorough research, I identified the need to leverage the useEffect function to address this issue. Implementing this solution involved meticulous code modifications, ultimately leading to the seamless functionality of the page.

On a more personal level, I tackled the challenge of implementing the review feature, which involved displaying reviews on the page and enabling only the respective user to delete them. Despite initially underestimating the complexity of this task, I encountered several hurdles during the coding process. However, through persistent troubleshooting and refinement of the code, I successfully achieved the desired functionality, marking a significant personal triumph in the project.

## Bugs

The most significant bug I encountered was related to the review functionality, which initially wasn't working. Apart from this issue, my website is currently free of any other bugs. 

Also had a bug for displaying the name of the user, it's related to the beck server that I filled up, but, as I ran out of time, I couldn’t finish this implementation.

## Future Improvements

Enable users to modify their password, username, or email.
Implement a text saying that the password or email don’t match.
Provide users with the capability to add pictures.
Display in separate pages, Meat Temperature and Fridge Temperature.


