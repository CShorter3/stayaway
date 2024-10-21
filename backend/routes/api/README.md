restore user is added to each route to check if user is logged in

require auth is added to check if a user has athentication to access a route

so, restore user populates a user's session with a potentially valid jwt providing require auth validity to process the user's data containg the cookie, checking for authroized attributes.