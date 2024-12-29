export const scrollToElement = (element: HTMLElement, parentElement: HTMLElement, headerOffset: number) => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;
    parentElement.scrollTo({
        top: offsetPosition
    });
}