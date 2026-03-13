
const avatarColors = [
    'bg-teal-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
];


export const getAvatarColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name?.length; i++) {
        hash = hash * 31 + name.charCodeAt(i);
    }

    const index = Math.abs(hash % avatarColors.length);
    return avatarColors[index];
};

export const getInitial = (name) => name?.charAt(0).toUpperCase()