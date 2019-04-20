export default {
    base: 'https://do-some-thrifting-db.herokuapp.com/',
    auth: {
        login: 'auth/login',
        register: 'auth/register',
    },
    comment: {
        create: 'comment/create',
        allByPost: 'comment/allByPost/',
        remove: 'comment/remove/'
    },
    post: {
        create: 'post/create',
        all: 'post/all',
        details: 'post/details/',
        edit: 'post/edit/',
        remove: 'post/remove/',
        starUnstar: 'post/star/',
        status: 'post/status/'
    },
    user: {
        all: 'user/all',
        details: 'user/details/',
        destroy: 'user/destroy/',
        blockUnblock: 'user/block/'
    }
}