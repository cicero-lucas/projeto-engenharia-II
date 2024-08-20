export default function UrlImg(img) {
    // Remove espaços nas extremidades e substitui espaços internos por '%20'
    const sanitizedImg = img.trim().replace(/\s+/g, '%20');
    return `http://localhost:3000/${sanitizedImg}`;
}
