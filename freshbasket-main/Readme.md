Bugs fixed as of 5/3/2026

Users Side + Sign up

- card filter fixed
- Order summary card fixed
- phone number condition fixed(now has a maximum of 11 digits and cannot type characters)


Admin Side

- Order's Dashboard fixed into string formatted

Bugs fixed as of 5/4/2026

Admin Customers

- Added users state to AppContext to fetch and provide users data
- Implemented useEffect hook in AppContext to fetch users from backend `/users` endpoint
- Added data transformation to map backend fields (full_name → name, _id → id) to frontend expectations
- Generated dynamic avatars using DiceBear API based on user email/username
- Removed undefined `authenticateAdmin` middleware from `/users` route in backend
- Customers now display correctly with their order history and total spent 

Customer Profile

- Created updateProfileRequest API function in auth.js for backend PATCH integration
- Implemented full profile update functionality in AppContext with data transformation (name → full_name)
- Added loading state while profile is being saved with visual feedback (disabled button, "Saving..." text)
- Added error handling and error message display for failed profile updates
- Added phone number validation (numbers only, max 11 digits) matching SignUp form constraints
- Phone field now validates input in real-time, preventing non-numeric characters
- Added success notification alert when profile updates successfully
- Profile updates now persist to localStorage and sync with AuthContext
- Save button disabled during API request to prevent duplicate submissions
- Added updateUser method to AuthContext to sync profile changes with currentUser state
- Full name and other profile fields now update immediately in the UI after save (fixed display issue)
- Fixed backend PATCH endpoint to only hash password when it's being updated (was failing on profile-only updates)

:D

admin account if na save ba for testing purposes

user: kheniethforthree3s@gmail.com
pass: Aqwf45