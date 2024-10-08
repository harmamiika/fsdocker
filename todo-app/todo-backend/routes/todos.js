const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const redis = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
      done: false,
    });

    const todosCount = Number(await redis.getAsync('added_todos')) ?? 0;
    await redis.setAsync('added_todos', todosCount + 1);

    res.send(todo);
  } catch (e) {
    res.status(500).send(e);
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  if (req.method === 'POST') {
    return next();
  }

  const { id } = req.params;
  console.log(id, 'id');
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;
  console.log(text, done, 'text, done');

  if (text !== undefined) req.todo.text = text;
  if (done !== undefined) req.todo.done = done;

  await req.todo.save();

  res.json(req.todo);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
