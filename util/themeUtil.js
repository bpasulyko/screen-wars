export const colors = {
    rebel: [211, 47, 47], // #D32F2F
    empire: [25, 118, 210], // #1976D2
    headerBackground: '#171717',
    background: '#333',
    text: '#EEE',
    red: '#D32F2F',
    blue: '#1976D2',
};

let currentIcon;

export function setIcon(icon) {
    currentIcon = icon;
}

export function getIcon() {
    return currentIcon;
}

export function getMainColor(opacity = 1) {
    const color = colors[currentIcon].join(',');
    return `rgba(${color}, ${opacity})`;
}
