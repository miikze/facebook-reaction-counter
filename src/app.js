window.axios = require('axios');
window.Vue = require('vue');

const app = new Vue({
    el: '#liveCounter',

    data: {
        access_token: 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,
        post_id: pfbid02acaRJFPQN3qMieCWxHNkJevttXNKMEpYpWW6djwTRhTBzq7gdx6FtVKVdDn6wD6gl,
        reaction_counts: {
            angry: 0,
            haha: 0,
            like: 0,
            love: 0,
            sad: 0,
            wow: 0,
        }
    },

    mounted: function () {
        this.pollLoadData();

        setInterval(() => {
            this.pollLoadData();
        }, 1000);
    },

    methods: {
        pollLoadData: function () {
            axios.get('https://graph.facebook.com/v2.8/' + this.post_id + '?access_token=' + this.access_token + '&fields=     reactions.type(LIKE).summary(total_count).limit(0).as(like),     reactions.type(LOVE).summary(total_count).limit(0).as(love),     reactions.type(WOW).summary(total_count).limit(0).as(wow),     reactions.type(HAHA).summary(total_count).limit(0).as(haha),     reactions.type(SAD).summary(total_count).limit(0).as(sad),     reactions.type(ANGRY).summary(total_count).limit(0).as(angry)')
                .then(({ body }) => {
                    this.angry = body.angry.summary.total_count;
                    this.haha = body.haha.summary.total_count;
                    this.like = body.like.summary.total_count;
                    this.love = body.love.summary.total_count;
                    this.sad = body.sad.summary.total_count;
                    this.wow = body.wow.summary.total_count;
                })
                .catch(err => {
                    console.log(err)
                })
        },
    }
});
