
document.getElementById('postForm').addEventListener('submit', function(e){
	let formText = document.getElementById('formText').value;

	axios.post('https://2gi7ndbzoe.execute-api.us-west-2.amazonaws.com/dev/get-key', JSON.stringify({
		"data": formText})
	)
	.then(function(response){
		let data = response.data.data;
		return [data.bucket, data.Key];
	})
	.then(function(result){
		console.log(result[0], result[1])
		let s3 = new AWS.S3();
        let params = {
			Bucket: result[0],
			Key: result[1],
			Body: formText
		}
		return s3.upload(params).promise()
		.then(function(result){
			return result;
		});

	})
	.catch(function(error){
		console.log(error);
	});
	e.preventDefault();
});
