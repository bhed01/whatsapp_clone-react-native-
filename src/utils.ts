import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

const getHex = (n:number): string => (n%256).toString(16)

export const getRandomHex = ():string => Math.floor(Math.random()*13631272+3145728).toString(16)

export const getColor = (id:string):string => {
    if(id.length > 4) {
        var n = id.length;
        return "#"
            + getHex(id.charCodeAt(0)+id.charCodeAt(1))
            + getHex(id.charCodeAt(n-4)+id.charCodeAt(n-3))
            + getHex(id.charCodeAt(n-2)+id.charCodeAt(n-1))
    }
    else 
        return "#" + getRandomHex()
}

export const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.ceil(
        Math.abs((
            Date.UTC(
                now.getFullYear(), 
                now.getMonth(), 
                now.getDate()
            )
            - Date.UTC(
                date.getFullYear(), 
                date.getMonth(), 
                date.getDate()
            )
        ) / (1000 * 60 * 60 * 24))
    );
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    if(diffDays < 1){
        return time;
    }else if(diffDays < 2){
        return "Yesterday, "+time;
    }else{
        return date.toLocaleDateString()+ ', ' + time;
    }
}


export const getURI = (type:any, data:any) => {
    if(type === 'status' && data && data.author && data.author.photoURL)
        return data.author.photoURL
    else if (data && data.name && data.key)
        return `https://picsum.photos/seed/${data.name.slice(0, 4) + data.key.slice(0, 4)}/64.webp`
    else 
        return `https://picsum.photos/seed/someone/64.webp`
}

export const getTitle = (data:any) => {
    if(data && (data.name || data.author))
        return data.name || data.author.name
    else
        return "N/A"
}

export const getSubTitle = (type: any, data:any) => {
    if (type === 'status' && data && data.timestamp)
        return formatDate(data.timestamp.toDate());
    else if(data && data.lastData && data.lastData.timestamp)
        return 'last activity at ' + formatDate(data.lastData.timestamp.toDate());
    else
        return '...';
}

export const getBg = (data:any) => {
    if(data && data.bg)
        return {backgroundColor: data.bg};
    else
        return null;
}

export const deleteCollection = (id: string, goBack: () => void, collection: string) => {
	firestore().collection(collection).doc(id).delete().then(goBack).catch((err) => console.log(err));
};

export const logout = () => {
    auth().signOut().catch((err) => Alert.alert(err.toString()));
};