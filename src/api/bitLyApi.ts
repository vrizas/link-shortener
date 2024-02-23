const ACCESS_TOKEN = 'e460ff2dae4bb5e6d90be5728b48f60441c0eb20';
const BASE_API_URL = 'https://api-ssl.bitly.com/v4';

export type ShortenUrlResponse = {
    id: string;
    link: string;
    long_url: string;
};

const shortenUrl = async (url: string): Promise<ShortenUrlResponse> => {
    const response = await fetch(`${BASE_API_URL}/shorten`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ long_url: url }),
    });
    
    const responseJson = await response.json();
    return responseJson;
}

export default {
    shortenUrl,
}
