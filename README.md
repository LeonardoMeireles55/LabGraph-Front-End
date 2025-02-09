# LabGraph Project

A web application for laboratory quality control management implementing Westgard rules for statistical quality control (QC) in clinical laboratories.

## Project Structure

```
├── public/           # Static files
├── src/
│   ├── components/   # Reusable components
│   │   ├── analytics-table/
│   │   ├── authentication/
│   │   ├── charts/
│   │   ├── features/
│   │   ├── reports/
│   │   └── shared/
│   ├── pages/       # Routes
│   │   ├── api/
│   │   ├── auth/
│   │   ├── charts/
│   │   └── misc/
│   ├── services/    # External services
│   └── styles/      # Global styles
└── config files     # Configuration files
```

## Key Features

- **Quality Control**

  - Westgard multi-rules implementation
  - Real-time violation detection
  - Statistical process control (SPC)

- **Visualization**

  - Levey-Jennings charts
  - Interactive dashboards for Hematology, Coagulation, and Biochemistry
  - Dark/Light mode support

- **Analytics**
  - QC data analysis with filtering
  - Statistical metrics
  - Email alerts for violations

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm

### Quick Start

```bash
git clone https://github.com/LeonardoMeireles55/LabGraph-Front-End.git
cd LabGraph-Front-End
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Submit pull request

## License

Licensed under GNU General Public License v3.0 (GPL-3.0)

![image](https://github.com/user-attachments/assets/861b601c-53cd-4bd6-a12a-96ccc5ed0dce)
