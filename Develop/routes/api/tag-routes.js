const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const allTags = await Tag.findAll({
      include:[{model: Product}],
    })
    res.status(200).json(allTags)
    console.log('Success!')
  }catch(e){
    res.json(e)
  }
});

//Finds single tag by 'Id'
router.get('/:id', async (req, res) => {
  try{
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    res.status(200).json(oneTag)
    console.log('Success!')
  }catch(e){
    res.json(e)
  }
});

//Creates new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag)

    if (!newTag) {
      res.status(404).json({ message: 'No Tag Found!' });
      return;
    }
  }catch(e) {
    res.json(e)
  }
});

//Updates a tag by its 'Id' value
router.put('/:id', async (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'Id not found!'});
        return;
      }
      res.json(tagData);
    });
});

//Deletes a tag by its 'Id' valuse
router.delete('/:id', async (req, res) => {
  try{
    const deleteTag = await Tag.destroy({
      where: {id: req.params.id}
    })
    res.status(200).json(deleteTag)
  }catch(e) {
    res.status(500).json(err)
  }
});

module.exports = router;