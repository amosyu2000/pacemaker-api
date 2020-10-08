# Pacemaker Device Controller-Monitor API

### SFWRENG 3K04 Group L4-2

Group Members
- Manny Lemos (lemosm1)
- Fady Zekry Hanna (zekryhf)
- Andy Pham (phama8)
- Amos Yu (yua25)
- Aaron Li (lia79)

## About

The pacemaker design project is a large portion of the SFWRENG 3K04 Software Development course. This site is a REST API for the pacemaker's Device Controller-Monitor (DCM). It is built using Express, MongoDB, and Node. It is hosted on Google App Engine along with MongoDB Atlas. Find the source code on Github [here](https://github.com/amosyu2000/pacemaker-backend). 

## Documentation

All endpoints respond to POST requests. Make sure each request body has all the necessary parameters with `x-www-form-urlencoded` encoding.

### /user/register

**Parameters**
- username `String`
- password `String`

Register a new user.
<br></br>

### /user/login

**Parameters**
- username `String`
- password `String`

Login as an existing user.
<br></br>

### /user/delete

**Parameters**
- id `String`

Delete an existing user.
<br></br>

### /admin/dropall

**Parameters**
- key `String`

Delete all data from the database.
<br></br>

## License

Find the license file [here](https://github.com/amosyu2000/pacemaker-backend/blob/main/LICENSE).