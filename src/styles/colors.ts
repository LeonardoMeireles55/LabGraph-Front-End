const lightColors = {
  primary: '#4F80F0', // Azul mais suave para uma experiência visual mais amigável
  secondary: '#2CCF6D', // Verde mais vibrante para um contraste agradável
  accent: '#F9D200', // Amarelo suave e mais harmonioso para destaque
  danger: '#FB716F', // Vermelho suave, mas com intensidade moderada
  background: '#F8F9FB', // Fundo mais quente e confortável
  surface: '#E1E4E8', // Superfície clara, mais contrastante para áreas secundárias
  muted: '#D1D5DB', // Cinza moderado (Gray-300)
  textPrimary: '#212529', // Texto principal, mais escuro para boa legibilidade
  textSecondary: '#5A636D', // Texto secundário, suave para contraste mais leve
  gridLines: 'rgba(243, 244, 246, 0.5)', // Linhas discretas de grade
  border: '#D0D5D9', // Bordas suaves para um visual clean
  meanLine: 'rgba(34, 197, 94, 0.8)', // Linha da média (Green-400)
  sd1: 'rgba(250, 204, 21, 0.8)', // Linha 1x SD suave, sem ser excessiva
  sd2: 'rgba(251, 113, 133, 0.8)', // Linha 2x SD moderada para contraste
  sd3: 'rgba(220, 38, 38, 0.8)', // Linha 3x SD com uma leve intensidade
  navbar: '#D1D5DB', // Cor de navbar clara e suave
  white: '#FFFFFF', // Branco puro para elementos que precisam de contraste
  green: '#13A860', // Verde mais vivo para botões
};

const darkColors = {
  primary: '#1D4ED8', // Azul profundo para impacto visual
  secondary: '#10B981', // Verde forte e harmonioso
  accent: '#FACC15', // Amarelo mais saturado, criando contraste
  danger: '#EF4444', // Vermelho forte para alertas visíveis
  background: '#121212', // Fundo escuro equilibrado para modo noturno
  surface: '#1F2937', // Superfície mais clara, mas sem ser ofuscante
  muted: '#808080', // Cinza mais frio, mantendo o foco no conteúdo
  textPrimary: '#E5E7EB', // Texto principal claro e suave
  textSecondary: '#B8C2CC', // Texto secundário com contraste suave
  gridLines: 'rgba(255, 255, 255, 0.15)', // Linhas de grade discretas para não interferir
  border: '#4B5563', // Bordas de tom mais escuro, mas suaves
  meanLine: 'rgba(34, 197, 94, 0.9)', // Linha da média (Green-500) mais visível no modo escuro
  sd1: 'rgba(250, 204, 21, 0.9)', // Linha 1x SD mais destacada
  sd2: 'rgba(251, 113, 133, 0.9)', // Linha 2x SD ajustada para contrastar bem
  sd3: 'rgba(220, 38, 38, 0.9)', // Linha 3x SD com contraste mais forte
  navbar: '#2A3A4B', // Navbar com tom escuro, mas não opressor
};

export default { lightColors, darkColors };
