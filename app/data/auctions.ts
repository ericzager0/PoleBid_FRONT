export interface AuctionItem {
  id: string;
  categoryId: number;
  imageSrc: string;
  title: string;
  fecha: string;
  hora: string;
  owner: string;
  state: 'Iniciada' | 'En espera' | 'Terminada';
  description: string;
  images: string[];
  live?: boolean;
}

export const f1AuctionsData: AuctionItem[] = [
  { 
    id: '1', 
    categoryId: 3, 
    imageSrc: 'https://imgs.search.brave.com/qyzM_SmMSFOiqbGUn8pnGunMSG1XFH0HHPjf0W_GGQo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zaWxv/ZHJvbWUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE4LzEy/L0F5cnRvbi1TZW5u/YS1NY0xhcmVuLUhl/bG1ldC1TaWRlLTIt/NzQweDU5Mi5qcGc', 
    title: 'Casco Ayrton Senna 1990', 
    fecha: 'Nov 15', 
    hora: '10:00', 
    owner: 'Museo F1',
    state: 'Terminada',
    description: 'Auténtico casco Bell usado por el legendario Ayrton Senna durante la temporada 1990 de Fórmula 1, año en el que consiguió su segundo campeonato mundial con McLaren. Presenta marcas visibles de uso en carrera, suciedad de pista en la visera y viene acompañado con un certificado de autenticidad emitido directamente por el Instituto Ayrton Senna.',
    images: [
      'https://imgs.search.brave.com/qyzM_SmMSFOiqbGUn8pnGunMSG1XFH0HHPjf0W_GGQo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zaWxv/ZHJvbWUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE4LzEy/L0F5cnRvbi1TZW5u/YS1NY0xhcmVuLUhl/bG1ldC1TaWRlLTIt/NzQweDU5Mi5qcGc',
      'https://picsum.photos/seed/senna_1/400/200',
      'https://picsum.photos/seed/senna_2/400/200',
      'https://picsum.photos/seed/senna_3/400/200'
    ],
    live: true
  },
  { 
    id: '2', 
    categoryId: 2, 
    imageSrc: 'https://picsum.photos/seed/f1_2/400/200', 
    title: 'Guantes de Lewis Hamilton', 
    fecha: 'Nov 16', 
    hora: '14:30', 
    owner: 'Mercedes AMG',
    state: 'Iniciada',
    description: 'Guantes ignífugos Puma homologados por la FIA, utilizados por el siete veces campeón mundial Lewis Hamilton durante el Gran Premio de Gran Bretaña. Cuentan con la firma original del piloto británico en color plateado sobre el dorso de la mano derecha. Incluyen display de acrílico para exhibición.',
    images: [
      'https://picsum.photos/seed/f1_2/400/200',
      'https://picsum.photos/seed/ham_1/400/200',
      'https://picsum.photos/seed/ham_2/400/200'
    ],
    live: true
  },
  { 
    id: '3', 
    categoryId: 1, 
    imageSrc: 'https://picsum.photos/seed/f1_3/400/200', 
    title: 'Neumático Pirelli Blando Usado', 
    fecha: 'Nov 18', 
    hora: '09:15', 
    owner: 'Coleccionista Privado',
    state: 'En espera',
    description: 'Neumático compuesto blando (franja roja) de Pirelli, utilizado en una sesión de clasificación en el circuito de Monza. Presenta el característico "graining", ampollas de calor y el desgaste extremo producto de una vuelta rápida al límite. Ideal para ser transformado en una mesa de centro estilo industrial.',
    images: [
      'https://picsum.photos/seed/f1_3/400/200',
      'https://picsum.photos/seed/tire_1/400/200',
      'https://picsum.photos/seed/tire_2/400/200',
      'https://picsum.photos/seed/tire_3/400/200',
      'https://picsum.photos/seed/tire_4/400/200'
    ],
    live: false
  },
  { 
    id: '4', 
    categoryId: 3, 
    imageSrc: 'https://picsum.photos/seed/f1_4/400/200', 
    title: 'Volante Ferrari F2004 (Schumacher)', 
    fecha: 'Nov 20', 
    hora: '18:00', 
    owner: 'Jean Todt',
    state: 'Iniciada',
    description: 'Una pieza de ingeniería legendaria y el santo grial de los coleccionistas. Volante original y completamente funcional del dominante Ferrari F2004 pilotado por Michael Schumacher. Conserva todos los diales de fibra de carbono, botones de mapeo de motor y las levas de cambio con el agarre desgastado por los guantes del Káiser.',
    images: [
      'https://picsum.photos/seed/f1_4/400/200',
      'https://picsum.photos/seed/schu_1/400/200',
      'https://picsum.photos/seed/schu_2/400/200'
    ],
    live: true
  },
  { 
    id: '5', 
    categoryId: 2, 
    imageSrc: 'https://picsum.photos/seed/f1_5/400/200', 
    title: 'Mono de Charles Leclerc 2023', 
    fecha: 'Nov 22', 
    hora: '11:45', 
    owner: 'Scuderia Ferrari',
    state: 'Terminada',
    description: 'Mono de carrera oficial de la Scuderia Ferrari usado por el monegasco Charles Leclerc. Fabricado en Nomex ultraligero ignífugo, muestra el icónico Rosso Corsa con todos los patrocinadores bordados de la temporada 2023. Se entrega enmarcado al vacío para preservar la tela.',
    images: [
      'https://picsum.photos/seed/f1_5/400/200',
      'https://picsum.photos/seed/lec_1/400/200'
    ],
    live: false
  },
  { 
    id: '6', 
    categoryId: 1, 
    imageSrc: 'https://picsum.photos/seed/f1_6/400/200', 
    title: 'Gorra firmada por Franco Colapinto', 
    fecha: 'Nov 25', 
    hora: '16:20', 
    owner: 'Williams Racing',
    state: 'Iniciada',
    description: 'Gorra oficial del equipo Williams Racing autografiada en la visera por el piloto argentino sensación, Franco Colapinto, durante su debut en la categoría reina. Un artículo de colección imprescindible y una inversión a futuro para seguir la carrera de la joven promesa sudamericana.',
    images: [
      'https://picsum.photos/seed/f1_6/400/200',
      'https://picsum.photos/seed/cola_1/400/200',
      'https://picsum.photos/seed/cola_2/400/200',
      'https://picsum.photos/seed/cola_3/400/200'
    ],
    live: false
  },
  { 
    id: '7', 
    categoryId: 3, 
    imageSrc: 'https://picsum.photos/seed/f1_7/400/200', 
    title: 'Alerón Trasero Red Bull RB19', 
    fecha: 'Dic 01', 
    hora: '20:00', 
    owner: 'Christian Horner',
    state: 'En espera',
    description: 'Elemento aerodinámico clave del monoplaza más dominante en la historia estadística de la F1. Este alerón trasero (Endplate y plano principal) de pura fibra de carbono perteneció al Red Bull RB19 de Max Verstappen. Incluye los soportes de montaje del sistema DRS intactos.',
    images: [
      'https://picsum.photos/seed/f1_7/400/200',
      'https://picsum.photos/seed/rb_1/400/200',
      'https://picsum.photos/seed/rb_2/400/200',
      'https://picsum.photos/seed/rb_3/400/200',
      'https://picsum.photos/seed/rb_4/400/200'
    ],
    live: false
  },
  { 
    id: '8', 
    categoryId: 2, 
    imageSrc: 'https://picsum.photos/seed/f1_8/400/200', 
    title: 'Trofeo GP de Mónaco 2018', 
    fecha: 'Dic 05', 
    hora: '13:00', 
    owner: 'Daniel Ricciardo',
    state: 'Terminada',
    description: 'Réplica oficial a escala 1:1, autorizada por el Automóvil Club de Mónaco, del trofeo entregado al ganador del circuito callejero más glamoroso del calendario. Presenta el mapa del trazado tallado en la base dorada. Fue encargada originalmente como trofeo de repuesto para el equipo ganador.',
    images: [
      'https://picsum.photos/seed/f1_8/400/200',
      'https://picsum.photos/seed/monaco_1/400/200'
    ],
    live: false
  },
  { 
    id: '9', 
    categoryId: 1, 
    imageSrc: 'https://picsum.photos/seed/f1_9/400/200', 
    title: 'Buzo de Mecánico McLaren', 
    fecha: 'Dic 08', 
    hora: '10:30', 
    owner: 'Zak Brown',
    state: 'Iniciada',
    description: 'Buzo de trabajo original utilizado por el equipo de mecánicos de McLaren durante las rapidísimas paradas en boxes. Confección altamente resistente con rodilleras reforzadas y diseño en el inconfundible color "Papaya" del equipo de Woking. Posee restos de polvo de frenos auténtico.',
    images: [
      'https://picsum.photos/seed/f1_9/400/200',
      'https://picsum.photos/seed/mclaren_1/400/200',
      'https://picsum.photos/seed/mclaren_2/400/200'
    ],
    live: false
  },
  { 
    id: '10', 
    categoryId: 3, 
    imageSrc: 'https://picsum.photos/seed/f1_10/400/200', 
    title: 'Motor Renault V10 (2005)', 
    fecha: 'Dic 12', 
    hora: '15:00', 
    owner: 'Flavio Briatore',
    state: 'En espera',
    description: 'La representación física del sonido de una era dorada. Bloque de motor Renault RS25 V10 a 72 grados, de la misma especificación utilizada por Fernando Alonso para ganar su primer campeonato mundial. La pieza ha sido desarmada de sus fluidos e inertizada, preparada estrictamente para exhibición de museo.',
    images: [
      'https://picsum.photos/seed/f1_10/400/200',
      'https://picsum.photos/seed/v10_1/400/200',
      'https://picsum.photos/seed/v10_2/400/200',
      'https://picsum.photos/seed/v10_3/400/200',
      'https://picsum.photos/seed/v10_4/400/200',
      'https://picsum.photos/seed/v10_5/400/200'
    ],
    live: false
  },
  { 
    id: '11', 
    categoryId: 2, 
    imageSrc: 'https://picsum.photos/seed/f1_11/400/200', 
    title: 'Botas de Fernando Alonso', 
    fecha: 'Dic 15', 
    hora: '09:00', 
    owner: 'Aston Martin F1',
    state: 'Iniciada',
    description: 'Botines de competición AlpineStars superligas, hechos a la medida exacta del bicampeón español Fernando Alonso en su etapa de resurgimiento con Aston Martin. Presentan un desgaste asimétrico y natural en el talón derecho producto del trabajo de aceleración extrema.',
    images: [
      'https://picsum.photos/seed/f1_11/400/200',
      'https://picsum.photos/seed/botas_1/400/200'
    ],
    live: false
  },
  { 
    id: '12', 
    categoryId: 1, 
    imageSrc: 'https://picsum.photos/seed/f1_12/400/200', 
    title: 'Radio de Kimi Räikkönen ("Leave me alone")', 
    fecha: 'Dic 18', 
    hora: '17:30', 
    owner: 'Sauber Motorsport',
    state: 'Terminada',
    description: 'Unidad receptora del sistema de comunicación de radio del monoplaza utilizado por "The Iceman", Kimi Räikkönen. Se entrega montado en un elegante cuadro de acrílico negro acompañado de una placa de aluminio grabada con su icónica y viral frase de Abu Dhabi: "Leave me alone, I know what to do".',
    images: [
      'https://picsum.photos/seed/f1_12/400/200',
      'https://picsum.photos/seed/kimi_1/400/200',
      'https://picsum.photos/seed/kimi_2/400/200'
    ],
    live: false
  },
  { 
    id: '13', 
    categoryId: 3, 
    imageSrc: 'https://picsum.photos/seed/f1_13/400/200', 
    title: 'Chasis Williams FW14B', 
    fecha: 'Ene 10', 
    hora: '12:00', 
    owner: 'Sir Frank Estate',
    state: 'En espera',
    description: 'Sección frontal completa (Nosecone) del legendario Williams FW14B de 1992, considerado por muchos como el coche más avanzado tecnológicamente de su tiempo gracias a su suspensión activa. Conserva la librea original amarilla, azul y blanca con el icónico patrocinio de Camel.',
    images: [
      'https://picsum.photos/seed/f1_13/400/200',
      'https://picsum.photos/seed/fw_1/400/200',
      'https://picsum.photos/seed/fw_2/400/200',
      'https://picsum.photos/seed/fw_3/400/200'
    ],
    live: true
  },
  { 
    id: '14', 
    categoryId: 2, 
    imageSrc: 'https://picsum.photos/seed/f1_14/400/200', 
    title: 'Entrada VIP Paddock Club 2026', 
    fecha: 'Ene 15', 
    hora: '08:00', 
    owner: 'FIA',
    state: 'Iniciada',
    description: 'Una experiencia que el dinero normalmente no puede comprar. Pase magnético de acceso total VIP para el Paddock Club en cualquier carrera europea del calendario 2026. Permite acceso directo a los boxes, caminatas exclusivas por el pit lane, hospitalidad premium y encuentros programados con directores de equipo.',
    images: [
      'https://picsum.photos/seed/f1_14/400/200',
      'https://picsum.photos/seed/vip_1/400/200'
    ],
    live: true
  },
  { 
    id: '15', 
    categoryId: 1, 
    imageSrc: 'https://picsum.photos/seed/f1_15/400/200', 
    title: 'Taza rota de Toto Wolff', 
    fecha: 'Ene 20', 
    hora: '22:00', 
    owner: 'Toto Wolff',
    state: 'Terminada',
    description: 'El símbolo definitivo de la intensidad de la F1 moderna. Los pedazos reales de una taza de porcelana destruida por el director del equipo Mercedes, Toto Wolff, durante un momento de furia captado en vivo en la transmisión internacional. Las piezas fueron recolectadas y selladas en un cubo de resina epóxica transparente.',
    images: [
      'https://picsum.photos/seed/f1_15/400/200',
      'https://picsum.photos/seed/toto_1/400/200',
      'https://picsum.photos/seed/toto_2/400/200'
    ],
    live: true
  }
];