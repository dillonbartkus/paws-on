const Paws = require('./model');
const {hashPassword, checkPassword, genToken} = require('./auth.js')

const controller = {};

controller.login = async (req, res) => {
  const { pw, email } = req.body;

  try {    
    const data = await Paws.findUser(email)
    const passwordIsCorrect = await checkPassword(pw, data.password)    
    if(passwordIsCorrect) {
        const token = await genToken(data)
        res.json({
          data: data,
          token: token
        })
      }
    }
    catch(err) {
      res.status(500).json({ err })
    };
};

controller.createUser = async (req, res) => {
  const { email, name, password, city, avatar } = req.body;
  
  const password_digest = await hashPassword(password);
  
  Paws.createUser({
    email,
    name,
    password: password_digest,
    city,
    avatar
  })
   .then( data => {
      res.json({
        message: 'created',
        data: data
      });
    })
    .catch(err => {
      console.log(Paws)
      res.status(500).json({ err })
    });
}

controller.getFeed = async (req, res) => {

  try {    
    const data = await Paws.getFeed()
      res.json({
        data: data
      })      
  }

  catch(err) {
    res.status(500).json({ err });
  }
};

controller.getPostInfo = async (req, res) => {
  const id = req.params.id

  try {
    const data = await Paws.getPostInfo(id)
      res.json({
        data: data
      })
  }

  catch(err) {
    res.status(500).json({ err });
  } 
}

controller.getUserBookmarks = async (req, res) => {
  const id = req.params.id

  try {
    const data = await Paws.getUserBookmarks(id)
      res.json({
        data: data
      })
  }

  catch(err) {
    res.status(500).json({ err })
  } 
}

module.exports = controller;