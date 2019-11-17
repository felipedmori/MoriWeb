import { Friend } from './friend';

export interface FriendResult {
    friend: Friend;
    friends: FriendDistance[];
  
}

export interface FriendDistance {
    id: number;
    name: string;
    cityName: string;
    lat: number;
    lon: number;
    distance: number;
    distanceFlat: number;
}





