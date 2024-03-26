import axios from 'axios';

export const API_URL = process.env.NODE_ENV === 'production' ? 'http://50.17.91.210:8090' : "http://localhost:8090";
export const blogMenu = [
    { menuCd: 220, label: "메인화면", link: "/", thumbnail:"", blog:""},
    { menuCd: 221, label: "Blog", link: "", thumbnail:"", blog:"",
        children:[
            {menuCd: 222, label: "엑셀파일Json변환", link: "/blog/excel/excelfiletojson", thumbnail:"", blog:"",},
            {menuCd: 223, label: "엑셀데이터 Json변환", link: "/blog/excel/exceldatatojson", thumbnail:"", blog:"",},
            {menuCd: 224, label: "문자배열로 문자열 일괄치환", link: "/blog/excel/strarrchangestr", thumbnail:"", blog:"",}
            ]
    },
]
export const client = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers:{
        'Content-Type' : 'application/json'
    }
})

client.interceptors.request.use(
    function (config) {
        const at = sessionStorage.getItem('access_token');
        const rt = sessionStorage.getItem('refresh_token');
        if (!at || !rt) {
            config.headers["access_token"] = null;
            config.headers["refresh_token"] = null;
            return config
        }
        config.headers["access_token"] = "Bearer "+at;
        config.headers["refresh_token"] = "Bearer "+rt;
        return config
    }
)

client.interceptors.response.use(
    function (response) {
        return response
    },
    async function (error) {
        console.log(error);
        if(error.response){
            if(error.response.status === 401){
                console.log('error.response.status 401');
                sessionStorage.removeItem('access_token');
                sessionStorage.removeItem('refresh_token');
                window.location.href = '/';
            }
            if (error.response.status === 403) {
                try {
                    const originalRequest = error.config;
                    const data = await client.get('login/auth/refreshtoken')
                    if (data) {
                        const {accessToken, refreshToken} = data.data
                        sessionStorage.removeItem('access_token');
                        sessionStorage.removeItem('refresh_token');
                        sessionStorage.setItem('access_token', accessToken)
                        sessionStorage.setItem('refresh_token', refreshToken)
                        originalRequest.headers['access_token'] = accessToken;
                        originalRequest.headers['refresh_token'] = refreshToken;
                        return await client.request(originalRequest);
                        }
                } catch (error){
                      sessionStorage.removeItem('access_token');
                      sessionStorage.removeItem('refresh_token');
                      console.log(error);
                }
                return Promise.reject(error)
            }
        }
      return Promise.reject(error)
    }
)

export default client;