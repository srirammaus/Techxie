local storage :-
    shared b/w all tabs and browser window dont have any expirey
sessionstorage :-
    only exist in current tab , shared b/w iframes in the current tab, it exist even the page refresh , if closed /opened it doesn;t exist
    it never share data b/w other tab or windwos

cookies :-
    by deafult it sent along with server 
    server can manipulate it
    it has expiry

--------------------------------------------
Our parammeters :-
username
password
cpassword
userID
name
phone number
email
sessionID
session or access token
csrf or xsrf token
grant code 
refresh token
F_num or current page
F-id
f-id
f_num

------------------------------------
Places to set our params:-
cookies:
    session id
    session token
    refresh token
    username
    userid
    csrf -temporary

session storage:-
    username

    F_num
    F-id
    f-id
    f_num
localstorage:-
    none

indexDB:-
    