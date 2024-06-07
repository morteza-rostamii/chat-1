<!-- 

# auth from server component

// app/page.tsx
import { cookies } from 'next/headers'; // Import to access cookies
import axios from 'axios';

export default async function Page() {
  // Get cookies from the request headers
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  // Make a request to the API route with the cookie included
  const response = await axios.get('/api/authenticated-route', {
    headers: {
      Cookie: `token=${token}`
    }
  });

====================================

# /register **
# /login **
# /check-auth **
# /create-group **
  # name
  # avatar
  # auth_user_id

  # check if group name not taken

# /update-profile **
  # username
  # image

# /get-group **
  # group_name

  # with: owner
  # with: members
  # with: messages

# /invite-to-group **
  # username
  # group_link

# /join_group **
  # username
  # group_name

# /get-groups (owner) **
  # user_id

# /get-user-groups (member) **
  # user_id

# /search-user **
  # username

# /create-message **
  # sender_id
  # group_name
  # message
  # image?

  # user.groups => his is a member

# /like-message

# /reply-message

# socket stuff:
==
  # show online users
  # group's notification if: message sent
    # send message live, update group
  # join the group notification



 -->