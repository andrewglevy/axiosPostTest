
AWS.config.update({
    accessKeyId: "KEY GOES HERE",
    secretAccessKey: "KEY GOES HERE",
    bucket : "s3-post-test",
    region: "us-west-2"
});

document.getElementById('postForm').addEventListener('submit', function(event){
	const formText = document.getElementById('formText').value;

	axios.post('https://2gi7ndbzoe.execute-api.us-west-2.amazonaws.com/dev/get-key', JSON.stringify({
		"data": formText}, {
			headers: {
				'Access-Control-Allow-Credentials': true,
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			}
		})
	)
	.then(function(response){
		const data = response.data.data;
		return [data.bucket, data.Key];
	})
	.then(function(result){
		console.log(result[0], result[1])
		const s3 = new AWS.S3({
			apiVersion: '2006-03-01',
			accessKeyId: "KEY GOES HERE",
			secretAccessKey: "KEY GOES HERE",
			region: "us-west-2",
			params: {
				Bucket: result[0],
				Key: result[1],
				Body: formText
			}
		});
        const params = {
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
	event.preventDefault();
});
