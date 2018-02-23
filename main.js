// function generateSuccessHTMLOutput(response){
// 	data = response.data.data;
// 	console.log(data);
// 	key = data.Key;
// 	console.log(key);
// 	bucket = data.bucket;
// 	return '<h4>Result: </h4> <p>' + 'key: ' + key + '<br />' +
// 	'bucket: ' + bucket + '</p>';
// }
// function generateErrorHTMLOutput(error){
// 	err = error.response;
// 	console.log('error: ', error)
// 	return '<h4>Result:>/h4> <p>' + err + '<p>';
// }

let s3;
let params;

document.getElementById('postForm').addEventListener('submit', performPostRequest)

function performPostRequest(e) {
	let result = document.getElementById('result');
	let formText = document.getElementById('formText').value;
	result.innerHTML = '';

	axios.post('https://2gi7ndbzoe.execute-api.us-west-2.amazonaws.com/dev/get-key', JSON.stringify({
		"data": formText})
	)
	.then(function(response){
		let data = response.data.data;
		return [data.bucket, data.Key];
	})
	.then(function(result){
		console.log(result[0], result[1])
		s3 = new AWS.S3()
        params = {
			Bucket: result[0],
			Key: result[1],
			Body: formText
		}


	})
	.catch(function(error){
		generateErrorHTMLOutput(error);
	})
	e.preventDefault();
}
