const TABLE = 'post';
const { nanoid } = require('nanoid');
const error = require('../../../utils/error');

module.exports = function (storeDependecy) {
    let store = storeDependecy;
    if(!store) {
        store = require('../../../store/dummy');
    }

    function List() {
        return store.List(TABLE);
    }

    async function Get(id){
        const user = await store.Get(TABLE, id);

        if(!user) {
            throw error('Post Not found');
        }
    }

    async function Update(data, user){
        const post = {
            name: data.name,
            content: data.content,
            createat: new Date(),
            user: user,
        }

        if(!post.id){
            post.id = nanoid();
        }

        return store.Insert(TABLE, post);
    }

    async function Like(post, user){
        const like = await store.Insert(TABLE + '_like', {
            id: nanoid(),
            user: user,
            createat: new Date(),
            post: post,
        });

        return like;
    }

    async function PostLiked(user, post) {
        const users = await store.Query(TABLE + '_like', { user: user }, { post: post});
        return users;
    }

    async function PostLikers(post) {
        const user = await store.Query(TABLE + '_like', { post: post }, { post: post });
        return user;
    }

    return {
        List,
        Get,
        Update,
        Like,
        PostLiked,
        PostLikers
    }
}