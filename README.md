# LabGraph Project

A specialized web application for laboratory quality control management, implementing Westgard rules for statistical quality control (QC) in clinical laboratories. This tool provides comprehensive visualization and analysis capabilities for monitoring and managing quality control data across hematology, coagulation, and biochemistry testing.

## Project Structure

```
├──public
│   ├── favicon.ico
│   ├── lab.jpg
│   ├── next.svg
│   └── vercel.svg
├── src
│   ├── components
│   │   ├── auth
│   │   ├── charts
│   │   ├── features
│   │   ├── reports
│   │   ├── shared
│   │   ├── ui
│   │   └── utils
│   ├── constants
│   │   └── fileProcessing.ts
│   ├── contexts
│   │   └── GraphContext.tsx
│   ├── middleware.ts
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── analytics-table.tsx
│   │   ├── api
│   │   ├── biochemistry.tsx
│   │   ├── coagulation.tsx
│   │   ├── hematology.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── reports.tsx
│   │   └── signup.tsx
│   ├── services
│   │   └── auth.ts
│   ├── styles
│   │   └── globals.css
│   └── utils
│       ├── fileProcessors.ts
│       └── validation.ts

```

## Features

- **Westgard Rules Implementation**:
  - Automated quality control validation using Westgard multi-rules
  - Real-time violation detection and alerting
  - Statistical process control (SPC) monitoring
- **Interactive Quality Control Charts**:

  - Levey-Jennings charts for QC data visualization
  - Dynamic charts and graphs for trend analysis
  - Control limit calculations and display

- **Multiple Test Categories**:

  - Hematology QC analysis
  - Coagulation QC studies
  - Biochemistry QC results

- **Analytics Dashboard**:

  - Comprehensive QC data analysis with filtering capabilities
  - Statistical metrics and performance indicators
  - Quality control violation tracking
  - Sending email warnings

- **Dark/Light Mode**: Full theme support for comfortable viewing in any environment

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/LeonardoMeireles55/LabGraph-Front-End.git
cd LabGraph-Front-End
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be generated in the `build` directory.

## Pages and Features

### Hematology Dashboard

- Quality control data visualization with Westgard rules
- Trend analysis and violation detection
- Reference range and control limit monitoring

### Coagulation Studies

- Coagulation QC parameters tracking
- Multi-rule quality control implementation
- Abnormality and violation highlighting

### Biochemistry Analysis

- Quality control monitoring for biochemistry tests
- Control chart visualization
- Statistical analysis of QC data

### Analytics Table

- Advanced QC data filtering capabilities
- Date range selection for trend analysis
- Export functionality for reports and documentation
- Customizable view options for different quality metrics

## Deployment

The application can be deployed to various hosting platforms:

1. **Vercel** (Recommended)

   - Connect your repository
   - Follow the automatic deployment process

2. **Other Platforms**
   - Deploy the contents of the `build` directory
   - Configure your server to serve the static files

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0) - see the [LICENSE](LICENSE) file for details.

The GPL-3.0 ensures that:

- The software remains open source
- Any modifications or derived works must also be released under GPL-3.0
- Source code must be made available when distributing the software

## Screenshots

The application supports both light and dark modes for optimal viewing experience in any environment.

![image](https://github.com/user-attachments/assets/861b601c-53cd-4bd6-a12a-96ccc5ed0dce)
