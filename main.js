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
		return s3.upload(params).promise()
		.then (function(result){
			return result;
		})

	})
	.catch(function(error){
		console.log(error);
	})
	e.preventDefault();
}
