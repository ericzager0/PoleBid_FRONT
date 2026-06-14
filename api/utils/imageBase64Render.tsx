
export const imageBase64Render = (product: any) => {
  let imagesToDisplay: string[] = [];
  if (product.fotos && Array.isArray(product.fotos) && product.fotos.length > 0) {
    imagesToDisplay = product.fotos.map((item: any) => {
      const base64String = item.foto || '';
      return base64String.startsWith('data:image') 
        ? base64String 
        : `data:image/jpeg;base64,${base64String}`;
    });
  } else if (product.fotos && !Array.isArray(product.fotos) && product.fotos.foto) {
    const base64String = product.fotos.foto;
    imagesToDisplay = [
      base64String.startsWith('data:image') 
        ? base64String 
        : `data:image/jpeg;base64,${base64String}`
    ];
  }

  if (imagesToDisplay.length === 0) {
    imagesToDisplay = [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop'
    ];
  }

  return imagesToDisplay;
};