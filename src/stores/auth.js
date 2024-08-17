import { writable } from 'svelte/store';

const isAuthenticated = writable(false);

export default checkAuth = () => {
    const token = localStorage.getItem('token');
    isAuthenticated.set(!!token);
}