export default function toSlug(text: string) {
    return text
        .toLowerCase()                     
        .replace(/[ +]/g, '-')              
        .replace(/[^a-z0-9-]/g, '')
        .replace(/[-]+/g, '-')
}