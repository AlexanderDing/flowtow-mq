# COMP2110/6110 - FlowTow Web Application

Student Name: Zhixu Ding
Student Number: 44463529

Functionality achieved is describes below, under the level listed in the assignment specifications.

Level 1: The functionalities achieved at level 1 are described as follows:

1. Navigation
   As a visitor to the site, when the main page is loaded, a naviagtion bar is shown on top to the user with two links: Home (#) and About (#whatis).

2. Welcome to FlowTow
   As a visitor to the site, when the main page is loaded, the user sees the title text (i.e., heading) "Welcome to FlowTow!" at the center of the heading part of the page.

3. Three Posts
   As a visitor to the site, when I load the main page the user sees three posts displayed showing the associated images, each labelled with a caption, an author, and the number of likes.

   Each post is contained in a <div> with class 'flowtow', and that div contains the image, the caption, the author, and the number of likes.

4. Ten Most Recent Posts
   As a visitor to the site, when I load the main page, under the heading and 'Three Posts' on the top, I see a list of the ten most recent posts. In it for each post, I see the thumbnail image, the caption, the post date, the user who posted it, and the number of likes.

5. Ten Most Popular Posts
   As a visitor to the site, when I load the main page, under the heading and 'Three Posts' on the top, I see a list of the ten most popular posts. In it for each post, I see the thumbnail image, the caption, the post date, the user who posted it, and the number of likes.

6. Like Buttons
   As a visitor to the site, when I load the main page I see a button next to each post in both lists (Most Popular and Most Recent) with the text 'Like'.

7. Link to About Section
   As a visitor to the site, when I load the main page I see a link 'About' in the navigation bar linked to the About Section on the main page. This section contains a title called 'what is FlowTow' and some brief introduction of the page.

8. CSS Stylesheet
   This page is linked to a proper CSS Stylesheet file and has a rather unique color scheme.

Level 2: The functionalities achieved at level 2 are described as follows:

1. Three Posts
   As a visitor to the site, when I load the main page I see three posts displayed showing the associated images, each labelled with a caption, an author, and the number of likes. The three posts are picked at random from the database, i.e., every time the page is loaded, the Three Posts part contains different posts.

2. Ten Most Recent Posts & Ten Most Popular Posts
   The two lists are displayed and have identical fields. The only difference: the sorting of each list. For each post, the following information is displayed: thumbnail of the image, caption, author, post date, number of likes, 'Like' button

3. A Single Post View
   As a visitor to the site, when I click on the image of any post on the main page, the page is reloaded in a 'Single Post' view. For each post, in the 'Single Post' view, the following information is displayed: the image (larger version instead of a thumbnail), caption, author, post date, number of likes, 'Like' button. The 'Single Post' view has the URL /#!/posts/id, where 'id' is the id of the currently viewed post.

4. Liking a Post
   The addLike function is not working properly but I've given it a solid attempt. The details are stated in the file named Model.js.

Level 3: The functionalities achieved at level 3 are described as follows:

1. Navigation
   As a visitor to the site, when I load the main page I see the navigation bar with the links: Home (#), All Posts (#!/all-posts), My Posts (#!/my-posts) and About (#whatis).

2. Login Form
   As a visitor to the site, when I load the main page, I see a form with entry boxes for username and password and a button labelled 'Login'. The login form has the id 'loginform' and uses fields named 'username' and 'password'. The login request will be sent to the url: /auth/local.

3. Logging In
   As a registered user, when I enter my username and password into the login form and click on the 'Login' button, the response is a redirect to the main page (#). When my browser loads that page I see the normal main page with the login form replaced by the message 'Logged in as'+my username.

4. Failed Login
   Failed to display login failed message.

5. Name Visibility
   As a logged-in user, every view that I request contains my name (username) on the top right under the navigation bar.

6. All Posts View
   As a visitor (or a logged-in user, apparently) I can view all posts with the associated captions and comments when I select the 'All Posts' link. The 'All Posts' view displays all posts with the most recent posts on top. The 'All Posts' view will have the URL /#!/all-posts.

7. My Posts View
   As a logged-in user, I see a link in the navigation bar on the main page titled 'My Posts'. When I click on it, I can see all my own posts, with the following information: image, caption, post date, number of likes. The 'My Posts' view displays all posts with the most recent posts on top. The 'My Posts' view will have the URL /#!/my-posts.

   If I am not logged in as a user and try to access the 'My Posts' view, a message 'You have to login first' is displayed until I either login or refresh the main page by requesting other views (e.g., 'Home' and 'All Posts').

Level 4: The functionalities achieved at level 4 are described as follows:

1. Post Form in My Posts View
   As a logged-in user, when I load the 'My Posts' view, I see a form that has entry boxes for a URL for the image and a caption for the image and a button labelled 'Create a Post'. The post form has the id 'postform' and uses fields named 'p_url' and 'p_caption'.

2. Create a Post in My Posts View
   As a logged-in user, when I load the 'My Posts' view and input the URL and caption for the post, and click on the 'Create a Post' button, a new record in the database is created in table Post with the URL in the form put in 'p_url' along with my username in 'p_author', 'p_likes'(set to 0) and the caption in 'p_caption'.

   The page returned is the 'My Posts' view and the newly created post is the first post on the page i.e. 'My Posts' sorted in a most recent first fashion.

3. Show All Comments in Single Post View
   As a logged-in user, when I load the 'Single Post' view for a post, I can see all the comments for the currently viewed post order by most recently added on top, along with all the information required in Level 2 (except likeing a post).

4. Comment Form in Single Post View
   As a logged-in user, when I load the 'Single Post' view for a post, I can see a comment form which has the following: an entry box for the comment and a 'Add a Comment' button.

   The form has the id 'commentform' and will use a filed named 'c_content'.

5. Add a Comment in Single Post View
   I can enter my comment for the post. I then click on the 'Add a Comment' button and a new record is created in the database table Comment. It contains my comment in 'c_content' along with my username in 'c_author', and the associated post id in 'c_post'. I can post a comment to any of the posts on the site, including my own, so that I could reply to other user's comments. However, after posting the view is not refreshed, also the post object can't seem to find associated comment, but not vice versa.

Level 5: The functionalities achieved at level 5 are described as follows:

1. Upload Local Images using 'p_image' Field and the Media Library in Strapi
   As a logged-in user, I can create a post by uploading a local image into the Media Library in Strapi.

2. Delete a Post (as a logged in user) from the My Posts View
   As a logged-in user, I can delete any of my own posts. After a post is deleted, all associated comments with it are deleted too. However, this function is faulty since he delete button doesn't work when the user first goes to "My Posts" view, instead, the user has to go to "All Posts" view first and then come back, and they now can delete the desired posts. But the page is not autmatically reloaded after deletion.

3. Logging Out
   As a logged-in user, if I click on the 'Logout' button, the view that I get in response is the site main page view which now doesn't have my username and again shows the login form. This function is implemented by firstly store the user data inside the browser local storage when the user logs in, and keeping the data in there during the user is logged in. When the user clicks 'Logout' button, the data inside local storage is cleared as it would be set to null, and the user would redirect to the main page with a cleam login form.
