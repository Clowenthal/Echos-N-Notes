const db = require('../config/connection');
const { User, BlogPost } = require('../models');
const userSeeds = require('./userSeeds.json');
const thoughtSeeds = require('./blogSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('BlogPost', 'blogposts');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < blogSeeds.length; i++) {
      const { _id, blogAuthor } = await BlogPost.create(blogSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: blogAuthor },
        {
          $addToSet: {
            posts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
