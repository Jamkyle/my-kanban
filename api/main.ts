import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from '@koa/bodyparser';

import { helloWorld } from './routes/helloWorld';
import { todos } from './routes/todos';

const app = new Koa();
const router = new Router();

router.get('/', helloWorld);
router.get('/api/todos', todos);

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
