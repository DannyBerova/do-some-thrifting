# DoSomeThrifting

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.7.

## Introduction

### Do-Some-Thrifting SPA web app is a project undertaken as a mandatory requirement for the course "Angular Fundamentals March 2019" by SoftUni.

## Overall Description

Do-Some-Thrifting is a free web app, online thrift market from family to family. In the project are implemented different user roles: admins, regular and guest users, each with different permissions. Depending on its role, every user can access different sections of the application and has specific permissions of what can or cannot do and see. Users can create, read posts, edit and delete them. Posts can be searched and filtered by category. Users can give likes to a specific post if they are logged in, can comment to a post, see others comments and delete their comments.
You can test project on https://do-some-thrifting-app.herokuapp.com/ .

 P.S In the future many more functionalities will be added.
 
  The public part is visible without authentication. It consists of:
*	Application start page with all posts (from ACTIVE users) paginated on pages by 6, 
	Search form, 
	Block tabs with filters by category, 
*	User login form;
*	User registration form;

  After successful login, registered users can access:
*	User’s profile page with all personal post listed, 
  personal info block, 
  link button to “Destroy profile” page (permanently remove user from database), 
  status info – BLOCKED/ACTIVE;  
*	Every ACTIVE user can see other active users profile page;
*	Create post page (only if user is not BLOCKED);
*	Post details page for each post with ability to give "like" to a post (only if user is not BLOCKED)), comment or delete own comments and link to post creator’s profile page. On own posts – ability to edit or delete post;
*	Edit post page (only applicable to own posts);

  Administrator has administrative access to the system after successful login. In addition to all regular user abilities he has the following:
*	Access to All users list page (table) with personal data row and link to user profile page.
*	Rights to BLOCK/UNBLOCK user (can not BLOCK Admin profile);
*	Rights to DELETE every single post;
*	Rights to DELETE every single comment;

  To test administrator’s functionality use credentials in Login page: Username: Admin and Password: 123456. To test registered user’s functionality register new user with Register form page (directly logged in after successful sign up). Blocked users are like unregistered users and their posts can't be viewed on home page. Blocked user can't create new posts, can’t add comments to posts and can't give stars to other's posts.

## Installation . 

### Server: https://github.com/DannyBerova/do-some-thrifting-db (Express server Api)
  #### Install the dependencies *npm i* and start the client *npm start* or *nodemon* (port: 5000).
  This project was created with [Express] version 4.16.4.
  You can test backend server api https://do-some-thrifting-db.herokuapp.com/post/all (deployed with HEROKU and mLab database).

### Client: https://github.com/DannyBerova/do-some-thrifting (Angular web app)
  #### Install the dependencies *npm i* and start the client *npm s -o* (port: 4200).
  This project was generated with [Angular CLI] version 7.3.7.
  The app will automatically reload if you change any of the source files.
  You can test client app on https://do-some-thrifting-app.herokuapp.com/ (deployed with HEROKU on Express server).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### *Author* 
  Danny Berova https://github.com/DannyBerova/do-some-thrifting



