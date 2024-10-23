import { writable } from 'svelte/store';

let initialValue;
if (typeof window !== 'undefined') {
    initialValue = localStorage.getItem('selectedTeam');
}  else {
    initialValue = 'ATL'
}  

export const selectedTeamStore = writable(initialValue);