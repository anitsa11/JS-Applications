
//TODO rename file according to collections mentioned in exam description
import {get, post, put, del} from './request.js';

//TODO Modify endpoints according to exam description
const endpoints = {
    all:'/data/collection',
    byId: '/data/collection/',
}

export async function getAll() {
    return get(endpoints.all);
}

export async function getById(id) {
    return get(endpoints.byId + id);
}

//TODO Enter record properties
export async function create(prop1, prop2) {
    return post ( endpoints.all, {prop1, prop2});
}


export async function update(id, record) {
    return put (endpoints.byId + id, record);
}

export async function deleteById(id) {
    return del ( endpoints.byId + id);
}