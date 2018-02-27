const form = document.getElementById('postForm');
form.addEventListener('submit', function(event){
	const formdata = new FormData(event.target);
	const file = formdata.get('file');
	event.preventDefault();
	axios.post('https://2gi7ndbzoe.execute-api.us-west-2.amazonaws.com/dev/get-key', JSON.stringify({'file': file}))
	.then(function(response) {
		return response.data.url;
	})
	.then(function(url) {
		return axios.put(url, file, {
			headers: {
				'content-type': 'application/octet-stream'
			}
		});
	})
	.catch(function(error){
		const result = document.getElementById('result');
		result.innerHTML = '';
		result.innerHTML = 'An error occurred.';
		console.log(error);
	});
});
