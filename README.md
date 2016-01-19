# SaveMe-API
REST API for SaveMe Application

<h3>Endpoints</h3>
<h4> Create a new user:</h4> POST to http://www.savemeapi.herokuapp.com/api/users.  You can pass the following in the body, all as strings:
- name
- email
- phone
- device_id (something I put if you want to generate some device specific metadata)

If successful, this will respond with a JSON with a success message, and the user object.  You should save the _user_id, as this is necessary for creating emergencies.

<h4> Edit user:</h4> PUT to http://www.savemeapi.herokuapp.com/api/users/:user_id  You can pass all the above params in the body.  It will respond with the user object if successful.

<h4> Create contact:</h4> POST to http://www.savemeapi.herokuapp.com/api/contacts  You can pass all the following params in the body:
- name
- email
- phone
all as strings of course
Will return a contact object with an id, you should save this in case you want to edit contacts later
Edit contact same as editing user

<h4> Create emergency: </h4>POST to http://www.savemeapi.herokuapp.com/api/emergencies You can pass the following params in the body:
- user_id
- location (string)

It will return the emergency object, not that useful to you but at least you will know it was successful.  



