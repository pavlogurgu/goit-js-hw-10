export function fetchCountries(name) {
    const mainUrl = "https://restcountries.com/v2/name/";
    const filters = '?fields=name,capital,population,flags,languages';
    return fetch(`${mainUrl}${name}${filters}`).then(response => {
        return response.json();
    });
  };

