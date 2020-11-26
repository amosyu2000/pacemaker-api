# Pacemaker Device Controller-Monitor API

### SFWRENG 3K04 Lab 4 Team 2

Group Members
- [Aaron Li](https://github.com/aaronhsli) (lia79)
- [Manny Lemos](https://github.com/MannyLemos) (lemosm1)
- [Amos Yu](https://github.com/amosyu2000) (yua25)
- [Andy Pham](https://github.com/aonday) (phama8)
- [Fady Zekry Hanna](https://github.com/fzhanna) (zekryhf)

## About

The pacemaker design project is a large portion of the SFWRENG 3K04 Software Development course. This site is a REST API for the pacemaker's Device Controller-Monitor (DCM). It is built using Express, MongoDB, and Node. It is hosted on Google App Engine along with MongoDB Atlas. Find the source code on Github [here](https://github.com/amosyu2000/pacemaker-api).

## Documentation

All endpoints respond to POST requests. Make sure each request body has all the necessary parameters with `x-www-form-urlencoded` encoding. Parameters that are italicized are optional, all others are required.

### /user/register

**Parameters**
- licenseKey `String`
- username `String`
- password `String`

Register a new User. Responds with the User document that was just registered.
<br></br>

### /user/login

**Parameters**
- licenseKey `String`
- username `String`
- password `String`

Login as an existing User. Responds with the document of the User that logged in.
<br></br>

### /bundle/addnew

**Parameters**
- licenseKey `String`
- id `String`
- *MODE* `Number`
- *UPPER_RATE_LIMIT* `Number`
- *LOWER_RATE_LIMIT* `Number`
- *PVARP* `Number`
- *AV_DELAY* `Number`
- *REACT_TIME* `Number`
- *RESP_FACTOR* `Number`
- *ACTIVITY_THRESH* `Number`
- *RCVR_TIME* `Number`
- *MAX_SENSE* `Number`
- *ATR_AMP* `Number`
- *ATR_PW* `Number`
- *ARP* `Number`
- *ATR_THRESH* `Number`
- *ATR_SENSE* `Number`
- *VENT_AMP* `Number`
- *VENT_PW* `Number`
- *VRP* `Number`
- *VENT_THRESH* `Number`
- *VENT_SENSE* `Number`

Create a new Bundle. The "id" parameter should be the id of the associated User. Programmable parameters are defined [here](https://github.com/amosyu2000/pacemaker-api/blob/main/models/bundle.js) and [here](https://github.com/amosyu2000/pacemaker-dcm/blob/main/src/utils/mode.js). Responds with the newly created Bundle document.
<br></br>

### /bundle/getall

**Parameters**
- licenseKey `String`
- id `String`

Get all bundles associated to a User. Responds with an array of Bundle documents, sorted by newest date.
<br></br>

### /admin/deleteuser

**Parameters**
- adminKey `String`
- id `String`

Delete a single User from the database. Responds with a confirmation message.
<br></br>

### /admin/deleteall

**Parameters**
- adminKey `String`

Delete all data from the database. Responds with a confirmation message.
<br></br>

## License

Find the license file [here](https://github.com/amosyu2000/pacemaker-api/blob/main/LICENSE).