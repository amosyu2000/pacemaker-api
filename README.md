# Pacemaker Device Controller-Monitor API

### SFWRENG 3K04 Lab 4 Team 2

Group Members
- [Aaron Li](https://github.com/aaronhsli) (lia79)
- [Manny Lemos](https://github.com/MannyLemos) (lemosm1)
- [Fady Zekry Hanna](https://github.com/fzhanna) (zekryhf)
- [Amos Yu](https://github.com/amosyu2000) (yua25)
- [Andy Pham](https://github.com/aonday) (phama8)

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

### /user/delete

**Parameters**
- licenseKey `String`
- id `String`

Delete an existing User. Responds with a confirmation message.
<br></br>

### /bundle/addnew

**Parameters**
- licenseKey `String`
- id `String`
- *MODE* `Number`
- *VOLTAGE* `Number`
- *LOWER_RATE_LIMIT* `Number`
- *UPPER_RATE_LIMIT* `Number`
- *MAX_SENSE* `Number`
- *AV_DELAY_FIXED* `Number`
- *AV_DELAY_DYNA* `Number`
- *AV_DELAY_SENSED* `Number`
- *ATR_AMP* `Number`
- *VENT_AMP* `Number`
- *ATR_PW* `Number`
- *VENT_PW* `Number`
- *ATR_SENS* `Number`
- *VENT_SENS* `Number`
- *VRP* `Number`
- *ARP* `Number`
- *PVARP* `Number`
- *PVARP_EXT* `Number`
- *HYSTERESIS* `Number`
- *RATE_SMOOTH* `Number`
- *ATR_DUR* `Number`
- *ATR_FALLBACK_MODE* `Number`
- *ATR_FALLBACK_TIME* `Number`
- *VENT_THRESH* `Number`
- *ATR_THRESH* `Number`
- *ACTIVITY_THRESH* `Number`
- *REACT_TIME* `Number`
- *RESP_FACTOR* `Number`
- *RCVR_TIME* `Number`

Create a new Bundle. The "id" parameter should be the id of the associated User. Programmable parameters are defined [here](https://github.com/amosyu2000/pacemaker-api/blob/main/models/bundle.js). Responds with the newly created Bundle document.
<br></br>

### /bundle/getall

**Parameters**
- licenseKey `String`
- id `String`

Get all bundles associated to a User. Responds with an array of Bundle documents, sorted by newest date.
<br></br>

### /admin/dropall

**Parameters**
- adminKey `String`

Delete all data from the database. Responds with a confirmation message.
<br></br>

## License

Find the license file [here](https://github.com/amosyu2000/pacemaker-api/blob/main/LICENSE).