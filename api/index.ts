import axios from "axios";
import pages from './pages'
import contents from "~/api/contents";
import works from "~/api/works";
import skills from "~/api/skills";
import educations from "~/api/educations";

let API_URL = 'http://localhost:3001';

const config = {
    API_URL,
}

export const Api = {
    pages: pages(axios, config),
    contents: contents(axios, config),
    works: works(axios, config),
    skills: skills(axios, config),
    educations: educations(axios, config)
}