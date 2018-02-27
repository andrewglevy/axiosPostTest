
const form = document.getElementById('postForm');
form.addEventListener('submit', function(event){
	event.preventDefault();
	let formdata = new FormData(event.target);
	console.log(formdata);

	const result = document.getElementById('result');
	result.innerHTML = '';

	axios.post('https://2gi7ndbzoe.execute-api.us-west-2.amazonaws.com/dev/get-key', JSON.stringify({"data": "data"}))
	.then(function(response) {
		const url = response.data.url;
		console.log(url);
		result.innerHTML = '<h3">URL: </h3><p style="word-wrap:break-word">' + url + '</p>';
		return url;
	})
	.then(function(url) {

		return axios.put(url, formdata.get('file'), {
			headers: {
				'content-type': 'application/octet-stream'
			}
		});
	})
	.catch(function(error){
		console.log(error);
		result.innerHTML = 'An error occurred.';
	});
});
