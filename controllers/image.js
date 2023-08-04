const handleApiCall = (req, res) => {
    const PAT = 'PAT_Clarifai';
    const USER_ID = 'willy77229';
    const APP_ID = 'smart-brain';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
  
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: req.body.input,
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
  
    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
  
    fetch(
      'https://api.clarifai.com/v2/models/' +
        MODEL_ID +
        '/outputs',
      requestOptions
    )
      .then(response => response.json())
      .then(data => {
        res.status(200).json(data);
      })
      .catch((error) => {
        console.log('error', error);
        return res.status(400).json('unable to work with API');
      });
  };

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