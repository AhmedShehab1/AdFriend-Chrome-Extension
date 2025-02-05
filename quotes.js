const quotes = [
    "Believe you can and you're halfway there.",
    "The only way to do great work is to love what you do.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts."
];

export function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}
