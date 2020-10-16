# Pacemaker Device Controller-Monitor API

### SFWRENG 3K04 Lab 4 Team 2

Group Members
- [Amos Yu](https://github.com/amosyu2000) (yua25)
- [Andy Pham](https://github.com/aonday) (phama8)
- [Aaron Li](https://github.com/aaronhsli) (lia79)
- [Fady Zekry Hanna](https://github.com/fzhanna) (zekryhf)
- Manny Lemos (lemosm1)

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
- *MODE* `Number` `1`
- *LOWER_RATE_LIMIT* `Number` `60`
- *VOLTAGE* `Number` `3.3`
- *UPPER_RATE_LIMIT* `Number` `120`
- *MAX_SENS* `Number` `0`
- *AV_DELAY_FIXED* `Number` `0`
- *AV_DELAY_SENSED* `Number` `0`
- *ATR_AMP* `Number` `3.5`
- *VENT_AMP* `Number` `3.5`
- *ATR_PW* `Number` `10`
- *VENT_PW* `Number` `10`
- *ATR_SENS* `Number` `2.4`
- *VENT_SENS* `Number` `2.4`
- *VRP* `Number` `320`
- *ARP* `Number` `250`
- *PVARP* `Number` `250`
- *PVARP_EXT* `Number` `0`
- *HYSTERESIS* `Boolean` `false`
- *RATE_SMOOTH* `Number` `0`
- *ATR_DUR* `Number` `0`
- *ATR_FALLBACK_MODE* `Number` `0`
- *ATR_FALLBACK_TIME* `Number` `0`
- *ACTIVITY_THRESH* `Number` `0`
- *VENT_THRESH* `Number` `2.2`
- *ATR_THRESH* `Number` `1.8`
- *REACT_TIME* `Number` `0`
- *RESP_FACTOR* `Number` `0`
- *RCVR_TIME* `Number` `0`

Create a new Bundle. The "id" parameter should be the id of the associated User. Responds with the newly created Bundle document.
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