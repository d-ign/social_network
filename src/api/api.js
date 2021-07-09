import * as axios from 'axios';

const instance = axios.create({
  withCredentials: true, // цепляем cookie к запросу
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '9fe42175-1733-4793-9c3f-72022637a8a0'
  }
});

export const usersAPI = {
  getUsers(currentPage, pageSize, term, friend) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}&term=${term}&friend=${friend}`)
      .then(response => response.data)
  },
  followUser(id) {
    return instance.post(`follow/${id}`, {})
  },
  unfollowUser(id) {
    return instance.delete(`follow/${id}`)
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
  },
  savePhotoAPI(photoFile) {
    const formData = new FormData();
    formData.append('image', photoFile);
    
    return instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  saveProfileAPI(profile) {
    return instance.put(`profile`, profile)
  }
};

export const authAPI = {
  me() {
    return instance.get(`auth/me`)
  },
  login(email, password, rememberMe = false, captcha = null) {
    return instance.post('/auth/login', { email, password, rememberMe, captcha })
  },
  logout() {
    return instance.delete('/auth/login')
  }
};

export const securityAPI = {
  getCaptchaURLAPI() {
    return instance.get(`security/get-captcha-url`)
  },
};