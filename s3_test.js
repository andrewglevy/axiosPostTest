
let data;
let key;
let bucket;
let err;


function generateSuccessHTMLOutput(response){
	data = response.data.data;
	console.log(data);
	key = data.Key;
	console.log(key);
	bucket = data.bucket;
	return '<h4>Result: </h4> <p>' + 'key: ' + key + '<br />' +
	'bucket: ' + bucket + '</p>';
}
function generateErrorHTMLOutput(error){
	err = error.response;
	console.log('error: ', error)
	return '<h4>Result:>/h4> <p>' + err + '<p>';
}

document.getElementById('postForm').addEventListener('submit', performPostRequest);
function performPostRequest(e) {
	let result = document.getElementById('result');
	let attachment = document.getElementById('attachment').value;
	result.innerHTML = '';

	axios.post('https://2gi7ndbzoe.execute-api.us-west-2.amazonaws.com/dev/get-key', JSON.stringify({
			"data": "data"})
		)
		.then(function(response){
			result.innerHTML = generateSuccessHTMLOutput(response);
		})
		.catch(function(error){
			generateErrorHTMLOutput(error);
		})
		e.preventDefault();

	}
