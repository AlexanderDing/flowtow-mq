/*
 *
 * Module: views.js
 * < short description: This module implements view functions for the whole application>
 *
 * Student Name: Zhixu Ding
 * Student Number: xxxxxxxx
 *
 */
export {samplePostView, popularDisplayView, recentDisplayView, postView, loginView, myPostsView, allPostsView, postFormView, commentsView, commentFormView};
import {Model} from './model.js';

//View template for "Three Posts" section on the main page.
function samplePostView (targetname) {

    let target = document.getElementsByClassName(targetname);
    let template = Handlebars.compile(
        document.getElementById("sample-list-template").textContent
    )

    for (let i=0; i<target.length; i++){

        let list = template({'sample': Model.getRandomPosts(1)})
        target[i].innerHTML = list;

    }

}
//View template for "Popular Posts" section on the main page.
function popularDisplayView(targetname){

    let target = document.getElementsByClassName(targetname);
    let template = Handlebars.compile(
        document.getElementById("display-list-template").textContent
    ) 

        target[0].innerHTML = template({'display': Model.getPopularPosts(10)})

}//View template for "Recent Posts" section on the main page.
function recentDisplayView(targetname){

    let target = document.getElementsByClassName(targetname);
    let template = Handlebars.compile(
        document.getElementById("display-list-template").textContent
    )

        target[0].innerHTML = template({'display': Model.getRecentPosts(10)})

}
//View template for Single Post View
function postView (targetname, post) {

    let target = document.getElementById(targetname)
    let template = Handlebars.compile(
        document.getElementById("post-template").textContent
    )

    target.innerHTML = template(post);

    }
//View template for login form and after logging in.
function loginView(targetname, user){

    let target = document.getElementById(targetname)
    let template = Handlebars.compile(
        document.getElementById("login-template").textContent
    )

    target.innerHTML = template({'user': user});

}
//View template for "My Posts" section.(Logged-in users only)
function myPostsView(targetname, userid){

    let target = document.getElementById(targetname);
    let template = Handlebars.compile(
        document.getElementById("my-posts-template").textContent
    ) 
    target.innerHTML = template({'display': Model.getUserPosts(userid)})

}
//View template for post form.(Logged in users only)
function postFormView(){

    let postform = document.getElementById("my-posts")
    let postFormTemplate =  Handlebars.compile(
        document.getElementById("postform-template").textContent
    )
    postform.innerHTML = postFormTemplate({})

}
//View template for "All Posts" section.(Available to all users)
function allPostsView(targetname){

    let posts = Model.getPosts();
    let count = 0;

    for (let i =0; i<posts.length;i++){

        count++

    }

    let target = document.getElementById(targetname);
    let template = Handlebars.compile(
        document.getElementById("display-list-template").textContent
    ) 
        target.innerHTML = template({'display': Model.getRecentPosts(count)})

}
//View template for displaying comments in the Single Post View.(Logged-in users only)
function commentsView(targetname, comments){

        let data = comments
        let temp = data.slice();

        for (let i = temp.length-1; i>0; i--){

            for (let j = 0; j<i; j++){

                if(temp[j].published_at < temp[j+1].published_at){

                    [temp[j], temp[j+1]] = [temp[j+1], temp[j]];

                }

            }

        }

        let target = document.getElementById(targetname);
        let template = Handlebars.compile(
            document.getElementById("comment-template").textContent
        ) 
        target.innerHTML = template({'comment':temp})

}
//View template for disoplaying comment form.(Logged-in users only)
function commentFormView(){
    let commentform = document.getElementById("comment-form")
    let commentFormTemplate =  Handlebars.compile(
            document.getElementById("commentform-template").textContent
        )
        commentform.innerHTML = commentFormTemplate({})
}




