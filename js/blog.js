let blogBaseUrl = 'https://eastindotravelguide.com/blog/wp-json/wp/v2/posts?per_page=4';

// display the data 
const app = document.getElementById('blogposting');

// string to html 
var stringToHTML = function (str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};

// fetching api from wordpress
fetch(blogBaseUrl, {
    method: 'GET'
}).then(function (response){
    // The API call was successful!
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (data) {
	// This is the JSON from our response
    console.log(data);
    data.forEach((blog) => {
        const container = document.createElement('div')
        container.classList.add('col-lg-3','col-md-6','single-blog');
        app.appendChild(container);

        const thumb = document.createElement('div');
        thumb.classList.add('thumb');

        // blog image
        const blogImg = document.createElement('IMG');
        blogImg.classList.add('img-fluid');
        blogImg.setAttribute("src", blog.better_featured_image.source_url);
        thumb.appendChild(blogImg);

        // blog creation date
        const blogcdate = document.createElement('p');
        blogcdate.classList.add('date');
        const newFormatDate = new Intl.DateTimeFormat("en-GB", blog.date).format();
        blogcdate.textContent = `${newFormatDate}`;

        // link
        const blogLink = document.createElement('a');
        blogLink.setAttribute("href", `${blog.link}`);
        
        // link title
        const blogLinkTitle = document.createElement('h4');
        blogLinkTitle.textContent = `${blog.title.rendered}`;
        blogLink.appendChild(blogLinkTitle);

        // Create a p and set the text content to the film's description
        const p = document.createElement('p');
        const blogContent = stringToHTML(blog.content.rendered);
        p.textContent = `${blogContent.textContent.substring(0, 100)}...` // Limit to 300 chars, End with an ellipses


        // Append the cards to the container element
        container.appendChild(thumb);
        container.appendChild(blogcdate);
        container.appendChild(blogLink);
        container.appendChild(p);
    })
}).catch(function (err) {
	// There was an error
    console.warn('Something went wrong.', err);
    console.log(err);
});