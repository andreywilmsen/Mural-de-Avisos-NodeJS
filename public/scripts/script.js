document.addEventListener("DOMContentLoaded",() =>{
    updatePosts();
})
function updatePosts(){
    fetch("http://localhost:8080/api/all")
    .then(data => {
        return data.json();
    }).then(json => {

        let postElements = '';
        let posts = JSON.parse(json);
        posts.forEach((post) => {
            let postElement = `            
            <div id="${post.id}" class="card">
            <div class="header">
                <h5>${post.title}</h5>
            </div>
            <div class="body">
                <h5>${post.description}</h5>
            </div>
        </div>`
        postElements += postElement;
    });
    document.getElementById('posts').innerHTML = postElements;
    })
}
function newPost(){
    let title = document.getElementById('title').value;
    let description = document.getElementById('desc').value;
    let post = {title, description}
    options = {
        method: "POST",
        headers: new Headers({"content-type":"application/json"}),
        body: JSON.stringify(post)
    }
    fetch("http://localhost:8080/api/new", options)
    .then(data => {
        console.log(data);
        updatePosts()
        document.getElementById('title').value = ""
        document.getElementById('desc').value = ""    
    })
}