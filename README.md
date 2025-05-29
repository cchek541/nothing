# React Native Web App

This project demonstrates how to build a web application using React with styled components that mimic React Native components. This approach allows you to create a codebase that can potentially be shared between web and mobile platforms.

## Features

- React-based web application
- Styled Components for React Native-like UI
- TypeScript for type safety
- Modern, responsive design

## Getting Started

### Prerequisites

- Node.js (version 16+)
- Yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```
yarn install
```

### Running the application

To start the development server:

```
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for production

To create a production build:

```
yarn build
```

## Project Structure

```
my-react-native-web/
├── public/                # Static files
├── src/                   # Source code
│   ├── components/        # UI components
│   ├── assets/            # Images, fonts, etc.
│   ├── App.tsx            # Main App component
│   └── index.tsx          # Entry point
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Extending the Application

To add new screens or components:

1. Create new component files in the `src/components` directory
2. Import and use styled components to create React Native-like UI
3. Update the main App component to include your new components

## License

This project is open source and available under the MIT License. 