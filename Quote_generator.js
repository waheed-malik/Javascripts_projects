const quote = document.getElementById("quote");
const author = document.getElementById("author");

const api_url = "https://dummyjson.com/quotes";
async function getQuote(url) {
  quote.innerHTML = "Loading...";
  author.innerHTML = "";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    // Select a random quote from the list
    const randomIndex = Math.floor(Math.random() * data.quotes.length);
    const randomQuote = data.quotes[randomIndex];
    quote.innerHTML = randomQuote.quote;
    author.innerHTML = `— ${randomQuote.author}`;
  } catch (error) {
    console.error('Fetch error:', error);
    quote.innerHTML = "An error occurred. Please try again later.";
    author.innerHTML = "";
  }
}

getQuote(api_url);

function tweet() {
  const tweetText = encodeURIComponent(`${quote.innerHTML} — ${author.innerHTML}`);
  window.open(`https://www.linkedin.com/share?id=0123456789/intent/tweet?text=${tweetText}`, "Tweet Window", "width=600,height=300");
}
