export function performance() {
    if ('performance' in window && typeof window.performance.mark === 'function' && typeof window.performance.measure === 'function') {
        return window.performance;
    }
    return {
        mark() { },
        measure() { },
        getEntriesByName() { return []; },
        clearMarks() { },
        clearMeasures() { },
    };
}
export default performance;
