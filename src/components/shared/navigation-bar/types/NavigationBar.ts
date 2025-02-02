export interface NavLinksComponentProps {
  jsonData?: Array<Record<string, any>>;
  fileName?: string;
}

export interface MobileMenuProps {
  isMenuOpen: boolean;
  onLogout: () => void;
  jsonData?: Array<Record<string, any>>;
  fileName?: string;
}

export interface NavBarProps {
  jsonData?: Array<Record<string, any>>;
  fileName?: string;
}

export interface NavLinkProps {
  text: string;
  url: string;
  onClick?: () => Promise<void>;
}
