import fetch from 'cross-fetch'; 

const returnClarifaiRequestOptions = (imageUrl) => {
    const PAT = '777c777436b64ec59c69efc297a4c726';
    const USER_ID = 'willy77229';
    const APP_ID = 'smart-brain';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const image_URL = imageUrl;
  
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: image_URL,
            },
          },
        },
      ],
    });
  
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Key ' + PAT,
      },
      body: raw,
    };
    return requestOptions;
  };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
    
    const handleApiCall = (req, res) => {
      fetch(
      'https://api.clarifai.com/v2/models/' +
        MODEL_ID +
        '/outputs',
      returnClarifaiRequestOptions(req.body.input)
    )
      .then(response => response.json())
      .then(data => {
        res.status(200).json(data);
      })
      .catch((error) => {
        console.log('error', error);
        return res.status(400).json('unable to work with API');
      });
    }
  

 const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('error'))
}

export { handleImage, handleApiCall}