  const getColorByLevel = (level: string) => {
    switch (level) {
      case 'low':
      case 'PCCC1':
        return 'var(--color-primary)';
      case 'normal':
      case "Normal C. Assayed":
        return 'var(--color-secondary)';
      case 'high':
      case 'PCCC2':
      case "Low Abn C. Assayed":
        return 'var(--color-accent)';
      default:
        return 'var(--color-primary)';
    }
  };

  export default getColorByLevel;