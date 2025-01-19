# Meet&Mingle - Testing

This is the testing document for the backend of my Meet&Mingle project. If you want to see the README, click [here](README.md).

Visit the deployed website here → [Meet&Mingle](src/documentation/images/resposive.png)

## Content

- [Testing User Stories](#testing-user-stories)
- [Manual Testing](#manual-testing)
  - [Browser Testing](#browser-testing)
- [Validators](#validator-testing)
  - [HTML Validator](#html-validator)
  - [CSS Validator](#css-validator)
  - [JavaScript Validator](#javascript-validator)
  - [Lighthouse](#lighthouse)

## Testing User Stories

- First time visitors

|     | **User Story**                          | **Result**                                                                                                               |
| --- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Understanding the Website's Purpose** | - Clear, concise description of the website’s purpose on the homepage.<br>- Prominent call-to-action to sign up or browse posts. |
| 2   | **Easy Sign-Up Process**                | - Visible “Sign Up” button on the homepage.<br>- Sign-up process is straightforward and requires minimal information initially.   |
| 3   | **Example Post and Groups**           | - Dedicated section displays popular profiles.<br>- Posts are easily browsable.                                         |
| 4   | **Easy Navigation**                     | - Clear and intuitive navigation menu.<br>- Important sections like Posts and user profiles are easy to locate.                  |
| 5   | **Customization Options**               | - Options to filter or search for Post based on interests or keywords.                                                          |

<br>

- Returning Visitors

|     | **User Story**                               | **Result**                                                                                                                                          |
| --- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Seamless Login Experience**                | - Login process is quick and efficient.<br>- Option to stay logged in or remember credentials is available.<br>- Easy access to reset password if needed.        |
| 2   | **View and Manage Upcoming Posts/Events**          | - Easy access to a dashboard or calendar showing upcoming Post the user is registered for.<br>- Option to modify or cancel registrations.                      |
| 3   | **Update Personal Profile**                  | - Easy access to update profile information.<br>- Changes are reflected immediately and consistently across the site.                |

[Back to top](#content)

## Manual Testing

| Feature                    | Expectation                                                                    | Action                                                          | Result |
| -------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------- | ------ |
| Navbar Branding            | Display the brand name as a link to the home page                              | Click on the brand name link                                   | Passed |
| Navbar Toggle              | Expand and collapse the navigation menu on click                               | Click the navbar toggle button                                 | Passed |
| Home Link                  | Navigate to the home page when clicked                                         | Click the home link                                            | Passed |
| Sign In Link               | Navigate to the sign-in page when clicked                                      | Click the sign-in link                                         | Passed |
| Sign Up Link               | Navigate to the sign-up page when clicked                                      | Click the sign-up link                                         | Passed |
| Post Link                | Navigate to the Post page when clicked                                       | Click the Post link                                          | Passed |
| Event Link                | Navigate to the Event page when clicked                                       | Click the Event link                                          | Passed |
| Create Post Link          | Navigate to the create post page when clicked                                | Click the create event link                                   | Passed |
| Create Event Link          | Navigate to the create event page when clicked                                | Click the create event link                                   | Passed |
| My Event Link             | Navigate to the user's Event page when clicked                                | Click the my Event link                                       | Passed |
| Liked Link             | Navigate to the user's likes page when clicked                             | Click the likes link                                       | Passed |
| User Profile Link          | Navigate to the user's profile page when clicked                               | Click the user profile link                                   | Passed |
| Sign Out Modal             | Display a confirmation modal when clicking the sign-out link                   | Click the sign out link                                        | Passed |
| Sign Out Confirmation      | Sign out the user and close the modal upon confirmation                        | Confirm the sign out in the modal                              | Passed |
| Modal Close                | Close the modal without signing out when clicking the cancel button            | Click the cancel button in the modal                           | Passed |
| Modal Cancel               | Cancel sign-out and close the modal without signing out                        | Click the cancel button                                        | Passed |
| Sign Out Functionality     | Successfully sign out the user when confirmed in the modal                      | Confirm sign out and check if the user is signed out            | Passed |
| Responsive Navbar          | Ensure that the navbar is responsive and displays correctly on different screen sizes | Resize the browser window and test the navbar display          | Passed |
| Navbar State Change        | Ensure that the navbar updates correctly based on the user’s authentication state | Toggle between logged in and logged out states                | Passed |
| Click Outside to Close Modal | Ensure that clicking outside the modal closes it                                | Click outside the modal window                                 | Passed |
| Navbar Accessibility       | Ensure the navbar is accessible, including aria-labels and roles                | Use screen readers and keyboard navigation to test accessibility | Passed |
| Username Field           | Field accepts and displays text input                                      | Enter a username and check if it displays correctly             | Passed |
| Password Field           | Field accepts and displays password input (masked)                          | Enter a password and check if it is masked                      | Passed |
| Form Submission          | Submits form and logs in user if credentials are correct                    | Enter valid credentials and submit the form                     | Passed |
| Error Display for Username | Display error messages for invalid username                                | Enter invalid username and check if errors are displayed         | Passed |
| Error Display for Password | Display error messages for invalid password                                | Enter invalid password and check if errors are displayed         | Passed |
| Non-field Errors         | Display non-field error messages if any                                     | Trigger non-field errors and check if they are displayed         | Passed |
| Redirect After Success   | Redirects to the Post page upon successful login                          | Submit valid credentials and check if redirected to /Post      | Passed |
| Form Validation          | Prevent form submission with empty fields                                   | Submit the form with empty fields and check for validation       | Passed |
| Link to Sign Up Page     | Navigate to the sign-up page when clicking the "Sign up now" link            | Click the sign-up link and verify navigation                      | Passed |
| Accessibility            | Ensure form fields and buttons are accessible to screen readers and keyboard navigation | Test with screen readers and keyboard navigation                | Passed |
| Responsive Design        | Ensure the form displays correctly on various screen sizes                   | Resize the browser window and verify form display                | Passed |
| Username Field               | Field accepts and displays text input                                            | Enter a username and check if it displays correctly               | Passed |
| Password Field 1             | Field accepts and displays password input (masked)                                | Enter a password and check if it is masked                        | Passed |
| Password Field 2             | Field accepts and displays password input (masked) for confirmation               | Enter a confirmation password and check if it is masked            | Passed |
| Form Submission              | Submits form and creates user account if input is valid                           | Enter valid credentials and submit the form                       | Passed |
| Error Display for Username   | Display error messages for invalid username                                       | Enter invalid username and check if errors are displayed           | Passed |
| Error Display for Password 1 | Display error messages for invalid password 1                                     | Enter invalid password for the first field and check errors         | Passed |
| Error Display for Password 2 | Display error messages for invalid password 2                                     | Enter invalid confirmation password and check errors               | Passed |
| Non-field Errors             | Display non-field error messages if any                                           | Trigger non-field errors and check if they are displayed           | Passed |
| Redirect After Success       | Redirects to the sign-in page upon successful registration                        | Submit valid registration data and check if redirected to /signin  | Passed |
| Form Validation              | Prevent form submission with empty fields or mismatched passwords                  | Submit the form with empty fields or mismatched passwords and check for validation | Passed |
| Link to Sign In Page         | Navigate to the sign-in page when clicking the "Sign in!" link                      | Click the sign-in link and verify navigation                        | Passed |
| Accessibility                | Ensure form fields and buttons are accessible to screen readers and keyboard navigation | Test with screen readers and keyboard navigation                    | Passed |
| Responsive Design            | Ensure the form displays correctly on various screen sizes                         | Resize the browser window and verify form display                  | Passed |
| Category Field                  | Dropdown menu opens and displays postcategories                  | Choose one category and check if it displays correctly               | Passed |
| Title Field                  | Field accepts and displays text input for the post title                  | Enter a title and check if it displays correctly               | Passed |
| Content Field            | Field accepts and displays text input for the post description            | Enter a description and check if it displays correctly         | Passed |
| Post Hashtags Field             | Field accepts and displays text input for the Hashtags                             | Enter a Hashtag and check if it displays correctly       | Passed |
| Post Inspiration Field             | Field accepts and displays text input for the Inspiration                             | Enter a Inspiration and check if it displays correctly       | Passed |
| Post Image Upload           | Allows image upload and displays the uploaded image                        | Click or tap to upload an image and check if it displays       | Passed |
| Change Image Option          | Displays option to change the image after an image is uploaded              | Upload an image and check if the "Change the image" option appears | Passed |
| Image Removal                | Removes the uploaded image when a new image is selected                     | Select a new image and verify the previous image is removed     | Passed |
| Cancel Button                | Navigates back to the previous page without saving the epost                | Click the "Cancel" button and verify navigation                 | Passed |
| Create Button                | Submits the form and creates the epost when clicked                         | Enter valid data and click the "Create" button                  | Passed |
| Form Validation              | PrPost form submission with invalid or empty fields                       | Try submitting the form with missing or invalid data            | Passed |
| Error Display for Title      | Displays error messages for invalid or empty title field                    | Enter invalid title and check if errors are displayed           | Passed |
| Error Display for Description| Displays error messages for invalid or empty description field              | Enter invalid description and check if errors are displayed     | Passed |
| Error Display for Epost Date | Displays error messages for invalid or empty epost date field               | Enter invalid epost date and check if errors are displayed      | Passed |
| Error Display for Image      | Displays error messages for invalid image upload                            | Upload an invalid image and check if errors are displayed       | Passed |
| Responsive Design            | Ensures the form displays correctly on various screen sizes                 | Resize the browser window and verify form display               | Passed |
| Accessibility                | Ensures form fields, buttons, and image upload are accessible                | Test with screen readers and keyboard navigation                | Passed |
| Redirect After Success       | Redirects to the epost detail page upon successful creation                 | Submit the form with valid data and verify redirection to the epost detail page | Passed |
| Title Field                  | Field accepts and displays text input for the event title                  | Enter a title and check if it displays correctly               | Passed |
| Description Field            | Field accepts and displays text input for the event description            | Enter a description and check if it displays correctly         | Passed |
| Event Start Field             | Field accepts and displays date and time input                             | Enter a date and time and check if it displays correctly       | Passed |
| Event Duration Field             | Field accepts and displays hours, days and months input                             | Enter a date and check if it displays correctly       | Passed |
| Event Location Field             | Field accepts input                             | Enter a text and check if it displays correctly       | Passed |
| Event Image Upload           | Allows image upload and displays the uploaded image                        | Click or tap to upload an image and check if it displays       | Passed |
| Change Image Option          | Displays option to change the image after an image is uploaded              | Upload an image and check if the "Change the image" option appears | Passed |
| Image Removal                | Removes the uploaded image when a new image is selected                     | Select a new image and verify the previous image is removed     | Passed |
| Cancel Button                | Navigates back to the previous page without saving the event                | Click the "Cancel" button and verify navigation                 | Passed |
| Create Button                | Submits the form and creates the event when clicked                         | Enter valid data and click the "Create" button                  | Passed |
| Form Validation              | PrPost form submission with invalid or empty fields                       | Try submitting the form with missing or invalid data            | Passed |
| Error Display for Title      | Displays error messages for invalid or empty title field                    | Enter invalid title and check if errors are displayed           | Passed |
| Error Display for Description| Displays error messages for invalid or empty description field              | Enter invalid description and check if errors are displayed     | Passed |
| Error Display for Event Date | Displays error messages for invalid or empty event date field               | Enter invalid event date and check if errors are displayed      | Passed |
| Error Display for Image      | Displays error messages for invalid image upload                            | Upload an invalid image and check if errors are displayed       | Passed |
| Responsive Design            | Ensures the form displays correctly on various screen sizes                 | Resize the browser window and verify form display               | Passed |
| Accessibility                | Ensures form fields, buttons, and image upload are accessible                | Test with screen readers and keyboard navigation                | Passed |
| Redirect After Success       | Redirects to the event detail page upon successful creation                 | Submit the form with valid data and verify redirection to the event detail page | Passed |
| Initial Data Load         | Displays the list of Post after data is fetched                    | Load the component and verify if Post are displayed             | Passed |
| Search Functionality      | Filters Post based on search query                                 | Enter a search term and verify if the results are filtered        | Passed |
| Infinite Scroll           | Loads more Post when scrolled to the bottom                        | Scroll to the bottom of the list and verify if more Post load    | Passed |
| No Results Message        | Displays a "No Results" message when no Post match the search query | Perform a search with no matching results and verify the message  | Passed |
| Loading Spinner           | Shows a loading spinner while data is being fetched                  | Wait for data to load and check if the spinner appears            | Passed |
| Popular Profiles Section  | Displays popular profiles on the left side of the feed               | Verify the popular profiles section is visible and populated      | Passed |
| Actual Post Section    | Displays actual Posts on the homepage side                  | Verify the actual Post section is visible on larger screens    | Passed |
| Data Fetch Delay          | Displays a loading spinner before data is fully loaded               | Check for a 1-second delay before Post are displayed             | Passed |
| Component Update on Props | Updates event list based on changes to `filter`, `query`, `pathname`, and `currentUser` | Modify props and verify if Post list updates accordingly         | Passed |
| Search Bar Functionality  | Search bar should filter Post dynamically as the user types         | Type into the search bar and verify if the event list filters     | Passed |
| Empty Query Handling      | Does not break the component when the search query is empty           | Clear the search bar and verify that all Post are displayed     | Passed |
| Error Handling            | Handles errors gracefully and does not crash                         | Simulate an error (e.g., using a mock) and check if handled gracefully | Passed |
| Profile Data Loading             | Displays profile data after successful fetch                       | Load the component and verify if profile data is displayed         | Passed |
| Profile Information Display      | Shows profile image, username, followers count, following count, Post count, and attendance count | Verify the profile information is correctly displayed               | Passed |
| Follow/Unfollow Functionality    | Allows the current user to follow/unfollow the profile              | Click the Follow/Unfollow button and check if action is performed  | Passed |
| Profile Edit Dropdown            | Shows the profile edit dropdown if the current user is the profile owner | Verify that the dropdown is visible if the current user is the profile owner | Passed |
| Profile Bio Display              | Shows the profile bio if it exists                                 | Verify the profile bio is displayed if available                   | Passed |
| Profile Post Loading           | Displays profile Post after successful fetch                    | Verify that profile Post are displayed                            | Passed |
| Infinite Scroll for Post       | Loads more Post when scrolled to the bottom                      | Scroll to the bottom of the event list and check if more Post load | Passed |
| No Results Message for Post    | Shows a "No results found" message when no Post are available     | Perform a search with no matching results and verify the message   | Passed |
| Loading Spinner                  | Shows a loading spinner while data is being fetched                 | Wait for data to load and check if the spinner appears             | Passed |
| Popular Profiles Section         | Displays popular profiles on the left side of the feed              | Verify the popular profiles section is visible and populated       | Passed |
| Component Update on Props        | Updates profile and Post data based on changes to `id` and other dependencies | Modify the `id` or other dependencies and verify if data updates accordingly | Passed |
| Error Handling                   | Handles errors gracefully and does not crash                       | Simulate an error (e.g., using a mock) and check if handled gracefully | Passed |

<br>

[Back to top](#content)

### Browser Testing

I tested the website in different browsers, both on computer and mobile.

| Browser         | Result                       |
| :-------------- | :--------------------------- |
| Google Chrome   | The website is responsive.\* |
| Microsoft Edge  | The website is responsive.   |
| Mozilla Firefox | The website is responsive.   |
| Opera           | The website is responsive.   |

\*The website is responsive when using google chrome on mobile. On my computer only I can't test many features because they have to have user authentication and my google chrome wouldn't let me log in, but it worked on other people's google chrome.

[Back to top](#content)

##  Validators

### HTML Validator

[W3C](https://validator.w3.org/) checked the HTML of the website and it passed the validation. A warning message shows up in due to importing the font from Google Fonts.

### CSS Validator

The CSS was validated by [W3C Jigsaw](https://jigsaw.w3.org/css-validator/) and passed the test.

### JavaScript Validator

ESLint was used to validate the JavaScript. However I'm getting the same error on both validators I tried to validate my code. [ESLint Playground](https://eslint.org/play/) and [ESLint Netlify](https://eslint-online-playground.netlify.app/) are showing "Parsing error: Unexpected token < ()" for eveyer single JS file I try to validate.<br>

### Lighthouse

I used [PageSpeed Insights](https://pagespeed.web.dev/) to test the full performance of the website since I can't use google chrome's lighthouse because of the bug that won't let me log in.<br><br>

- Desktop

[Home](src/documentation/images/home.png)<br>

[Feed](src/documentation/images/Feed.png)<br>

[Liked](src/documentation/images/liked_T.png)<br>

[Event](src/documentation/images/event_p.png)<br>

[Sign Up](src/documentation/images/sign_up.png)<br>

[Sign In](src/documentation/images/sign_in.png)<br>

[Profile](src/documentation/images/profil_.png)<br><br>

- Mobile


[Home](src/documentation/images/home_m.png)<br>

[Feed](src/documentation/images/feed_m.png)<br>

[Liked](src/documentation/images/liked_m.png)<br>

[Event](src/documentation/images/event_m.png)<br>

[Sign Up](src/documentation/images/signup_m.png)<br>

[Sign In](src/documentation/images/Signin_m.png)<br>

[Profile](src/documentation/images/profile_m.png)<br><br>

[Back to top](#content)