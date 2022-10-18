export const ratingFilter = (current, rating) => {
    let items = []
    switch (rating) {
      case "1star":
        items = current.filter((e) => e.rating_api < 2);
        break;
      case "2star":
        items = current.filter((e) => e.rating_api >= 2 && e.rating_api < 3);
        break;
      case "3star":
        items = current.filter((e) => e.rating_api >= 3 && e.rating_api < 4);
        break;
      case "4star":
        items = current.filter((e) => e.rating_api >= 4 && e.rating_api < 5);
        break;
      case "5star":
        items = current.filter((e) => e.rating_api === 5);
        break;
      default:
        return current;
    }
      return items;
  };

  export const priceFilter = (current, price) => {
    let items = []
    switch (price) {
      case "5":
        items = current.filter((e) => Number(e.price <= 5));
        break;
      case "5a10":
        items = current.filter(
          (e) => Number(e.price) >= 5 && Number(e.price <= 10)
        );
        break;
      case "10a30":
        items = current.filter(
          (e) => Number(e.price) >= 10 && Number(e.price) <= 30
        );
        break;
      case "30a50":
        items = current.filter(
          (e) => Number(e.price) >= 30 && Number(e.price) <= 50
        );
        break;
      case "50":
        items = current.filter((e) => Number(e.price) >= 50);
        break;
      default:
        return current;
    }
  
    return items;
  };

  export const genreFilter = (current, genre) => {
    let items = []
    if(genre !== 'none') {
          items = current.filter((game) => game.genres.includes(genre));
      } else {
          return current
      }
    return items;
  };