

document.getElementById('postForm').addEventListener('submit', function(event){
	const formText = document.getElementById('formText').value;
	const result = document.getElementById('x');
	result.innerHTML = '';

	axios.post('https://2gi7ndbzoe.execute-api.us-west-2.amazonaws.com/dev/get-key', JSON.stringify({"data": formText}))
	.then(function(response){
		const url = response.data.url;
		console.log(url);
		result.innerHTML = '<h3>URL: </h3><p style="word-wrap:break-word">' + url + '</p>';
		return url;
	})
	.catch(function(error){
		console.log(error);
		result.innerHTML = '<p>An Error Occurred. See console for details.</p>';
	});

	event.preventDefault();
});
