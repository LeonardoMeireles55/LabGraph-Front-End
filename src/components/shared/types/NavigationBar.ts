interface NavBarProps {
    jsonData?: Array<Record<string, any>>;
    fileName?: string;
}

interface NavLink {
    text: string;
    url: string;
    onClick?: () => Promise<void>;
}