
//TODO rename file according to collections mentioned in exam description
import {get, post, put, del} from './request.js';

const endpoints = {
    recent:'/data/drones?sortBy=_createdOn%20desc',
    byId: '/data/drones/',
    create:'/data/drones'

}

export async function getAllDrones() {
    return get(endpoints.recent);
}

export async function getDronesById(id) {
    return get(endpoints.byId + id);
}

export async function createDrone(
  model,
  imageUrl, 
  price, 
  condition,
  weight,
  phone,
  description
) {
    return post ( endpoints.create, { model,
  imageUrl, 
  price, 
  condition,
  weight,
  phone,
  description
});
}


export async function updateDrone(id, { 
  model,
  imageUrl, 
  price, 
  condition,
  weight,
  phone,
  description
}) {
    return put (endpoints.byId + id, { 
  model,
  imageUrl, 
  price, 
  condition,
  weight,
  phone,
  description
});
}

export async function deleteDrone(id) {
    return del ( endpoints.byId + id);
}