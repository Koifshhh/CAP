# CAP
Progressive Web Application based around Cornell College's COVID 19 symptom checker 


Armani Rogers
CSC 512 Capstone Proposal: PWA (Progressive Web Application)
What we know about pwa right now:
A progressive web application is a type of application software delivered through the web, built using common web technologies including HTML, CSS and JavaScript. It is intended to work on any platform that uses a standards-compliant browser, including both desktop and mobile devices.
 
Examples include
·         Pinterest. Pinterest decided to build a PWA when they determined that they offered a slow website experience
·         Starbucks. Starbucks launched their PWA in 2017 to provide fast, responsive performance for their customers
·         Twitter. Twitter launched its PWA in 2017
·         Forbes
·         The Washington Post
·         Trivago
·         Lancôme
·         Jumia.
 
What this project will serve to do is provide the Cornell users with an application that can and will keep students and faculty connected and updated with Campus news. Features can include the block clock, weekly schedules for group activities, dining hall, and campus events. For the beta version, the application will function showing the Covid-19 symptom checker. This will be implemented through progressive web design; meaning in the app structure, we can always fall back to the base structure and gracefully apply new features as we progress in the architecture. If the browser only supports the use of HTML, the site will be fully functional for the base requirements of the site. As other capabilities are included in the browser (like JavaScript), based on user input, we can show and hide certain features and sections of the page. To the most modern browsers (most compliant to newer standards), we will be able send application “pushes” to the screen and occupy space on the home screen if the user allows it. As well as allowing the user to interact with the application even when offline.
 
Server-side vs Client-side
We need Server-side for JavaScript
We need Client-side for Html
 
REQUIREMENTS
·         Secure:
A secure connection (HTTPS) over your site makes sure all traffic is as safe as a native app. A secure endpoint also allows the service worker to securely act on the behalf of your app. puTTy
 
·         Standard Manifest:
The site should be controlled by a W3C manifest that determines the experience and behavior of your PWA. This includes everything from images, to language, to the start page of your web app. Everything required for the app to run!
 
·         Network Independent:
The Progressive Web App should have a mechanism (e.g. through a service worker) to help control traffic when the network isn't there or isn't reliable. The app should be able to work independent of network. EXPRESS module required (Python)
 
·         Responsiveness:
The site should be responsive on tablets & mobile devices. We’re specifically to function the mobile devices first.
 
·         Cross-Browser:
The site should seamlessly work on multiple browsers (e.g. Chrome, Edge, Firefox and Safari). EXPRESS module required (Python)
 
·         Deep Linking:
Each page of the site should have a unique URL (individual pages are deep linkable via URLs e.g. to share on social media).
 
We will be using a node.js server so the backend language would be JavaScript. The application is what we are writing.  The backend database would be the request_data table in the health_tracker schema on mysql.cornellcollege.edu server.

The request_data table is a MySql table with the following structure 
id
int(11)
NO
PRI


auto_increment
username
varchar(65)
YES






user_id
varchar(11)
YES






temperature
varchar(5)
YES






symptoms
varchar(500)
YES






other_symptom
varchar(500)
YES






on_campus
varchar(5)
YES






created_date
timestamp
NO


CURRENT_TIMESTAMP


modified
timestamp
NO


CURRENT_TIMESTAMP
on update CURRENT_TIMESTAMP



The frontend work will likely be done using Java. So far, I have reworked the current symptom tracker to include links to CDC information Covid and information on Covid in Iowa. The next order of business is implementing a web service worker to maintain the actions on and offline.

