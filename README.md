![alt text](https://github.com/MikaTan2007/manila-world-university-fair-2025/blob/main/mwuf-v2/public/images/mwuf_logo.png)
# Background

The Manila World University Fair (MWUF) is an annual university fair started by the International School Manila (ISM) in September of 2024. 
There were nearly 2000 students, parents, educators, and international university representatives present on a single day, forging connections and future pathways for students.

The 2024 MWUF Web App was developed in less than 2 months using a technical stack of ReactJS, C# (ASP.NET & SwaggerUI) and msSQL. Owing to the short development timeframe, the app was riddled with multiple bugs, routing issues, and an inefficient architectural front-end -> api -> database pipeline. 

**This is the second version of the MWUF Web Application**, built for the 2025 fair and beyond. 

# Purpose

The MWUF Web App seeks to facilitate the flow of data from university representatives to students in a more straightforward way, making the fair more successful and productive for both sides. This is achieved by allowing university representatives to create profiles on the platform where they can upload essential details such as location, contact email, and more. Once students create an account and provide their personal and academic information, they can indicate their interest in specific universities. This enables university representatives to easily identify interested students and conveniently reach out to them in the future.

# Technical Breakdown and Justification

This app uses a technical stack of NextJS, Tailwind and MongoDB. 

I use the built in NextJS API router to build a functional and more robust API in TypeScript instead of having to create an external API router myself using ASP.NET/SwaggerUI and their associated controllers in a separate enviroment. NextJS also has great support from component-based material UI libraries, such as ShadCN, which is commonly used throughout this project to design the front-end.

In addition, the use of Tailwind has significantly sped up the front-end development process. The 2024 app relied on separate CSS stylesheets which overlapped and caused lots of different minor styling bugs. Tailwind is convenient to use and will show immediate results, in addition to being able to use flexbox easier (in my personal opinion). 

MongoDB is used as the database. I chose MongoDB for their document based database structure, as opposed to the relational database common used by msSQL. In addition to supporting differently styled letters such as: ǎ or é, a document-based architecture makes more sense due to each student or university account being an individual document with differently valued properties. 

Each university account's homepage displays multiple "cards" (built using ShadCN) which displays the information of each indivudal student that has registered themselves under the university account (each card is one student). Each student account's homepage displays all the university cards with the relevant information displayed on each one, in addition to a registration button for each card. Pressing the registration button will send the student's email (collected from sign up) to the MongoDB document of the university, and appended to the attribute _registered_students_. This allows the university homepage to retrieve this list/array and individually query the database for the information using the primary key of the student email. 
 
