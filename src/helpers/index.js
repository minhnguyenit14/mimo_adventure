export * from './cacheHelper';
export * from './axiosHelper';
export * from './menuHelper';
export * from './stateHelper';
export * from './queryHelper';
export * from './dataHelper';

export const scrollToBody = (delayTime = 1500) => {
    setTimeout(() => {
        const productBodyNode = document.getElementById('sliderHeader');
        if (productBodyNode) {
            window.scrollTo({ top: productBodyNode.clientHeight - 50, behavior: 'smooth' });
        }
    }, delayTime);
}