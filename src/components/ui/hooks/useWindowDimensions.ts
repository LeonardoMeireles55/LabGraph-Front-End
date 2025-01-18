import { useEffect, useState } from 'react';

type WindowDimensions = {
  width: number;
  height: number;
};

const useWindowDimensions = (): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Verifica se o código está sendo executado no cliente
    if (typeof window !== 'undefined') {
      const handleResize = (): void => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Chamada inicial para definir as dimensões na carga inicial
      handleResize();

      // Adiciona o event listener para o redimensionamento da janela
      window.addEventListener('resize', handleResize);

      // Limpeza: Remove o event listener quando o componente for desmontado
      return (): void => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []); // O efeito é executado apenas uma vez, após a montagem do componente

  return windowDimensions;
};

export default useWindowDimensions;
