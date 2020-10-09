# Pacemaker Device Controller-Monitor API

### SFWRENG 3K04 Group L4-2

Group Members
- [Amos Yu](https://github.com/amosyu2000) (yua25)
- Andy Pham (phama8)
- Manny Lemos (lemosm1)
- [Fady Zekry Hanna](https://github.com/fzhanna) (zekryhf)
- [Aaron Li](https://github.com/aaronhsli) (lia79)

## About

The pacemaker design project is a large portion of the SFWRENG 3K04 Software Development course. This site is a REST API for the pacemaker's Device Controller-Monitor (DCM). It is built using Express, MongoDB, and Node. It is hosted on Google App Engine along with MongoDB Atlas. Find the source code on Github [here](https://github.com/amosyu2000/pacemaker-backend). 

## Documentation

All endpoints respond to POST requests. Make sure each request body has all the necessary parameters with `x-www-form-urlencoded` encoding. Parameters that are italicized are optional, all others are required.

### /user/register

**Parameters**
- username `String`
- password `String`

Register a new User. Responds with the User document that was just registered.
<br></br>

### /user/login

**Parameters**
- username `String`
- password `String`

Login as an existing User. Responds with the document of the User that logged in.
<br></br>

### /user/delete

**Parameters**
- id `String`

Delete an existing User. Responds with a confirmation message.
<br></br>

### /bundle/addnew

**Parameters**
- id `String`
- *p_pacingState* `String`
- *p_pacingMode* `String`
- *p_hysteresis* `Boolean`
- *p_hysteresisInterval* `Number`
- *p_lowrateInterval* `Number`
- *p_vPaceAmp* `Number`
- *p_vPaceWidth* `Number`
- *p_VRP* `Number`

Create a new Bundle. The "id" parameter should be the id of the associated User. Responds with the newly created Bundle document.
<br></br>

### /bundle/getall

**Parameters**
- id `String`

Get all bundles associated to a User. Responds with an array of Bundle documents, sorted by newest date.
<br></br>

### /bundle/getlatest

**Parameters**
- id `String`

Responds with the most recent Bundle of a User.
<br></br>

### /admin/dropall

**Parameters**
- key `String`

Delete all data from the database. Responds with a confirmation message.
<br></br>

## License

Find the license file [here](https://github.com/amosyu2000/pacemaker-backend/blob/main/LICENSE).