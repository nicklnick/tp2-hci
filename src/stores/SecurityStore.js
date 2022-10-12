import { defineStore } from "pinia";
import { UserApi } from "@/api/user";
import { Api } from "@/api/api";


const SECURITY_TOKEN_KEY = "security-token";

export const useSecurityStore = defineStore("security", {
    state: () => ({
        token: null,
        user: null,
        online: true,
    }),
    getters: {
        isLoggedIn() {
            return this.token != null;
        },
    },
    actions: {
        initialize() {
            const token = localStorage.getItem(SECURITY_TOKEN_KEY);
            if (token) {
                this.setToken(token);
            }
        },
        setUser(user) {
            this.user = user;
        },
        setToken(token) {
            this.token = token;
            Api.token = token;
        },
        updateToken(token, rememberMe) {
            if (rememberMe)
                localStorage.setItem(SECURITY_TOKEN_KEY, token);
            this.setToken(token);
        },
        removeToken() {
            localStorage.removeItem(SECURITY_TOKEN_KEY);
            this.setToken(null);
        },
        async login(credentials, rememberMe) {
            const result = await UserApi.login(credentials);
            this.updateToken(result.token, rememberMe);
        },
        async logout() {
            await UserApi.logout();
            this.removeToken();
        },
        async getCurrentUser() {
            if (this.user)
                return this.user;

            const result = await UserApi.get();
            this.setUser(result);
        },
        async modify(user) {
            return await UserApi.modify(user);
        },
        async checkApiOnline(){
            try{
                this.online = true;
                await UserApi.get();
            }
            catch (e) {
                if(e.code === 98){
                    this.online = false;
                }
                else if(e.code === 99){
                    this.online = false;
                }
            }
        }
    },
});
