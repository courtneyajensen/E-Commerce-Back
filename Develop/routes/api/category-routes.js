const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try{
    const allCategories = await Category.findAll({
      include:[{model: Product}],
    })
    res.status(200).json(allCategories)
    console.log('Success')
  }catch(e){
    res.json(e)
  }
});

//finds categories by 'id' value
router.get('/:id', async (req, res) => {
  try{
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    res.status(200).json(oneCategory)
    console.log('Success!')
  }catch(e){
    res.json(e)
  }
});

//Creates a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body)
    res.status(200).json(newCategory)

    if (!newCategory) {
      res.status(404).json({ message: 'No Category Found!'});
      return;
    }
  }catch(e) {
    res.json(e)
  }
});

//UPdates a category by its 'id'
router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'Id Not Found!' });
      return;
    }
    res.json(categoryData);
  })
  .cath(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//Deletes a category by its 'id'
router.delete('/:id', async (req, res) => {
  try{
    const deleteCategory = await Category.delete({
      where: {id: req.params.id}
    })
    res.status(200).json(deleteCategory)
  }catch(e) {
    res.status(500).json(err)
  }
});

module.exports = router;
