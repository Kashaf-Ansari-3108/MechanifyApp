import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTokenFromStorage = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error('Error getting token from AsyncStorage:', error);
        return null;
    }
};

export const getUserFromStorage = async () => {
    try {
        const userString = await AsyncStorage.getItem('user');
        const user = JSON.parse(userString);
        return user;
    } catch (error) {
        console.error('Error getting user from AsyncStorage:', error);
        return {};
    }
};

export const formatDateTime = (inputDateTime)=> {
    const inputDate = new Date(inputDateTime);

    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = inputDate.getFullYear();

    let hours = inputDate.getHours();
    const minutes = inputDate.getMinutes().toString().padStart(2, '0');
    
    let ampm = 'AM';
    if (hours >= 12) {
        ampm = 'PM';
        hours %= 12;
    }

    hours = hours === 0 ? 12 : hours; // Handle midnight (0:00)

    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;

    return formattedDateTime;
}

