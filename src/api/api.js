// Слой (Layer) доступа к данным (Data Access Layer — DAL), он занимается типом запроса, url и такое всё - это его ответсвенность. Находится между BLL и сервером. UI общается только с BLL, BLL с DAL, DAL с сервером
import * as axios from 'axios';


// создание отдельного экземпляра axios для работы с конкретной айпишкой, конкретной версией, на разных серверах + уход от повторения некоторых данных
const instance = axios.create({
  withCredentials: true, // цепляем куку при запросе с локального хоста на домен соц. сети, чтобы сказать, что мы это мы, что мы зарегались уже на домене соц. сети, пустите нас :)
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '9fe42175-1733-4793-9c3f-72022637a8a0' // ключ доступа нужен всем запросам кроме get
  }
});




export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data)
  },

  followUser(id) {
    return instance.post(`follow/${id}`, {})
  },

  unfollowUser(id) {
    return instance.delete(`follow/${id}`)
  },

  getProfile(id) {
    console.warn('Obsolete method. Please, use profileAPI object.')
    return profileAPI.getProfile(id)
  },
};




export const profileAPI = {
  getProfile(id) {
    return instance.get(`profile/${id}`)
  },
  getStatus(id) {
    return instance.get(`profile/status/${id}`)
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status: status })
  }
};




export const authAPI = {
  me() {
    return instance.get(`auth/me`)
  },
  login(email, password, rememberMe = false) {
    return instance.post('/auth/login', { email, password, rememberMe })
  },
  logout() {
    return instance.delete('/auth/login')
  }
};