export const willUpdateState = (setStateFunction, isUnmounted) => {
    if (!isUnmounted) {
        setStateFunction();
    }
}