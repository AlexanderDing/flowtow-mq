/*
 *
 * Module: main.js
 * < short description: This module implements main entry point for the whole web application. It's doing all the calling to satisfy the needs of the application.>
 *
 * Student Name: Zhixu Ding
 * Student Number: xxxxxxxx
 *
 */
import * as views from './views.js'
import {Model} from './model.js';
import {Auth} from'./service.js'
import {splitHash} from './util.js'


//Adding loads of event listeners as required.
window.addEventListener("modelUpdated", function(e){

    views.samplePostView("flowtow");
    views.recentDisplayView("recentposts");
    views.popularDisplayView("popularposts");

    bindings();

})

window.addEventListener('likeAdded', function(e) {

    console.log('likeAdded triggered')
    bindings();

})

window.addEventListener("userLogin", function(e){

    views.loginView("login", Auth.getUser())
    logout_handler()

})

window.addEventListener("postAdded", function(e) {

    console.log('postAdded triggered')
    views.myPostsView("post", Auth.getUser().id)
    bindings();

})

window.addEventListener("postDeleted", function(e) {

    console.log('postDeleted triggered')
    views.myPostsView("post", Auth.getUser().id)
    bindings();

})

window.addEventListener("commentAdded", function(e) {

    var full_url = document.URL; // Get current url
    var url_array = full_url.split('/') // Split the string into an array with / as separator
    var id = url_array[url_array.length-1];
    let post = Model.getPost(Number(id))

    console.log('commentAdded triggered')
    views.commentsView("comment-section", post.p_comment)
    bindings();
    
})

//Some functions to handle events
function post_click_handler () {

    let id = this.dataset.id
    let post = Model.getPost(Number(id))
    let hash = splitHash(window.location.hash);
    
    while(hash.id === this.dataset.id){
    views.postView("post", post)
    let commentform = document.getElementById('commentform');

        if(Auth.getUser()){
            views.commentsView("comment-section", post.p_comment)
            views.commentFormView()
            commentform.onsubmit=comment_form_handler
        }

    }

    views.postView("post", post)

    if(Auth.getUser()){
        views.commentsView("comment-section", post.p_comment)
        views.commentFormView()
        commentform.onsubmit=comment_form_handler
    }

}

function post_delete_handler () {

    let id = this.dataset.id
    let url = "/posts/"+id
    Model.deletePost(url, id)

}

function like_click_handler(){

    let id = this.dataset.id;
    Model.addLike(id);
    let posts = Model.getPosts();

}

function login_form_handler (event) {

    event.preventDefault()
    console.log('the login form is ', this)

    const username = this.elements['username'].value
    const password = this.elements['password'].value

    const authInfo = {
        'identifier': username,
        'password': password
    }

    Auth.login(authInfo)

}

function post_form_handler(event){
    
    event.preventDefault()
    console.log(this)

    const image = this.elements['p_url'].files[0]
    const caption = this.elements['p_caption'].value

    const postData = {
        "p_author": Auth.getUser(),
        "p_url": image.url,
        "p_caption": caption,
        "p_likes": "0",
    }

    const pictureData = new FormData()
    pictureData.append("files", image)

    Model.addPost(pictureData, postData)

}

function comment_form_handler(event){
    
    event.preventDefault()
    console.log(this)

    var full_url = document.URL; // Get current url
    var url_array = full_url.split('/') // Split the string into an array with / as separator
    var id = url_array[url_array.length-1];
    let post = Model.getPost(Number(id))

    const content = this.elements['c_content'].value

    const commentData = {
        "c_author": Auth.getUser(),
        "c_content": content,
        "c_post": post,
    }

    Model.addComment(commentData)

}


function logout_handler(){

document.getElementById("logout-button").onclick = function(){
    window.location.href="../";
    localStorage.removeItem("User Details")
    }

}

function bindings() {
    
    let names = document.getElementsByClassName("post-name");

    for (let i=0; i<names.length; i++) {
        names[i].onclick = post_click_handler
    }

    if(!Auth.getUser()){
    let loginform = document.getElementById('loginform')
    loginform.onsubmit = login_form_handler
    }

}

function redraw(){

    if(window.location.hash === "#!/home"){
        window.location.href="../"
    }

    if(window.location.hash === "#!/my-posts"&&Auth.getUser()){
        views.postFormView()
        views.myPostsView("post", Auth.getUser().id)
        let deletebutton =  document.getElementById("delete-button");
        deletebutton.onclick=post_delete_handler

        let postform = document.getElementById('postform');
        postform.onsubmit=post_form_handler
        bindings()
    }

    else if(window.location.hash === "#!/my-posts"){
        let target = document.getElementById("post")
        target.innerHTML = "You have to login first"
    }

    if(window.location.hash === "#!/all-posts"){
        views.allPostsView("post")
        bindings()
    }

}

window.onload = function() {
    Model.updatePosts();
    views.loginView("login", Auth.getUser());
};

window.onhashchange = redraw;



