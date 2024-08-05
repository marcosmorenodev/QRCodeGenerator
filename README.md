Run requirement: Requires "Live Server" extension found on VS Code store.
You can get it here: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

-Fetches a URL from https://goqr.me/ (respect their terms and rights) and via an input field, it then generates (if the user pasted or wrote a proper URL) a QR based on said field's value. QRs can also be downloaded and used for personal use.
This input field is a type of "url" and will not allow ordinary words, only URLs, which further prevents creating faulty QRs.

-If the link is printed, it will reload the page and will re-fetch from API with a stored link, which, is the one the user left input bar when creating a new QR. Keep in mind, this is made by using session storage. But why? Simple, since the page will reload whenever the user wants to print a QR, it would feel clunky if, on reload, they'd have to paste the same link again and wait for the fetching; this approach removes the tedium and makes the user wait only for the fetching.

*Known Bug: When downloading an image, after it's been downloaded, the printing function will work but won't display the QR Code. It is solved by a simple page reload.