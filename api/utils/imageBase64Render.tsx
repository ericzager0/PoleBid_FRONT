export const imageBase64Render = (productData: any) => {
  let imagesToDisplay: string[] = [];
  
  const formatImage = (base64String: any) => {
    if (!base64String || typeof base64String !== 'string') return null;
    if (base64String.startsWith('XHg')) return null;
    
    return base64String.startsWith('data:image') 
      ? base64String 
      : `data:image/jpeg;base64,${base64String}`;
  };

  if (typeof productData === 'string') {
    const formatted = formatImage(productData);
    if (formatted) imagesToDisplay.push(formatted);
  }
  else if (productData?.foto && typeof productData.foto === 'string') {
    const formatted = formatImage(productData.foto);
    if (formatted) imagesToDisplay.push(formatted);
  }
  else if (productData?.fotos && Array.isArray(productData.fotos)) {
    imagesToDisplay = productData.fotos
      .map((item: any) => formatImage(item.foto || item))
      .filter(Boolean) as string[];
  }
  else if (productData?.fotos && !Array.isArray(productData.fotos) && productData.fotos.foto) {
    const formatted = formatImage(productData.fotos.foto);
    if (formatted) imagesToDisplay.push(formatted);
  }

  if (imagesToDisplay.length === 0) {
    imagesToDisplay = [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop'
    ];
  }

  return imagesToDisplay;
};