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

Bugs fixed as of 5/5/2026

Cart Component

- Refactored Cart component to use useReducer for promo state management
- Added promoReducer with actions: SET_INPUT, APPLY_SUCCESS, APPLY_FAILURE, CLEAR_PROMO
- Improved state handling for promo input, applied promo, and error messages
- Fixed discount calculation to use promoState.appliedPromo
- Updated JSX to reference promoState properties correctly
- Added useEffect to sync profile form with currentUser changes

Product Tags

- Fixed Shop.jsx to support real tag filtering instead of just searching product names
- Added selectedTag state and updated filtering logic to check product.tags array
- Search now includes both product names and tags for better discoverability
- Tag buttons now toggle selection with visual feedback (highlighted when active)
- Removed unnecessary "Clear Tag Filter" button for cleaner UI

Account Tabs

- Fixed Account component to sync tab selection with URL path using useLocation
- Added getTabFromPath function to handle /account, /account/orders, /account/favourites routes
- Sidebar buttons now navigate properly between profile, orders, and favourites tabs
- Added route alias /account/favorites for better accessibility
- Orders and favourites now display correctly based on currentUser data
- Added useEffect to refresh form data when currentUser changes

MongoDB Cluster Setup

- Updated backend/.env to use MongoDB Atlas cluster connection string
- Added MONGODB_USER and MONGODB_PASSWORD for cluster authentication
- Ready for deployment to Render (backend) and Vercel (frontend)

:D

admin account if na save ba for testing purposes

user: kheniethforthree3s@gmail.com
pass: Aqwf45