
export default interface NavLinksComponentProps {
  jsonData?: Array<Record<string, any>>;
  fileName?: string;
}


export default interface MobileMenuProps {
  isMenuOpen: boolean;
  onLogout: () => void;
  jsonData?: Array<Record<string, any>>;
  fileName?: string;
}