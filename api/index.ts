import axios from "axios";
import pages from './pages'
import contents from "~/api/contents";
import works from "~/api/works";
import skills from "~/api/skills";
import educations from "~/api/educations";
import roles from "~/api/roles";
import users from "~/api/users";
import auth from "~/api/auth";

let API_URL = 'http://localhost:3001';

const config = {
    API_URL,
}

export const Api = {
    pages: pages(axios, config),
    contents: contents(axios, config),
    works: works(axios, config),
    skills: skills(axios, config),
    educations: educations(axios, config),
    roles: roles(axios, config),
    users: users(axios, config),
    auth: auth(axios, config),
}