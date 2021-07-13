export {Model};
import {Auth} from'./service.js'
/*
 *
 * Module: model.js
 * < short description: This module implements accessory functions for the application in terms of efficiency and simplicity. It offers useful functions which can be called in other modules so that the code won't have to be repeated over and over again.>
 *
 * Student Name: Zhixu Ding
 * Student Number: 44463529
 *
 */

/* 
 * Model class to support the FlowTow application
 * this object provides an interface to the web API and a local
 * store of data that the application can refer to.
 * The API generates different events:
 *   "modelUpdated" event when new data has been retrieved from the API
 *   "postAdded" event when a request to add a new post returns
 *   "likeAdded" event when a request to add a new like returns
 *   "commentAdded" event when a request to add a new comment returns 
*/

const Model = {

    postsUrl: '/posts', 
    uploadUrl: '/upload',  
    commentsUrl: '/comments',
    
    //this will hold the post adn comment data stored in the model
    data: {

        posts: [],
        comments:[]

    },

    // updatePosts - retrieve the latest list of posts from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    updatePosts: function() {

        fetch(this.postsUrl)
        .then(

            function(response){
                //parse it into json and return it back
                return response.json(); 
            }

        )
        .then((data) => {

                this.data.posts = data;

                let event = new CustomEvent("modelUpdated")
                window.dispatchEvent(event);

            }

        );

    },

    // getPosts - return an array of post objects
    getPosts: function() {
        //console.log(this.data.posts);
        //before that you may need to sort the posts by their timestamp
        return this.data.posts;
    },

    // getPost - return a single post given its id
    getPost: function(postid) {

        let posts = this.getPosts();

        for (let i = 0; i < posts.length; i++){
            if(posts[i].id === postid){
                return posts[i];
            }

        }

    },
    //set the local posts copy of the Model to the posts that are passed in. 
    setPosts: function(posts) {

        this.data.posts = posts;

    },

    // addPost - add a new post by submitting a POST request to the server API
    // postData is an object containing all fields in the post object (e.g., p_caption)
    // when the request is resolved, creates an "postAdded" event
    addPost: function(pictureData, postData) {

        fetch(this.uploadUrl, {

            method: 'POST',

            headers: {
                Authorization: `bearer ${Auth.getJWT()}`
            },

            body: pictureData

        })

        .then((response) => {

            return response.json()

        })

        .then((data) => {

            console.log('the data is ', data)
            postData = {...postData, "p_url": data[0].url, "p_image": data[0]}

            return fetch(this.postsUrl, {

                method: 'POST',

                headers: {
                'Content-Type': 'application/json',
                Authorization: `bearer ${Auth.getJWT()}`
                },

                body: JSON.stringify(postData)

            })

        })

        .then((response) => {

            return response.json()

        })

        .then((data) => {

            console.log(data)
            this.data.posts.push(data)
            let event = new CustomEvent('postAdded');
            window.dispatchEvent(event)

        })

    },

    // getUserPosts - return just the posts for one user as an array
    getUserPosts: function(userid) {

        let count=0;
        let allPosts = this.getPosts();

        for(let i=0; i<allPosts.length;i++){
            count++
        }

        let posts = this.getRecentPosts(count);
        let userPosts = [];

        for (let i = 0; i < posts.length; i++){

            if(posts[i].p_author.id=== userid){

                userPosts.push(posts[i])

            }

        }

        console.log(userPosts)
        return userPosts;

    },

    // addLike - increase the number of likes by 1 
    //      by submitting a PUT request to the server API
    //      postId - is the id of the post
    // when the request is resolved, creates an "likeAdded" event
    addLikexxx: function (url, postId) {
        //let post = Model.getPost(postId);
        fetch(url, {

            method: 'PUT',

            headers: {

                'Content-Type' : 'application/json',

            },

            body: Model.getPost(postId)

        })

        .then((response) => {

            return response.json()

        })

        .then((data) => {

            console.log(data)
            Model.updatePosts()
            let event = new CustomEvent("postDeleted");
            window.dispatchEvent(event)

        })

    },

    deletePost: function (url, postId) {
       
        fetch(url, {

            method: 'DELETE',

            headers: {

                'Content-Type' : 'application/json',
                Authorization: `bearer ${Auth.getJWT()}`  

            },

            body: Model.getPost(postId)

        })

        .then((response) => {

            return response.json()

        })
        .then((data) => {

            console.log(data)
            Model.updatePosts()
            let event = new CustomEvent("postDeleted");
            window.dispatchEvent(event)

        })

    },
    // addComment - add a comment to a post 
    //      by submitting a POST request to the server API
    //      commentData is an object containing the content of the comment, the author and the postid
    // when the request is resolved, creates an "commentAdded" event
    addComment: function (commentData) {

        fetch(this.commentsUrl, {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json',
                Authorization: `bearer ${Auth.getJWT()}`

            },

            body: JSON.stringify(commentData)

        })

        .then((response) => {

            return response.json()

        })

        .then((data) => {

            console.log('the data is ', data)
            this.data.comments.push(data)
            let event = new CustomEvent('commentAdded');
            window.dispatchEvent(event)

        })
        
    },
    //getRandomPosts - return N random posts as an array
    getRandomPosts: function(N){

        let data = this.getPosts();
        let randArr = [];

        for (var i = 0; i < N; i++) {

              var rand = data[Math.floor(Math.random() * data.length)];
              randArr.push(rand);

            }

            return randArr;

    },

    // getRecentPosts - return the N most recent as an array
    //  posts, ordered by timestamp, most recent first
    getRecentPosts: function(N) {

        let data = this.getPosts();
        let temp = data.slice();

        for (let i = temp.length-1; i>0; i--){

            for (let j = 0; j<i; j++){

                if(temp[j].published_at < temp[j+1].published_at){

                    [temp[j], temp[j+1]] = [temp[j+1], temp[j]];

                }

            }

        }

        temp = temp.slice(0, N);
        return temp;

    },
    // getPopularPosts - return the N most popular as an array
    // posts, ordered by the number of likes
    getPopularPosts: function(N) {

        let data = this.getPosts();
        let list = [];
        let temp = data.slice();

        for (let i = 0, j = i+1; i<data.length; i++){

            list.push(temp.sort((i, j) => j.p_likes - i.p_likes));

        }

        list = list[0].slice(0, N);
        console.log(list);
        return list;
        
    },
    
}