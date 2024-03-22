import axios from "axios";
import pages from './pages'
import contents from "~/api/contents";
import works from "~/api/works";
import skills from "~/api/skills";
import educations from "~/api/educations";
import roles from "~/api/roles";
import users from "~/api/users";
import auth from "~/api/auth";
import Cookies from "js-cookie";
import blogComments from "~/api/blogComments";
import blogPosts from "~/api/blogPosts";
import blogTags from "~/api/blogTags";
import backup from "~/api/backup";
import knowledges from "~/api/knowledges";

let API_URL = '/api';

const config = {
    API_URL,
}

axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`;

export const Api = {
    pages: pages(axios, config),
    contents: contents(axios, config),
    works: works(axios, config),
    skills: skills(axios, config),
    educations: educations(axios, config),
    roles: roles(axios, config),
    users: users(axios, config),
    auth: auth(axios, config),
    blogComments: blogComments(axios, config),
    blogPosts: blogPosts(axios, config),
    blogTags: blogTags(axios, config),
    backup: backup(axios, config),
    knowledges: knowledges(axios, config)
}