export const getArticlesByState = (statusToFilter: string, user: any) => {
    if (!user || !user.products) return [];
    const products = Array.isArray(user.products) ? user.products : [user.products];
    return products.filter((product: any) => product.estado === statusToFilter);
  };

